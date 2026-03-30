import { CircleDashed, Gem, Sparkles } from "lucide-react";

export const pricingList = [
  {
    id: 1,
    icon: CircleDashed,
    plan: "Starter",
    price: 4.99,
    images: 50,
    features: ["50 Image Generations"],
    ctaLabel: "Buy Credits",
    iconColor: "text-primary", // color azul
  },
  {
    id: 2,
    icon: Sparkles,
    plan: "Medium",
    price: 14.99,
    images: 200,
    features: ["200 Image Generations"],
    ctaLabel: "Buy Credits",
    popular: true,
    iconColor: "text-amber-400 dark:text-amber-400", // color amarillo
  },
  {
    id: 3,
    icon: Gem,
    plan: "Pro",
    price: 19.99,
    images: 400,
    features: ["400 Image Generations"],
    ctaLabel: "Buy Credits",
    iconColor: "text-sky-400 dark:text-sky-400", // color morado
  },
];
