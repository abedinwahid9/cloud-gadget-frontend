"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { Skeleton } from "../ui/skeleton";

export interface SubCategory {
  id: string;
  slug: string;
  label: string;
}

export interface Category {
  id: string;
  slug: string;
  label: string;
  subCategory: SubCategory[];
}

const CateNav = () => {
  const axiosPublic = useAxiosPublic();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["cat-marge"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category/merge");
      return res.data.categories;
    },
  });

  // loading with skeleton
  if (isLoading) {
    return (
      <Skeleton className="bg-secondary/25 w-full h-10 container mx-auto flex justify-between items-center px-10">
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <Skeleton key={i} className="w-30 h-4 bg-secondary/75 rounded-sm" />
          );
        })}
      </Skeleton>
    );
  }

  return (
    <NavigationMenu
      viewport={false}
      className="container mx-auto w-full relative z-50 "
    >
      <NavigationMenuList className="flex justify-center-safe flex-wrap  w-full ">
        {categories?.slice(0, 10).map((cat: Category) => {
          return (
            <NavigationMenuItem className=" " key={cat.id}>
              {cat?.subCategory.length > 0 ? (
                <Link href={`/shop/${cat.slug}`}>
                  <NavigationMenuTrigger
                    icon
                    className="text-secondary/75 px-2 data-[state=open]:text-secondary hover:text-secondary font-bold uppercase bg-transparent dark:text-white whitespace-normal"
                  >
                    {cat.label}
                  </NavigationMenuTrigger>
                </Link>
              ) : (
                <Link href={`/shop/${cat.slug}`}>
                  <NavigationMenuTrigger className="text-secondary/75 data-[state=open]:text-secondary hover:text-secondary font-bold uppercase bg-transparent dark:text-white ">
                    {cat.label}
                  </NavigationMenuTrigger>
                </Link>
              )}

              {cat?.subCategory.length > 0 && (
                <NavigationMenuContent className="bg-secondary/85 rounded-md p-4 shadow-lg min-w-[250px]">
                  <ul className="grid gap-2">
                    {cat?.subCategory?.map((sub: SubCategory) => (
                      <li key={sub.id}>
                        <NavigationMenuLink asChild>
                          <Link href={`/shop/${cat.slug}/${sub.slug}`}>
                            <div className="text-lg text-nav leading-none font-semibold capitalize hover:underline">
                              {sub.label}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CateNav;
