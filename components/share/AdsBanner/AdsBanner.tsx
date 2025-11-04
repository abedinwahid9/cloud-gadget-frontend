// components/sections/AdsBanner.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface AdsBannerProps {
  index: number;
}

export const BannerSkeleton = () => {
  return (
    <div className="grid grid-cols-4 md:gap-2 gap-1 md:px-2 px-1">
      <Skeleton className="w-full lg:h-52 md:h-32 h-16 bg-primary/20" />
      <Skeleton className="w-full lg:h-52 md:h-32 h-16 bg-primary/20" />
      <Skeleton className="w-full lg:h-52 md:h-32 h-16 bg-primary/20" />
      <Skeleton className="w-full lg:h-52 md:h-32 h-16 bg-primary/20" />
    </div>
  );
};

const AdsBanner: React.FC<AdsBannerProps> = ({ index }) => {
  const axiosPublic = useAxiosPublic();

  const { data: images = [], isLoading } = useQuery({
    queryKey: ["banners", index],
    queryFn: async () => {
      const res = await axiosPublic.get(`/banner/${index}`);
      return res.data.banners || [];
    },
  });

  // Dynamically set grid columns
  const gridCols =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
      ? "grid-cols-2"
      : images.length === 4
      ? "grid-cols-4"
      : "grid-cols-3"; // fallback for 3, 5, etc.

  if (isLoading) {
    return <BannerSkeleton />;
  }

  return (
    <div className={`grid ${gridCols} md:gap-2 gap-1 md:px-2 px-1`}>
      {images?.map((img: { id: string; image: string }) => (
        <div
          key={img.id}
          className="relative w-full h-full  overflow-hidden rounded-lg"
        >
          <Image
            width={500}
            height={500}
            src={img.image || ""}
            alt={`Ad Banner ${images.id}`}
            className="object-fill w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

export default AdsBanner;
