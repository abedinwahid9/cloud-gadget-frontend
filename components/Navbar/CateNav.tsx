"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Mobile Point",
    slug: "mobile-point",
    subcategories: [
      "Adapter & Cable",
      "Stylus",
      "Protection & Safety",
      "Wireless Charging",
      "Cables & Converters",
      "Tripod",
      "Gimbal",
      "Selfie Stick",
      "Power Station",
      "Memory Card",
    ],
  },
  {
    title: "Protections",
    slug: "protections",
    subcategories: [
      "Screen Protectors",
      "Phone Cases",
      "Rugged Covers",
      "Privacy Films",
      "Waterproof Covers",
    ],
  },
  {
    title: "Earphones & Headphones",
    slug: "earphones-headphones",
    subcategories: [
      "Wireless Earbuds",
      "Over‑Ear Headphones",
      "Neckband Earphones",
      "Gaming Headsets",
      "Noise‑Cancelling",
    ],
  },
  {
    title: "Speakers",
    slug: "speakers",
    subcategories: [
      "Bluetooth Speakers",
      "Smart Home Speakers",
      "Portable Mini Speakers",
      "Party Speakers",
      "Waterproof Speakers",
    ],
  },
  {
    title: "Smart Watch",
    slug: "smart-watch",
    subcategories: [
      "Fitness Trackers",
      "GPS Smartwatches",
      "Kids Smartwatches",
      "Hybrid Smartwatches",
      "Watch Bands & Straps",
    ],
  },
  {
    title: "Computer & Office",
    slug: "computer-office",
    subcategories: [
      "Laptops",
      "Desktop Accessories",
      "Monitors",
      "Keyboards & Mice",
      "Printers & Scanners",
      "Storage Devices",
      "Networking Gear",
      "Power Supplies",
    ],
  },
  {
    title: "Consumer Electronics",
    slug: "consumer-electronics",
    subcategories: [
      "Smart Home Devices",
      "Drones",
      "Cameras",
      "Fitness Gadgets",
      "Projectors",
      "Wearables",
    ],
  },
  {
    title: "More",
    slug: "more",
    subcategories: [
      "Deals",
      "New Arrivals",
      "Gift Cards",
      "Accessories",
      "Refurbished",
    ],
  },
];

const CateNav = () => {
  return (
    <NavigationMenu className="bg-white shadow text-sm px-6 py-3">
      <NavigationMenuList className="flex gap-6">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.slug}>
            {item.subcategories.length > 0 ? (
              <>
                <NavigationMenuTrigger className="uppercase font-semibold text-gray-700 hover:text-[#004030]">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border rounded-md shadow-lg p-4">
                  <ul className="grid gap-2 w-60">
                    {item.subcategories.map((sub, i) => (
                      <li key={i}>
                        <Link
                          href={`/category/${item.slug}/${sub
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className={cn(
                            "block text-sm px-4 py-2 rounded-md hover:bg-[#f0f0f0] hover:text-[#004030] transition"
                          )}
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link
                href={`/category/${item.slug}`}
                className="uppercase font-semibold text-gray-700 hover:text-[#004030] px-2 py-1"
              >
                {item.title}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CateNav;
