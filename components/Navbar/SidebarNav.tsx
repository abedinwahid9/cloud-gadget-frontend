"use client";

import {
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { Skeleton } from "../ui/skeleton";

interface SubCategories {
  label: string;
  slug: string;
  id: string;
}

interface NavItems {
  label: string;
  slug: string;
  id: string;
  subCategory: SubCategories[];
}

const SidebarNav = () => {
  const axiosPublic = useAxiosPublic();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["side-cat"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category/merge");
      return res.data.categories;
    },
  });

  // loading

  if (isLoading) {
    return (
      <DrawerContent className="w-[300px] h-auto p-4  bg-secondary/60">
        <DrawerTitle className="text-lg font-semibold mb-4 text-nav">
          <Skeleton className="w-28 h-6 bg-primary/75"></Skeleton>
        </DrawerTitle>
        <Accordion
          type="multiple"
          className="w-full space-y-6 overflow-y-scroll mt-10"
        >
          {Array.from({ length: 6 })?.map((_, i) => (
            <Skeleton className="w-full h-6 bg-primary/75" key={i}></Skeleton>
          ))}
        </Accordion>
        <DrawerClose asChild>
          <Button variant="ghost" className="mt-4 w-full text-primary">
            Close
          </Button>
        </DrawerClose>
      </DrawerContent>
    );
  }

  return (
    <DrawerContent className="w-[300px] h-auto p-4  bg-secondary/60">
      <DrawerTitle className="text-lg font-semibold mb-4 text-nav">
        Categories
      </DrawerTitle>
      <Accordion type="multiple" className="w-full overflow-y-scroll">
        {categories?.map((cat: NavItems) => (
          <AccordionItem value={`cat-${cat.id}`} key={cat.id}>
            {cat?.subCategory.length > 0 ? (
              <AccordionTrigger icon className="text-nav text-lg">
                <Link href={`/shop/${cat.slug}`}>{cat.label}</Link>
              </AccordionTrigger>
            ) : (
              <AccordionTrigger className="text-nav text-lg">
                <Link href={`/shop/${cat.slug}`}>{cat.label}</Link>
              </AccordionTrigger>
            )}
            <AccordionContent>
              <ul className="pl-4 space-y-1">
                {cat.subCategory.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={sub.slug}
                      className=" text-nav text-lg hover:text-primary transition"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <DrawerClose asChild>
        <Button variant="ghost" className="mt-4 w-full text-primary">
          Close
        </Button>
      </DrawerClose>
    </DrawerContent>
  );
};

export default SidebarNav;
