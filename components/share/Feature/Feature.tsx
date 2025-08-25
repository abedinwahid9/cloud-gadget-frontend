import React from "react";
import Title from "../Title/Title";
import { Separator } from "@radix-ui/react-separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Feature = () => {
  const carouselBtn =
    "border-0 bg-primary/50 text-secondary rounded-full dark:text-nav dark:bg-secondary w-5 md:w-8 h-5 md:h-8 font-semibold hover:bg-primary";

  return (
    <div className="px-2 py-2">
      <Carousel>
        <div className=" flex justify-between">
          <Title text="Trending collection" />
          <div className="flex gap-2 items-center">
            <CarouselPrevious className={carouselBtn} />
            <CarouselNext className={carouselBtn} />
          </div>
        </div>
        <Separator className="md:my-[15px] my-[8px] bg-secondary dark:bg-nav w-full h-[1px] " />
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <CarouselItem key={i} className=" basis-1/2 lg:basis-1/5">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{i + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Feature;
