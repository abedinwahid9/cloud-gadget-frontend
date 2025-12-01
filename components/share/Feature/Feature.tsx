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
import { REVALIDATE_TIME } from "@/lib/constants";

interface Query {
  id: boolean;
  price: boolean;
  title: boolean;
  images: boolean;
  category: boolean;
  discount: boolean;
}

interface ProductCardProps {
  id: string;
  title: string;
  images: string[];
  price: number;
  discount?: number;
  category?: string;
}

const Feature = async ({
  title,
  collection,
}: {
  title: string;
  collection: string;
}) => {
  "use server";
  const carouselBtn =
    "border-0 bg-primary text-nav rounded-full dark:text-nav dark:bg-secondary w-5 md:w-8 h-5 md:h-8 font-semibold hover:bg-secondary";

  const query: Query = {
    id: true,
    price: true,
    title: true,
    images: true,
    category: true,
    discount: true,
  };

  const url = new URLSearchParams(
    Object.fromEntries(
      Object.entries(query).map(([key, value]) => [key, String(value)])
    )
  ).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/collections/${collection}?${url}`,
    {
      next: { revalidate: REVALIDATE_TIME },
    }
  );

  const collections = await res.json();
  const products = collections.allProduct;

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
        <CarouselContent className="p-1">
          {products?.map((product: ProductCardProps) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/3 basis-1/2 lg:basis-1/4 xl:basis-1/5"
            >
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Feature;
