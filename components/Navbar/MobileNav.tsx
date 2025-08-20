"use client";

import { Home, Search, Percent, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfile from "../share/UserProfile/UserProfile";

export default function MobileNav() {
  const navItems = [
    { id: "home", name: "Home", icon: Home, href: "/" },
    { id: "search", name: "Search", icon: Search, href: "/products" },
    { id: "offers", name: "Offers", icon: Percent, href: "/offers" },
    { id: "cart", name: "Cart", icon: ShoppingCart, href: "/cart" },
    { id: "profile", name: "Profile", icon: UserProfile, href: "/profile" },
  ];

  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 right-0 w-full z-50 lg:hidden block">
      <div className="flex items-center justify-between p-2 rounded-full h-16 bg-blue-600 shadow-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.id}
              href={item?.href}
              className={`flex items-center justify-center transition-all duration-300 ease-in-out p-2 rounded-full whitespace-nowrap
                  ${
                    isActive
                      ? "bg-white text-blue-600 w-24 shadow-md"
                      : "bg-transparent text-white w-12"
                  }
                `}
            >
              <Icon className="h-6 w-6 transition-colors duration-300 ease-in-out" />
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
