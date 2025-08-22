"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import cover from "@/app/assets/cover.png";
import cover2 from "@/app/assets/cover2.jpg";
import cover3 from "@/app/assets/cover3.jpg";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-12  py-2 relative -z-10">
      <Carousel
        className="col-span-8 "
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <Image
              className="w-full h-full object-fill"
              src={cover}
              alt="cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              className="w-full h-full object-fill"
              src={cover2}
              alt="cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              className="w-full h-full object-fill"
              src={cover3}
              alt="cover"
            />
          </CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      <div className="col-span-4 flex flex-col pl-2 ">
        <Image
          className="w-full h-full object-fill pb-1"
          src={cover3}
          alt="cover"
        />
        <Image
          className="w-full h-full object-fill pt-1"
          src={cover2}
          alt="cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
