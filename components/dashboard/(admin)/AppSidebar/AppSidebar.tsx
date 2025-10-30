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
import { GoFileMedia } from "react-icons/go";
import {
  TfiLayoutMediaCenterAlt,
  TfiLayoutMediaLeftAlt,
  TfiLayoutSliderAlt,
} from "react-icons/tfi";
import {
  PiContactlessPaymentFill,
  PiImagesThin,
  PiUsersFourFill,
  PiVanFill,
} from "react-icons/pi";
import { AiOutlineAppstore } from "react-icons/ai";

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
import {
  TbCategoryPlus,
  TbCirclesRelation,
  TbUserShield,
} from "react-icons/tb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaCreditCard, FaImages, FaUsers, FaUserShield } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";

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
    title: "Categories",
    icon: TbCategoryPlus,
    url: "/admin/categories",
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
      {
        title: "All Products",
        url: "/admin/products",
        icon: AiOutlineAppstore,
      },
      {
        title: "Add Product",
        url: "/admin/products/add-product",
        icon: TbCategoryPlus,
      },
    ],
  },

  {
    title: "User Management",
    icon: Users,
    subItems: [
      {
        title: "Admin",
        url: "/admin/user-management/admins",
        icon: FaUserShield,
      },
      {
        title: "Reseller",
        url: "/admin/user-management/resellers",
        icon: PiUsersFourFill,
      },
      {
        title: "Customers",
        url: "/admin/user-management/customers",
        icon: FaUsers,
      },
    ],
  },
  {
    title: "Promotion Management",
    icon: TbCirclesRelation,
    subItems: [
      {
        title: "Slider",
        url: "/admin/promotion-management/slider",
        icon: TfiLayoutSliderAlt,
      },
      {
        title: "Banner",
        url: "/admin/promotion-management/banner",
        icon: FaImages,
      },
      {
        title: "Coupon",
        url: "/admin/promotion-management/coupon",
        icon: RiCoupon2Fill,
      },
    ],
  },

  {
    title: "Content",
    icon: PiImagesThin,
    subItems: [
      {
        title: "Media",
        url: "/admin/content/media",
        icon: GoFileMedia,
      },
    ],
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Payment Management",
    subItems: [
      {
        title: "Payment Gateway",
        url: "/admin/promotion-management/slider",
        icon: FaCreditCard,
      },
      {
        title: "Withdraw",
        url: "/admin/promotion-management/banner",
        icon: PiContactlessPaymentFill,
      },
      {
        title: "Delivery Charge",
        url: "/admin/payment-management/delivery-charge",
        icon: PiVanFill,
      },
    ],
    icon: IoWalletOutline,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

const adminItems = [
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
];

const AdminSidebar = () => {
  return (
    <Sidebar className="bg-gradient-to-t from-primary/30 to-secondary/30 border-r ">
      <SidebarContent>
        {/* --- Main Menu --- */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold uppercase tracking-wider text-secondary dark:text-white">
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
                      <AccordionTrigger
                        icon
                        className="px-3 py-2 rounded-md flex items-center gap-2 text-base font-semibold text-secondary dark:text-white hover:bg-primary/10 hover:text-primary transition-colors "
                      >
                        <span className="flex items-center gap-1">
                          <item.icon
                            style={{ strokeWidth: "1.5px" }}
                            className="h-5 w-5 "
                          />
                          <span>{item.title}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col pl-9 gap-1">
                          {item.subItems.map((sub) => (
                            <a
                              key={sub.title}
                              href={sub.url}
                              className="flex items-center gap-2 py-1.5 px-2 rounded-md text-base font-semibold text-secondary hover:bg-primary/10 hover:text-primary dark:text-white transition-colors hover:underline"
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
                        className="flex items-center gap-2 px-3 py-2 text-base  text-secondary hover:bg-primary/10 hover:text-primary transition-colors dark:text-white"
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
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold text-secondary dark:text-white hover:bg-red-100 hover:text-red-600 transition-colors"
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
