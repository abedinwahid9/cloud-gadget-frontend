"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { Skeleton } from "../ui/skeleton";

const HeroSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data = [], isLoading } = useQuery({
    queryKey: ["sliderData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/promotion/sliders");

      return res.data.sliders || [];
    },
  });

  const { data: banners = [], isLoading: banLoading } = useQuery({
    queryKey: ["banners-1"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/banner/1`);
      return res.data.banners || [];
    },
  });

  if (banLoading && isLoading) {
    return (
      <div className="w-full lg:h-[600px] md:h-96 h-48 flex py-2 px-2 gap-2">
        <Skeleton className="w-5/8 h-full bg-primary/20 "></Skeleton>
        <div className="flex w-3/8 flex-col gap-2">
          <Skeleton className="w-full h-1/2 bg-primary/20"></Skeleton>
          <Skeleton className="w-full h-1/2 bg-primary/20"></Skeleton>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12  md:py-2 py-1  relative z-10 md:px-2 px-1">
      <Carousel
        className="col-span-8 rounded-lg overflow-hidden"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className="h-fit">
          {data?.map((slider: { id: string; image: string }) => {
            return (
              <CarouselItem className="h-full" key={slider.id}>
                <Link href={"/"} className="relative h-full">
                  <Image
                    width={500}
                    height={500}
                    className="w-full h-full object-fill "
                    src={slider.image}
                    alt="cover"
                    priority
                  />
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className="col-span-4  flex flex-col md:pl-2 pl-1 ">
        {banLoading && banners?.length > 0 ? (
          <Skeleton className="bg-primary w-full wh-[200px]"></Skeleton>
        ) : (
          banners?.map((ban: { id: string; image: string }) => {
            return (
              <div key={ban.id} className="md:pb-1 pb-0.5 h-1/2">
                <Image
                  width={500}
                  height={500}
                  className="w-full h-full object-cover  rounded-lg"
                  src={ban.image}
                  alt="cover"
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HeroSection;
