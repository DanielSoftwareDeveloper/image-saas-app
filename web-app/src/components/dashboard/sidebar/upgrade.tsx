"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { Crown, Sparkles } from "lucide-react";

export default function Upgrade() {
  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "44cba663-8fb2-439f-b605-c8efa4238e50",
        "366c5835-9df5-4467-a358-69577948d313",
        "052a4619-ba8f-4cdc-911c-57128f29bde9",
      ],
    });
  };

  return (
    <Button
      size="sm"
      variant="secondary"
      className="hover:text-amber-500 cursor-pointer ml-2 gap-2"
      onClick={upgrade}
    >
      <Crown className="h-4 w-4 text-amber-500 dark:text-amber-400" />
      Upgrade
    </Button>
  );
}
