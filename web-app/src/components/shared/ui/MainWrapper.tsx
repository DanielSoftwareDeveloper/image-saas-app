import { cn } from "@/lib/utils";

interface MainWrapperProps {
  className?: string;
  children: React.ReactNode;
}

function MainWrapper({ className, children }: MainWrapperProps) {
  return (
    <div className={cn("mx-auto w-[94%] max-w-312.5", className)}>
      {children}
    </div>
  );
}
export default MainWrapper;
