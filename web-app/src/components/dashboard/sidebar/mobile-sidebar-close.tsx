"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function MobileSidebarClose() {
  const { setOpenMobile, isMobile } = useSidebar();
  if (!isMobile) return null;
  return (
    <div className="absolute top-2 right-2 z-50 mb-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpenMobile(false)}
        className="hover:bg-muted/50 size-8 p-0 cursor-pointer"
        aria-label="Close sidebar"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
