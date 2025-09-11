"use client";

import AppSidebar from "@/components/dashboard/(admin)/AppSidebar/AppSidebar";
import { ThemeBtn } from "@/components/theme/ThemeBtn";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 ">
          {/* Top Bar */}
          <header className="flex items-center justify-between border-b bg-primary bg-gradient-to-r from-primary/50 to-secondary/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md::hidden" />
              <h2 className="text-lg font-semibold tracking-tight">
                Admin Dashboard
              </h2>
            </div>

            {/* Right side actions (profile / notifications etc.) */}
            <div className="flex items-center gap-3">
              <button className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                Notifications
              </button>
              <button className="rounded-full w-16 h-8 bg-primary text-white flex items-center justify-center font-semibold">
                Admin
              </button>
              <ThemeBtn />
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto md:p-3 p-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
