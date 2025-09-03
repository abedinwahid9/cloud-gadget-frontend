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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navItems = [
  {
    title: "Phones & Tablets",
    href: "/category/phones-and-tablets",
    description: "Latest smartphones, tablets, and mobile devices",
    subcategories: [
      {
        title: "Smartphones",
        href: "/category/phones-and-tablets/smartphones",
      },
      { title: "Tablets", href: "/category/phones-and-tablets/tablets" },
      { title: "iPads", href: "/category/phones-and-tablets/ipads" },
      {
        title: "Gaming Phones",
        href: "/category/phones-and-tablets/gaming-phones",
      },
      {
        title: "Feature Phones",
        href: "/category/phones-and-tablets/feature-phones",
      },
    ],
  },
  {
    title: "Laptop & Desktop",
    href: "/category/laptop-desktop",
    description: "Professional laptops, desktops, and computing solutions",
    subcategories: [
      { title: "Laptops", href: "/category/laptop-desktop/laptops" },
      { title: "Monitors", href: "/category/laptop-desktop/monitors" },
      { title: "Desktops", href: "/category/laptop-desktop/desktops" },
      { title: "Mini PCs", href: "/category/laptop-desktop/mini-pcs" },
      {
        title: "All-in-One PCs",
        href: "/category/laptop-desktop/all-in-one-pcs",
      },
      {
        title: "Gaming Laptops",
        href: "/category/laptop-desktop/gaming-laptops",
      },
    ],
  },
  {
    title: "Cover & Glass",
    href: "/category/cover-and-glass",
    description: "Protective cases and screen protection",
    subcategories: [
      { title: "Phone Cases", href: "/category/cover-and-glass/phone-cases" },
      {
        title: "Screen Protectors",
        href: "/category/cover-and-glass/screen-protectors",
      },
      {
        title: "Privacy Films",
        href: "/category/cover-and-glass/privacy-films",
      },
      {
        title: "Rugged Covers",
        href: "/category/cover-and-glass/rugged-covers",
      },
      {
        title: "Waterproof Covers",
        href: "/category/cover-and-glass/waterproof-covers",
      },
    ],
  },
  {
    title: "Smart Electronics",
    href: "/category/smart-electronics",
    description: "Innovative smart devices and electronics",
    subcategories: [
      {
        title: "Smart Home Devices",
        href: "/category/smart-electronics/smart-home-devices",
      },
      { title: "Drones", href: "/category/smart-electronics/drones" },
      { title: "Cameras", href: "/category/smart-electronics/cameras" },
      { title: "Projectors", href: "/category/smart-electronics/projectors" },
      { title: "TV Boxes", href: "/category/smart-electronics/tv-boxes" },
    ],
  },
  {
    title: "Cover & Glass",
    href: "/category/cover-and-glass",
    description: "Protective cases and screen protection",
    subcategories: [
      { title: "Phone Cases", href: "/category/cover-and-glass/phone-cases" },
      {
        title: "Screen Protectors",
        href: "/category/cover-and-glass/screen-protectors",
      },
      {
        title: "Privacy Films",
        href: "/category/cover-and-glass/privacy-films",
      },
      {
        title: "Rugged Covers",
        href: "/category/cover-and-glass/rugged-covers",
      },
      {
        title: "Waterproof Covers",
        href: "/category/cover-and-glass/waterproof-covers",
      },
    ],
  },
  {
    title: "Smart Electronics",
    href: "/category/smart-electronics",
    description: "Innovative smart devices and electronics",
    subcategories: [
      {
        title: "Smart Home Devices",
        href: "/category/smart-electronics/smart-home-devices",
      },
      { title: "Drones", href: "/category/smart-electronics/drones" },
      { title: "Cameras", href: "/category/smart-electronics/cameras" },
      { title: "Projectors", href: "/category/smart-electronics/projectors" },
      { title: "TV Boxes", href: "/category/smart-electronics/tv-boxes" },
    ],
  },
];

const CateNav = () => {
  return (
    <NavigationMenu
      viewport={false}
      className="container mx-auto w-full relative z-50 "
    >
      <NavigationMenuList className="flex flex-wrap w-full ">
        {navItems?.map((item, i) => {
          return (
            <NavigationMenuItem key={i}>
              <NavigationMenuTrigger className="text-secondary/75 data-[state=open]:text-secondary hover:text-secondary font-bold uppercase bg-transparent dark:text-white ">
                {item.title}
              </NavigationMenuTrigger>

              <NavigationMenuContent className="bg-secondary/85 rounded-md p-4 shadow-lg min-w-[250px]">
                <ul className="grid gap-2">
                  {item?.subcategories?.map((link, i) => (
                    <li key={i}>
                      <NavigationMenuLink asChild>
                        <Link href={link.href}>
                          <div className="text-lg text-nav leading-none font-semibold capitalize hover:underline">
                            {link.title}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CateNav;
