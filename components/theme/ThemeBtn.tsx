"use client";

import * as React from "react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun } from "react-icons/fa";

export function ThemeBtn() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    // render nothing (or a skeleton) until client knows the theme
    return (
      <button
        aria-label="Toggle theme"
        className="relative bg-transparent hover:bg-transparent cursor-pointer flex justify-center"
      >
        <Moon className="w-6 h-6 text-nav" />
      </button>
    );
  }

  return (
    <button
      className="relative bg-transparent hover:bg-transparent cursor-pointer flex justify-center"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <Moon className="w-6 h-6 text-nav" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <FaSun className="w-6 h-6 text-nav" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
