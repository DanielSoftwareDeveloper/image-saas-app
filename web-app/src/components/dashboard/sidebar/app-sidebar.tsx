"use server";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import SidebarMenuItems from "./sidebar-menu-items";
import UserButton from "./UserButton";
import { siteConfig } from "@/config/site-config";
import MobileSidebarClose from "./mobile-sidebar-close";
import Link from "next/link";
import Credits from "./credits";
import Upgrade from "./upgrade";

export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="px-2">
        <MobileSidebarClose />
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary mt-6 mb-8 flex flex-col items-start justify-start px-2">
            <Link
              href="/"
              className="mb-1 flex cursor-pointer items-center gap-2"
            >
              <p className="text-2xl font-bold tracking-tight">
                {siteConfig.title}
              </p>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-muted/30 border-t py-4">
        <div className="flex w-full mb-3 items-center justify-center gap-2 text-xs">
          <Credits />
          <Upgrade />
        </div>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
