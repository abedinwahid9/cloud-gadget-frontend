import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import cover from "@/app/assets/cover.png";
import cover2 from "@/app/assets/cover2.jpg";
import cover3 from "@/app/assets/cover3.jpg";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-12 gap-x-2 py-2">
      <Carousel className="col-span-8 ">
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
      <div className="col-span-4 flex flex-col gap-1.5 ">
        <Image src={cover3} alt="cover" />
        <Image src={cover2} alt="cover" />
      </div>
    </div>
  );
};

export default HeroSection;
