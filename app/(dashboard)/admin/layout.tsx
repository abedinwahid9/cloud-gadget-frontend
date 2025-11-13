"use client";
import { ThemeBtn } from "@/components/theme/ThemeBtn";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AppSidebar = dynamic(
  () => import("@/components/dashboard/(admin)/AppSidebar/AppSidebar")
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full min-h-screen grid grid-cols-12 gap-1">
        <Skeleton className="w-full h-full bg-primary/20 col-span-3 p-5 space-y-3">
          <Skeleton className="w-30 h-5 bg-primary/50 "></Skeleton>
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <Skeleton
                key={i}
                className="w-full h-10 bg-primary/50 "
              ></Skeleton>
            );
          })}
        </Skeleton>
        <div className="col-span-9 gap-1 flex flex-col">
          <Skeleton className="w-full h-[80px] bg-primary/20 flex justify-between items-center px-5">
            <div className="flex gap-1">
              <Skeleton className="w-5 h-5 bg-primary/50 "></Skeleton>
              <Skeleton className="w-30 h-5 bg-primary/50 "></Skeleton>
            </div>
            <div className="flex gap-1">
              <Skeleton className="w-20 h-5 bg-primary/50 "></Skeleton>
              <Skeleton className="w-10 h-5 bg-primary/50 "></Skeleton>
            </div>
          </Skeleton>
          <div className="grid grid-cols-3 gap-1 ">
            <Skeleton className="w-full h-[150px] bg-primary/20 "></Skeleton>
            <Skeleton className="w-full h-[150px] bg-primary/20 "></Skeleton>
            <Skeleton className="w-full h-[150px] bg-primary/20 "></Skeleton>
          </div>
          <div className="w-full h-full flex flex-col gap-1">
            <Skeleton className="w-full h-1/2 bg-primary/20 "></Skeleton>
            <Skeleton className="w-full h-1/2 bg-primary/20 "></Skeleton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full  bg-background text-foreground ">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 ">
          {/* Top Bar */}
          <header className="flex items-center justify-between border-b  bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-3">
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
