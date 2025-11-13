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
        className={`${className}   bg-gradient-to-tl from-nav/20 
  to-secondary/20  hover:from-nav hover:to-text hover:text-pretty   text-primary md:font-bold dark:text-text hover:dark:text-primary font-semibold md:text-lg text-sm capitalize  cursor-pointer `}
      >
        {title}
      </Button>
    </motion.div>
  );
};

export default CustomBtn;
