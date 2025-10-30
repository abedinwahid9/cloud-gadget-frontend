"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import cover from "@/app/assets/cover.png";
import cover2 from "@/app/assets/cover2.jpg";
import cover3 from "@/app/assets/cover3.jpg";
import LiquidBtn from "../share/LiquidBtn/LiquidBtn";
import defaultBanner from "@/public/default/hero.jpg";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-12  md:py-2 py-1 relative z-10 md:px-2 px-1">
      <Carousel
        className="col-span-8  rounded-lg overflow-hidden"
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
        <CarouselContent>
          {/* <CarouselItem className="relative">
            <Image
              className="w-full h-full object-fill "
              src={cover}
              alt="cover"
            />
            <div className="absolute bottom-1/10 right-1/10">
              <LiquidBtn text="add cart" />
            </div>
          </CarouselItem>
          <CarouselItem className="relative">
            <Image
              className="w-full h-full object-fill "
              src={cover2}
              alt="cover"
            />
            <div className="absolute bottom-1/10 right-1/10">
              <LiquidBtn text="add cart" />
            </div>
          </CarouselItem> */}
          <CarouselItem>
            <Link href={"/"} className="relative">
              <Image
                className="w-full h-full object-fill "
                src={cover3}
                alt="cover"
              />
              <div className="absolute bottom-1/10 right-1/10">
                <LiquidBtn text="add cart" />
              </div>
            </Link>
          </CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      <div className="col-span-4 flex flex-col md:pl-2 pl-1 ">
        <div className="md:pb-1 pb-0.5 ">
          <Image
            className="w-full h-full object-fill  rounded-lg"
            src={cover3}
            alt="cover"
          />
        </div>
        <div className="md:pt-1 pt-0.5 ">
          <Image
            className="w-full h-full object-fill  rounded-lg"
            src={cover2}
            alt="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
