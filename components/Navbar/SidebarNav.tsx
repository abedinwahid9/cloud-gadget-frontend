// components/SidebarDrawer.tsx
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
];
const SidebarNav = () => {
  return (
    <DrawerContent className="w-[300px] h-auto p-4  bg-secondary/60">
      <DrawerTitle className="text-lg font-semibold mb-4 text-nav">
        Categories
      </DrawerTitle>
      <Accordion type="multiple" className="w-full overflow-y-scroll">
        {navItems.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-nav text-lg">
              {item.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="pl-4 space-y-1">
                {item.subcategories.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      href={sub.href}
                      className=" text-nav text-lg hover:text-primary transition"
                    >
                      {sub.title}
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
