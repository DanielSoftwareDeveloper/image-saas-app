import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import BreadcrumbPageClient from "@/components/dashboard/sidebar/breadcrumb-page-client";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { requireAuth } from "@/lib/auth-utils";

export default async function DashboardLaout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex h-screen flex-col">
        <header className="bg-sidebar sticky-top z-10 flex items-center justify-between border-b px-4 py-2 top-0 sticky">
          <div className="flex shrink-0 grow items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <BreadcrumbPageClient />
          </div>
          <ModeToggle />
        </header>
        <main className="flex-1 px-4 md:px-6 lg:px-8 py-4 lg:py-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
