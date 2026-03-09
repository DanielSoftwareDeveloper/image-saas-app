"use client";

import { BreadcrumbPage } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadcrumbPageClient() {
  const path = usePathname();

  return (
    <BreadcrumbPage className="text-foreground text-sm font-medium">
      {path === "/dashboard" && "Dashboard"}
      {path === "/dashboard/create" && "Create"}
      {path === "/dashboard/projects" && "Projects"}
      {path === "/dashboard/settings" && "Settings"}
    </BreadcrumbPage>
  );
}
