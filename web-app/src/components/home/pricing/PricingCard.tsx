import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  plan: string;
  icon: LucideIcon;
  price: number;
  features: string[];
  ctaLabel: string;
  iconColor?: string;
  variant?: "default" | "secondary" | "outline";
}

function PricingCard({
  plan,
  icon: Icon,
  price,
  features,
  ctaLabel,
  iconColor,
  variant = "outline",
}: PricingCardProps) {
  return (
    <div className="bg-card flex flex-col justify-between rounded-lg border p-6">
      <div className="mb-4 flex flex-col">
        <div className="mb-4 flex items-center gap-x-2">
          <Icon
            className={cn(
              "size-7",
              variant === "outline" ? "text-gray-700" : "",
              iconColor,
            )}
          />
          <h3 className="text-xl font-semibold">{plan}</h3>
        </div>

        <span>Price: ${price}</span>
      </div>

      <Separator />

      <div className="mt-4">
        <h3>Features:</h3>
        <ul className="my-4 flex flex-col gap-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-x-1">
              <Check className="size-4" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/auth/sign-up"
        className={cn(buttonVariants({ variant, size: "lg" }), "font-medium")}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export default PricingCard;
