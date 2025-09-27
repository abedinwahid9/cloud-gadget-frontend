"use client";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { BsShop } from "react-icons/bs";
import { TbCategoryPlus } from "react-icons/tb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ---------------- Main Menu ----------------
const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Shop",
    url: "/",
    icon: BsShop,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    icon: Package,
    subItems: [
      { title: "All Products", url: "/admin/products", icon: TbCategoryPlus },
      {
        title: "Add Product",
        url: "/admin/add-products",
        icon: TbCategoryPlus,
      },
    ],
  },
  {
    title: "Categories",
    icon: TbCategoryPlus,
    url: "/admin/categories",
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: Users,
  },
  {
    title: "Promotion Management",
    url: "/admin/promotions",
    icon: Users,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

// ---------------- Admin Menu ----------------
const adminItems = [
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
];

const AdminSidebar = () => {
  return (
    <Sidebar className="bg-gradient-to-t from-primary/30 to-secondary/30 border-r">
      <SidebarContent>
        {/* --- Main Menu --- */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold uppercase tracking-wider text-secondary">
            Admin Panel
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-3">
            <SidebarMenu>
              {menuItems.map((item, i) =>
                item.subItems ? (
                  <Accordion
                    type="single"
                    collapsible
                    key={item.title}
                    className="w-full"
                  >
                    <AccordionItem value={`item-${i}`}>
                      <AccordionTrigger className="px-3 py-2 rounded-md flex items-center gap-2 text-base font-semibold text-secondary hover:bg-primary/10 hover:text-primary transition-colors ">
                        <div className="flex items-center gap-1">
                          <item.icon
                            style={{ strokeWidth: "1.5px" }}
                            className="h-5 w-5"
                          />
                          <span>{item.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col pl-9 gap-1">
                          {item.subItems.map((sub) => (
                            <a
                              key={sub.title}
                              href={sub.url}
                              className="flex items-center gap-2 py-1.5 px-2 rounded-md text-base font-semibold text-secondary hover:bg-primary/10 hover:text-primary transition-colors hover:underline"
                            >
                              <sub.icon
                                style={{ strokeWidth: "1.5px" }}
                                className="h-5 w-5"
                              />
                              {sub.title}
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-2 px-3 py-2 text-base  text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <item.icon className="h-5 w-5 " />
                        <span className="font-semibold text-base hover:underline">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* --- Admin Menu --- */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm uppercase tracking-wide text-muted-foreground font-bold">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold text-secondary hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
