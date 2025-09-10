"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiMenu2Line, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

const userLinks = [
  { title: "Profile", href: "/my-account" },
  { title: "Address", href: "/my-account/address" },
  { title: "Order History", href: "/my-account/orders-history" },
];

const resellerLinks = [
  ...userLinks,
  { title: "Products", href: "/my-account/referral-orders" },
  { title: "Earn & Withdraw", href: "/my-account/earn-withdraw" },
];

const LayoutCom = ({ children }: { children: React.ReactNode }) => {
  // ⚡ later you can fetch role from session / db
  const role: "user" | "reseller" = "user";
  const links = role === "user" ? resellerLinks : userLinks;

  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] ">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block border-r bg-primary/20 dark:bg-gray-900 p-3 border-r-secondary/50">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          My Account
        </h2>
        <nav className="space-y-2">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative group block px-3 py-2"
              >
                <span
                  className={`capitalize font-semibold text-base transition-colors duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-gray-700 dark:text-gray-200 hover:text-primary"
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`absolute left-3 bottom-1 h-[2px] bg-primary transition-all duration-300 ${
                    isActive
                      ? "w-[calc(100%-1.5rem)]"
                      : "w-0 group-hover:w-[calc(100%-1.5rem)]"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-4 relative">
        {/* Mobile Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            onClick={() => setToggle(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RiMenu2Line className="h-5 w-5" /> Menu
          </Button>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {toggle && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="absolute inset-y-0 left-0 w-[250px] bg-secondary/80 dark:bg-gray-900 shadow-xl p-4 "
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  My Account
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setToggle(false)}
                >
                  <RiCloseLine className="h-6 w-6" />
                </Button>
              </div>

              <nav className="space-y-2">
                {links.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setToggle(false)}
                      className="relative group block px-1 py-2"
                    >
                      <span
                        className={`capitalize font-semibold text-base transition-colors duration-300 ${
                          isActive
                            ? "text-primary"
                            : "text-gray-700 dark:text-gray-200 hover:text-primary"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`absolute left-3 bottom-1 h-[2px] bg-primary transition-all duration-300 ${
                          isActive
                            ? "w-[calc(100%-1.5rem)]"
                            : "w-0 group-hover:w-[calc(100%-1.5rem)]"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
};

export default LayoutCom;
