"use client";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { priceMax, priceMin } from "@/lib/redux/slices/filterSlices";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

type SliderProps = React.ComponentProps<typeof Slider>;

interface RangeNum {
  min: number;
  max: number;
}

const Range = ({ className, ...props }: SliderProps) => {
  const [priceRange, setPriceRange] = useState<RangeNum>({ min: 0, max: 0 });
  const dispatch = useAppDispatch();
  const axiosPublic = useAxiosPublic();

  const {
    data: maxPrice = 0,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["max-price-data"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product/max-price");
      return res.data.maxPrice;
    },
  });

  useEffect(() => {
    if (maxPrice) {
      setPriceRange({ min: 0, max: maxPrice });
      dispatch(priceMin(0));
      dispatch(priceMax(maxPrice));
    }
  }, [maxPrice, dispatch]);

  const handleSliderChange = (value: number[]) => {
    const [min, max] = value;
    setPriceRange({ min, max });
    dispatch(priceMin(min));
    dispatch(priceMax(max));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numValue = Number(value);

    // Ensure value stays within valid range
    if (numValue < 0) numValue = 0;
    if (numValue > maxPrice) numValue = maxPrice;

    const updatedRange = { ...priceRange, [name]: numValue };

    // Prevent min > max and max < min
    if (updatedRange.min > updatedRange.max) {
      if (name === "min") updatedRange.max = numValue;
      else updatedRange.min = numValue;
    }

    setPriceRange(updatedRange);
    dispatch(priceMin(updatedRange.min));
    dispatch(priceMax(updatedRange.max));
  };

  if (isLoading) {
    return (
      <div className="p-2 bg-primary/10 rounded-md shadow-[0px_0px_5px_2px_#00a8a8] select-none">
        <p className="pb-4 font-semibold text-secondary dark:text-nav">Price</p>
        <Skeleton className="h-2 w-full rounded-full mb-3 bg-primary/20" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-12 rounded bg-primary/20" />
          <Skeleton className="h-4 w-16 rounded bg-primary/20" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-2 bg-destructive/10 rounded-md text-sm text-red-500">
        Failed to load price range.
      </div>
    );
  }

  return (
    <div className="p-2 bg-primary/10 rounded-md shadow-[0px_0px_5px_2px_#00a8a8] select-none">
      <p className="pb-4 font-semibold text-secondary dark:text-nav">Price</p>

      <Slider
        onValueChange={handleSliderChange}
        value={[priceRange.min, priceRange.max]}
        max={maxPrice}
        min={0}
        step={1}
        className={cn("w-full", className)}
        {...props}
      />

      {/* Replace h4 with controlled input fields */}
      <div className="pt-4 flex justify-between gap-2">
        <input
          type="number"
          name="min"
          value={priceRange.min}
          onChange={handleInputChange}
          className="border rounded px-2 py-1 w-24 focus:outline-none focus:ring focus:ring-blue-400"
        />
        <span className="flex items-center text-secondary dark:text-nav">
          -
        </span>
        <input
          type="number"
          name="max"
          value={priceRange.max}
          onChange={handleInputChange}
          className="border rounded px-2 py-1 w-24 focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default Range;
