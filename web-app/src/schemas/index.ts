import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(5, {
    message: "Invalid password",
  }),
});

export const SignUpSchema = z
  .object({
    name: z
      .string({ message: "Your name" })
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(50, { message: "Name cannot exceed 50 characters" }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password cannot exceed 50 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),

    confirmPassword: z.string().min(8, {
      message: "Password must contain at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password cannot exceed 50 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmNewPassword: z.string().min(8, {
      message: "Password must contain at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

// Courses schema
export const templateCategories = [
  "Landing Page",
  "Portfolio",
  "Blog",
  "E-commerce",
  "Digital Marketplace",
  "Real Estate",
  "Nonprofit",
  "Documentation",
  "Learning Management System (LMS)",
  "Project Management System (PMS)",
  "Property Management System (PropMS)",
  "Hospital Management System (HMS)",
  "Customer Relationship Management (CRM)",
  "Enterprise Resource Planning (ERP)",
  "Point of Sale (POS)",
  "Dashboard",
  "Web3",
] as const;

export const templateTechnologies = [
  "Figma",
  "AdobeXD",
  "SketchUp",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Python",
  "PHP",
  "Ruby",
  "Java",
  "C#",
  "Go",
  "Rust",
  "Bootstrap",
  "Tailwind CSS",
  "ShadCN",
  "NextUI",
  "React.js",
  "Vue.js",
  "Angular",
  "Svelte",
  "Preact",
  "SolidJS",
  "TanStack",
  "Next.js",
  "Nuxt.js",
  "SvelteKit",
  "SolidStart",
  "TanStack Start",
  "Remix",
  "Astro",
  "Gatsby",
  "Hugo",
  "Jekyll",
  "Deno Fresh",
  "React Native",
  "Expo",
  "Kotlin",
  "Kotlin Multiplatform",
  "Flutter",
  "Dart",
  "Lynx",
  ".NET",
  "Flask",
  "Django",
  "Laravel",
  "Symfony",
  "Ruby on Rails",
  "NestJS",
  "Express.js",
  "WordPress",
  "Drupal",
  "Magento",
  "Sanity",
  "Storyblok",
  "Payload",
  "Strapi",
  "Shopify",
  "Webflow",
  "Wix",
  "Blogger",
] as const;

export const templateStatus = ["Draft", "Published", "Archived"] as const;
export const templateSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  filekey: z.string().min(1, { message: "File is required" }),
  price: z.number().min(1, { message: "Price must be a positive number" }),
  category: z.enum(templateCategories, {
    message: "Category is required",
  }),
  technology: z
    .array(z.enum(templateTechnologies))
    .min(1, { message: "Select at least one technology" }),
  smallDescription: z
    .string()
    .min(3, { message: "Small Description must be at least 3 characters" })
    .max(200, {
      message: "Small Description must be at most 200 characters long",
    }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers and hyphens",
    })
    .transform((val) => val.toLowerCase()),

  status: z.enum(templateStatus, { message: "Status is required" }),
});

export type TemplateSchemaType = z.infer<typeof templateSchema>;
