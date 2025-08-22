import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import img from "@/app/assets/img1.png";
import img2 from "@/app/assets/img2.png";
import img3 from "@/app/assets/img3.png";
import Image from "next/image";

const Category = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full p-5 "
    >
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/8">
            <div className="w-full rounded-md drop-shadow-2xl inset-shadow-[0px_0px_65px_0px_#00A8A8] flex flex-col items-center justify-center">
              <Image
                src={img}
                alt="cate"
                className="w-16 h-16 object-contain"
              />
              <p className="text-sm font-semibold mt-2">Drones</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Category;
