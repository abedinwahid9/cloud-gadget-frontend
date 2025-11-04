"use client";

import { ThemeBtn } from "@/components/theme/ThemeBtn";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import dynamic from "next/dynamic";

const AppSidebar = dynamic(
  () => import("@/components/dashboard/(admin)/AppSidebar/AppSidebar")
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full  bg-background text-foreground ">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 ">
          {/* Top Bar */}
          <header className="flex items-center justify-between border-b bg-primary/50 bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-3">
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
          <div className=" max-w-screen md:p-3 p-1 flex-1">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
