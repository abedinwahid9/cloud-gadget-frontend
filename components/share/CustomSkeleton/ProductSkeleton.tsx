import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductSkeleton = ({ ...props }) => {
  return (
    <div className="flex flex-col gap-0.5" {...props}>
      <Skeleton className="h-[300px] rounded-t-md rounded-b-none bg-primary/25" />
      <div className="space-y-2">
        <Skeleton className="h-[50px] rounded-b-md rounded-t-none bg-primary/25" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
