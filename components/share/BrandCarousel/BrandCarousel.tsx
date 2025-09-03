"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const brands = [
  { name: "Baseus", img: "/brands/baseus.png" },
  { name: "Beats", img: "/brands/beats.png" },
  { name: "Bebird", img: "/brands/bebird.png" },
  { name: "Belkin", img: "/brands/belkin.png" },
  { name: "Benks", img: "/brands/benks.png" },
  { name: "Blitzwolf", img: "/brands/blitzwolf.png" },
  { name: "Bluedio", img: "/brands/bluedio.png" },
  { name: "boAt", img: "/brands/boat.png" },
];

const BrandCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <div className="w-full border rounded-lg shadow-sm">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="flex items-center">
          {brands.map((brand, index) => (
            <CarouselItem
              key={index}
              className="basis-1/4 md:basis-1/6 flex justify-center items-center p-4"
            >
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={brand.img}
                  alt={brand.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <p className="text-sm text-gray-600">{brand.name}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BrandCarousel;
