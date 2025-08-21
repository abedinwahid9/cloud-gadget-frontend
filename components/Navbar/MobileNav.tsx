"use client";

import { Home, Search, Percent, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeBtn } from "../theme/ThemeBtn";
import { IoStorefrontSharp } from "react-icons/io5";
import Cart from "../share/Cart/Cart";
import Wishlist from "../share/Wishlist/Wishlist";

export default function MobileNav() {
  const navItems = [
    { id: "home", name: "Home", icon: Home, href: "/" },
    { id: "shop", name: "Search", icon: IoStorefrontSharp, href: "/products" },
    { id: "wishlist", name: "wishlist", icon: Wishlist, href: "/wishlist" },
    { id: "cart", name: "Cart", icon: Cart, href: "/cart" },
    { id: "profile", name: "Profile", component: ThemeBtn }, // ✅ custom component instead of link
  ];

  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 right-0 w-full  lg:hidden block ">
      <div className="flex items-center justify-between  rounded-t-3xl py-1 px-2 bg-secondary shadow-xl">
        {navItems.map((item) => {
          const isActive =
            item.href &&
            (pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href)));

          if (item.component) {
            const Component = item.component;
            return (
              <div
                key={item.id}
                className="flex items-center justify-center  w-12 text-white"
              >
                <Component />
              </div>
            );
          }

          const Icon = item.icon!;
          return (
            <Link
              key={item.id}
              href={item.href!}
              className={`flex items-center justify-center transition-all duration-300 ease-in-out py-1.5 rounded-full whitespace-nowrap
                  ${
                    isActive
                      ? "bg-primary text-nav w-24 shadow-md"
                      : "bg-transparent text-nav w-12"
                  }
                `}
            >
              <Icon
                css={"h-6 w-6 transition-colors duration-300 ease-in-out"}
                className="h-6 w-6 transition-colors duration-300 ease-in-out"
              />
              {isActive && (
                <span className="text-sm font-semibold ml-2">{item.name}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
