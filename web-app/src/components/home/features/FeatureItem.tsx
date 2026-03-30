import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface FeatureItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

function FeatureItem({ title, description, icon: Icon }: FeatureItemProps) {
  return (
    <div className=" group relative rounded-2xl bg-card/60 backdrop-blur-xl overflow-hidden hover:border-primary/50 transition-all h-full border p-4 md:p-5">
      <div className="mb-4 flex items-center gap-2 md:gap-x-3">
        <Icon className="size-6 md:size-7 text-primary" />
        <h3 className={cn("text-sm font-medium md:text-base")}>{title}</h3>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
}
export default FeatureItem;
