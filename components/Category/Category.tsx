"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import img from "@/app/assets/img1.png";
import img2 from "@/app/assets/img2.png";
import img3 from "@/app/assets/img3.png";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const Category = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full md:p-5 p-2 select-none"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/5  lg:basis-1/8 ">
            <div className="w-full rounded-sm drop-shadow-2xl inset-shadow-[0px_0px_80px_0px_#00A8A8] flex flex-col items-center justify-center md:p-2 p-1 cursor-grabbing">
              <Image
                src={img}
                alt="cate"
                className="md:w-16 md:h-16 h-8 w-8 object-contain"
              />
              <p className="md:text-sm text-[8px] text-secondary dark:text-nav font-semibold ">
                Drones
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
};

export default Category;
