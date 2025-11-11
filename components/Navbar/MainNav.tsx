"use client";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaMobileAlt,
  FaSearch,
} from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import UserProfile from "../share/UserProfile/UserProfile";
import CateNav from "./CateNav";
import SidebarNav from "./SidebarNav";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import { RiMenu2Line } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Cart from "../share/Cart/Cart";
import Wishlist from "../share/Wishlist/Wishlist";
import { ThemeBtn } from "../theme/ThemeBtn";
import Image from "next/image";
import logo1 from "@/public/logo1.png";

const MainNav = () => {
  const socialIconStyle = "md:w-6 md:h-6 w-5 h-5 text-text";
  const userIcons = "w-6 h-6 text-secondary hover:text-nav";

  const navLink = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact" },
  ];

  const pathname = usePathname();

  return (
    <header>
      <Drawer direction="left">
        {/* top nav */}
        <div className="w-full bg-primary">
          <div className="container mx-auto py-2 lg:px-5 px-1 flex justify-between">
            <Link
              href="tel:01716893200"
              aria-hidden="true"
              className="flex items-center gap-1"
            >
              <FaMobileAlt className="text-text md:text-base text-xs" />
              <span className="text-text  font-semibold md:text-sm text-[8px]">
                +88-01716893200
              </span>
            </Link>
            <h2
              aria-hidden="true"
              className="text-text font-semibold  md:text-lg text-xs"
            >
              Welcome to Cloudie Gadgets Shop
            </h2>
            <div className="flex gap-3">
              <Link href="/">
                <FaFacebookF className={socialIconStyle} />
              </Link>
              <Link href="/">
                <FaInstagram className={socialIconStyle} />
              </Link>
              <Link href="/">
                <IoLogoYoutube className={socialIconStyle} />
              </Link>
            </div>
          </div>
        </div>

        {/* main nav */}
        <div className="w-full shadow-md shadow-primary/20 to-70%  py-4 lg:px-5  px-1 ">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo + Menu */}
            <div className="flex items-center gap-2">
              <DrawerTrigger className="lg:hidden block" asChild>
                <RiMenu2Line className="w-7 h-7 text-primary cursor-pointer" />
              </DrawerTrigger>

              <Link className="" href="/">
                {/* <Image
                  className="object-contain w-20 h-12"
                  width={500}
                  height={500}
                  src={logo1}
                  alt="logo"
                /> */}
                <h2 className="text-xl font-bold">Cloudie Gadget</h2>
              </Link>
            </div>
            {/* Nav links */}
            <ul className="text-nav lg:flex items-center gap-6 hidden">
              {navLink.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li key={item.name} className="group relative">
                    <Link
                      href={item.href}
                      className={`capitalize font-semibold text-lg transition-colors duration-300  ${
                        isActive ? "text-nav" : "text-secondary hover:text-nav"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] bg-nav transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* User icons */}
            <ul className="text-nav flex items-center gap-4">
              <li className="hidden lg:block">
                <Link href="/wishlist">
                  <Wishlist css={userIcons} />
                </Link>
              </li>
              <li className=" hidden lg:block">
                <Link href="/cart">
                  <Cart css={userIcons} />
                </Link>
              </li>
              <li>
                <FaSearch className={userIcons} />
              </li>
              <li className="hidden lg:block">
                <ThemeBtn />
              </li>{" "}
              <li>
                <UserProfile />
              </li>
            </ul>
          </div>
        </div>

        {/* category nav link */}
        <div className="bg-secondary/50 mt-2 mx-2 shadow-[0px_0px_5px_0px_#233E2B]/50 rounded-xl hidden lg:block">
          <CateNav />
        </div>

        {/* side nav */}
        <SidebarNav />
      </Drawer>
    </header>
  );
};

export default MainNav;
