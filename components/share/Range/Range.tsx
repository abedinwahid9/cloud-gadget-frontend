"use client";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider>;

interface RangeNum {
  max: number;
  min: number;
}

const Range = ({ className, ...props }: SliderProps) => {
  const [priceRange, setPriceRange] = useState<RangeNum | null>({
    min: 0,
    max: 50,
  });

  const handleChange = (value: number[]) => {
    setPriceRange({
      min: value[0],
      max: value[1],
    });
  };

  return (
    <div className="p-2 bg-primary/10 rounded-md shadow-[0px_0px_5px_2px_#00a8a8] select-none">
      <p className="pb-4 font-semibold text-secondary dark:text-nav">Price</p>
      <Slider
        onValueChange={handleChange}
        defaultValue={[0, 50]}
        max={100}
        min={0}
        step={1}
        className={cn("w-[100%]", className)}
        {...props}
      />
      <div className="font-semibold text-secondary dark:text-nav pt-4 flex justify-between">
        <p>৳ {priceRange?.min}</p>
        <p>৳ {priceRange?.max}</p>
      </div>
    </div>
  );
};

export default Range;
