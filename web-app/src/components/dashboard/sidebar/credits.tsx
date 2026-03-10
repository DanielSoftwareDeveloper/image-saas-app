import { Coins, Sparkles } from "lucide-react";
import { getUserCredits } from "@/actions/credits";

async function credits() {
  const result = await getUserCredits();
  const credits = result.success ? result.credits : 0;

  return (
    <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
      <Coins className="h-4 w-4 text-yellow-500" />
      <div className="flex items-baseline gap-1">
        <span className="text-sm font-bold">{credits}</span>
        <span className="text-accent-foreground text-xs">credits</span>
      </div>
    </div>
  );
}
export default credits;
