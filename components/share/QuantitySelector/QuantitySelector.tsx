"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function QuantitySelector({
  value,
  onIncrement,
  onDecrement,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center md:flex-row flex-col justify-center text-primary dark:text-nav">
      {/* Decrement */}
      <Button
        variant="outline"
        size="icon"
        onClick={onDecrement}
        className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary/20"
      >
        <Minus className="w-4 h-4" />
      </Button>

      {/* Quantity */}
      <span className="text-lg text-secondary font-semibold min-w-[30px] text-center">
        {value}
      </span>

      {/* Increment */}
      <Button
        variant="outline"
        size="icon"
        onClick={onIncrement}
        className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-secondary/45"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
