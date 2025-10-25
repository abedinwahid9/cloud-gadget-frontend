"use client";
import { Skeleton } from "@/components/ui/skeleton";

const colorSeke = "bg-primary/25";

const Loading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Product Image Skeleton */}
        <div>
          <Skeleton
            className={`w-full aspect-video  rounded-2xl ${colorSeke}`}
          />
          <div className="flex gap-3 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                className={`h-20 w-20 rounded-md ${colorSeke}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div>
          <Skeleton className={`h-8 w-3/4 mb-3 ${colorSeke}`} />
          <Skeleton className={`h-6 w-1/4 mb-5 ${colorSeke}`} />

          {/* Highlights */}
          <div className="space-y-3 mb-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className={`h-4 w-full ${colorSeke}`} />
            ))}
          </div>

          {/* Color and Buttons */}
          <div className="flex gap-4 items-center mb-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className={`h-8 w-8 rounded-md ${colorSeke}`} />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className={`h-10 w-24 rounded-md ${colorSeke}`} />
            <Skeleton className={`h-10 w-32 rounded-md ${colorSeke}`} />
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12">
        <Skeleton className={`h-6 w-1/3 mb-4 ${colorSeke}`} />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className={`h-4 w-full mb-2 ${colorSeke}`} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
