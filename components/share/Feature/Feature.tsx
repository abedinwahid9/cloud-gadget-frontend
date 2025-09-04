import Title from "../Title/Title";
import { Separator } from "@radix-ui/react-separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "../ProductCard/ProductCard";
import img from "@/app/assets/img3.png";

const Feature = ({ title }: { title: string }) => {
  const carouselBtn =
    "border-0 bg-primary/50 text-secondary rounded-full dark:text-nav dark:bg-secondary w-5 md:w-8 h-5 md:h-8 font-semibold hover:bg-primary";

  return (
    <div className="px-2 py-2">
      <Carousel>
        <div className=" flex justify-between">
          <Title text={title} />
          <div className="flex gap-2 items-center">
            <CarouselPrevious className={carouselBtn} />
            <CarouselNext className={carouselBtn} />
          </div>
        </div>
        <Separator className="md:my-[15px] my-[8px] bg-secondary dark:bg-nav w-full h-[1px] " />
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <CarouselItem
                key={i}
                className=" md:basis-1/3 basis-1/2  lg:basis-1/4 xl:basis-1/5 "
              >
                <ProductCard
                  id={i}
                  title="Transparent power bank with headset"
                  imageUrl={img} // make sure this exists in public/
                  price={45}
                  oldPrice={45}
                  category="headphone"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Feature;
