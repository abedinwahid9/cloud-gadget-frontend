"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiMenu2Line, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const userLinks = [
  { title: "Profile", href: "/my-account/profile" },
  { title: "Address", href: "/my-account/address" },
  { title: "Order History", href: "/my-account/orders" },
];

const resellerLinks = [
  ...userLinks,
  { title: "Referral Orders", href: "/my-account/referral-orders" },
  { title: "Earn & Withdraw", href: "/my-account/earn-withdraw" },
];

// Pass `role="user" | "reseller"` into Layout
const LayoutCom = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "user" | "reseller";
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const links = role === "reseller" ? resellerLinks : userLinks;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block border-r bg-primary/20 dark:bg-gray-900 p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          My Account
        </h2>
        <nav className="space-y-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-amber-300 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-4 relative">
        {/* Mobile Toggle */}
        <div className="md:hidden mb-4">
          <Button
            onClick={() => setToggle(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RiMenu2Line className="h-5 w-5" /> Menu
          </Button>
        </div>

        {/* Mobile Sidebar (Animated) */}
        <AnimatePresence>
          {toggle && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="absolute inset-y-0 left-0 w-[250px] bg-white dark:bg-gray-900 shadow-xl  p-4"
            >
              {/* Header */}
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

              {/* Links */}
              <nav className="space-y-2">
                {links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-amber-300 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => setToggle(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Children (Page Content) */}
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
};
export default LayoutCom;
