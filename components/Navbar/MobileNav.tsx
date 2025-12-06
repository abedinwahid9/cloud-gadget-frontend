"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IoStorefrontSharp } from "react-icons/io5";
import Cart from "../share/Cart/Cart";
import Wishlist from "../share/NavWishList/NavWishList";
import { ThemeBtn } from "../theme/ThemeBtn";

export default function MobileNav() {
  const navItems = [
    { id: "home", name: "Home", icon: Home, href: "/" },
    { id: "shop", name: "Shop", icon: IoStorefrontSharp, href: "/shop" },
    { id: "profile", name: "Profile", component: ThemeBtn },
    { id: "wishlist", name: "Wishlist", icon: Wishlist, href: "/wishlist" },
    { id: "cart", name: "Cart", icon: Cart, href: "/cart" },
  ];

  const pathname = usePathname();
  const iconStyle = "h-8 w-8 transition-colors duration-300 ease-in-out";

  return (
    <div className="fixed bottom-0 right-0 w-full  lg:hidden block z-[9999]">
      <div className="flex items-center justify-between  rounded-t-3xl py-2.5 px-2 bg-primary shadow-xl">
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
              className={`flex items-center justify-center transition-all duration-300 ease-in-out py-1  rounded-full whitespace-nowrap
                  ${
                    isActive
                      ? "bg-secondary text-nav w-28 shadow-md "
                      : "bg-transparent text-nav w-12"
                  }
                `}
            >
              <Icon css={iconStyle} className={iconStyle} />
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
