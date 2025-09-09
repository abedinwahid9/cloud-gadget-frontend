import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import React from "react";

interface Btn {
  title: string;
  className: string;
  handleBtn?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const CustomBtn = ({ title, handleBtn, className, type }: Btn) => {
  return (
    <motion.div className="w-full" whileTap={{ scale: 0.95 }}>
      <Button
        type={type}
        onClick={handleBtn}
        className={`${className} mt-2 lg:py-5 py-2  bg-gradient-to-r from-primary/40 via-secondary/40 to-badge/40 hover:from-badge/70 hover:via-secondary/70 hover:to-primary/70 hover:text-nav dark:text-white text-secondary md:font-bold font-semibold md:text-lg text-sm capitalize`}
      >
        {title}
      </Button>
    </motion.div>
  );
};

export default CustomBtn;
