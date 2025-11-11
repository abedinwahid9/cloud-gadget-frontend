"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const Category = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["subcategory-feature"],
    queryFn: async () => {
      const res = await axiosPublic("/sub-category");
      return res.data.sub_cate;
    },
  });

  const isEmpty = !data || data.length === 0;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full  p-2 select-none "
      plugins={[
        Autoplay({
          delay: 2500,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="p-1">
        {/* Show skeletons while loading OR when no data */}
        {isLoading || isEmpty
          ? Array.from({ length: 8 }).map((_, i) => (
              <CarouselItem key={i} className="basis-1/5 lg:basis-1/8">
                <div className="flex flex-col bg-primary/5 items-center justify-center gap-2 p-2 rounded-md">
                  <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/50" />
                  <Skeleton className="w-12 h-3 rounded bg-primary/50" />
                </div>
              </CarouselItem>
            ))
          : // ✅ Render API data
            data.map(
              (
                item: { image: string; label: string; slug: string },
                index: number
              ) => (
                <CarouselItem
                  key={index}
                  className="basis-1/4 lg:basis-1/6 cursor-grabbing"
                >
                  <Link href={`/shop/${item.slug}`}>
                    <div className="w-full rounded-sm drop-shadow-md bg-secondary/10 flex flex-col items-center justify-center md:py-2  p-1 hover:scale-105 transition-all duration-300">
                      <Image
                        src={item?.image || "/default.png"}
                        alt={item?.label || "category"}
                        width={60}
                        height={60}
                        className="md:w-16 md:h-16 h-8 w-8 object-contain"
                      />
                      <p className="md:text-sm text-[8px] text-primary dark:text-nav font-semibold mt-1 text-center">
                        {item?.label || "Unknown"}
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              )
            )}
      </CarouselContent>
    </Carousel>
  );
};

export default Category;
