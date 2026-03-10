import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";

import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/emails/reset-password-email";
import VerifyEmail from "@/components/emails/verify-email";
import { env } from "@/env";
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import db from "@/lib/db";
import { siteConfig } from "@/config/site-config";

const resend = new Resend(env.RESEND_API_KEY);

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Reset your password",
        react: ForgotPasswordEmail({
          username: user.name ?? "User",
          userEmail: user.email,
          resetUrl: url,
        }),
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Verify your email",
        react: VerifyEmail({
          username: user.name ?? "User",
          verifyUrl: url,
        }),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "44cba663-8fb2-439f-b605-c8efa4238e50",
              slug: "small",
            },
            {
              productId: "366c5835-9df5-4467-a358-69577948d313",
              slug: "medium",
            },
            {
              productId: "052a4619-ba8f-4cdc-911c-57128f29bde9",
              slug: "large",
            },
          ],
          successUrl: `${siteConfig.panelPath}`,
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer ID found.");
              throw new Error("No external customer id found.");
            }

            const productId = order.data.productId;

            let creditsToAdd = 0;

            switch (productId) {
              case "44cba663-8fb2-439f-b605-c8efa4238e50":
                creditsToAdd = 50;
                break;
              case "366c5835-9df5-4467-a358-69577948d313":
                creditsToAdd = 200;
                break;
              case "052a4619-ba8f-4cdc-911c-57128f29bde9":
                creditsToAdd = 400;
                break;
            }

            await db.user.update({
              where: { id: externalCustomerId },
              data: {
                credits: {
                  increment: creditsToAdd,
                },
              },
            });
          },
        }),
      ],
    }),
  ],
});
