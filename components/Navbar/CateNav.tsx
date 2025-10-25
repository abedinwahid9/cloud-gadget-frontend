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

  const { data: categories } = useQuery({
    queryKey: ["cat-marge"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category/merge");
      return res.data.categories;
    },
  });

  return (
    <NavigationMenu
      viewport={false}
      className="container mx-auto w-full relative z-50 "
    >
      <NavigationMenuList className="flex flex-wrap  w-full ">
        {categories?.slice(0, 6).map((cat: Category) => {
          return (
            <NavigationMenuItem key={cat.id}>
              {cat?.subCategory.length > 0 ? (
                <Link href={`/shop/${cat.slug}`}>
                  <NavigationMenuTrigger
                    icon
                    className="text-secondary/75 data-[state=open]:text-secondary hover:text-secondary font-bold uppercase bg-transparent dark:text-white "
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
                          <Link href={`/shop/${sub.slug}`}>
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
