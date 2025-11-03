"use client";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import React from "react";

interface Btn {
  title: string | React.ReactNode;
  className?: string;
  handleBtn?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

const CustomBtn = ({ title, handleBtn, className, type, disabled }: Btn) => {
  return (
    <motion.div className="w-full" whileTap={{ scale: 0.95 }}>
      <Button
        disabled={disabled}
        type={type}
        onClick={handleBtn}
        className={`${className}   bg-gradient-to-r from-primary/40 via
  to-secondary/40 hover:from-secondary/70 hover:to-primary/70 hover:text-white dark:text-white text-secondary md:font-bold font-semibold md:text-lg text-sm capitalize  cursor-pointer `}
      >
        {title}
      </Button>
    </motion.div>
  );
};

export default CustomBtn;
