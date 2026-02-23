"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaMobileAlt,
  FaSearch,
} from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";
import { usePathname } from "next/navigation";

import UserProfile from "../share/UserProfile/UserProfile";
import CateNav from "./CateNav";
import SidebarNav from "./SidebarNav";
import Cart from "../share/Cart/Cart";
import Wishlist from "../share/NavWishList/NavWishList";
import { ThemeBtn } from "../theme/ThemeBtn";
import SearchBox from "../SearchBox/SearchBox";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import { MdLocalShipping } from "react-icons/md";
import Image from "next/image";
import logo from "@/app/assets/logo/logo.png";

export const userIcons = "w-7 h-7 text-secondary hover:text-nav";

const MainNav = () => {
  const [searchToggle, setSearchToggle] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();

  const socialIconStyle = "md:w-6 md:h-6 w-5 h-5 text-text";

  const navLink = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact" },
  ];

  // 🔥 Ghorerbazar-style scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="relative">
      {/* FIXED NAV WRAPPER */}
      <div
        className={`fixed top-0 right-0 w-full z-40 transition-transform duration-300 ease-in-out
        ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
      >
        <Drawer direction="left">
          {/* 🔹 TOP BAR */}
          <div className="w-full bg-primary">
            <div className="container mx-auto py-2 lg:px-5 px-1 flex justify-between">
              <Link href="tel:01716893200" className="flex items-center gap-1">
                <FaMobileAlt className="text-text md:text-base text-xs" />
                <span className="text-text font-semibold md:text-sm text-[8px]">
                  +88-01716893200
                </span>
              </Link>

              <h2 className="text-text font-semibold md:text-lg text-xs">
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

          {/* 🔹 MAIN NAV */}
          <div className="w-full bg-background/90 backdrop-blur-md shadow-md lg:px-5 px-2">
            <div className="container mx-auto flex justify-between items-center">
              {/* Logo + Mobile Menu */}
              <div className="flex items-center gap-2">
                <DrawerTrigger asChild className="lg:hidden block">
                  <RiMenu2Line className="w-7 h-7 text-primary dark:text-secondary cursor-pointer" />
                </DrawerTrigger>

                <Link href="/">
                  {/* <h2 className="text-xl font-bold">Cloudie Gadget</h2> */}
                  <Image width={80} height={60} src={logo} alt="hadiyya" />
                </Link>
              </div>

              {/* Nav Links */}
              <ul className="hidden lg:flex items-center gap-6">
                {navLink.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <li key={item.name} className="relative">
                      <Link
                        href={item.href}
                        className={`font-semibold text-lg transition-colors duration-300
                        ${
                          isActive
                            ? "text-nav"
                            : "text-secondary hover:text-nav"
                        }`}
                      >
                        {item.name}
                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] bg-nav transition-all duration-300
                          ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Right Icons */}
              <ul className="flex items-center md:gap-4 gap-2">
                <li className="hidden lg:block">
                  <Link href="/order-searching">
                    <MdLocalShipping className={userIcons} />
                  </Link>
                </li>
                <li className="hidden lg:block">
                  <Link href="/wishlist">
                    <Wishlist css={userIcons} />
                  </Link>
                </li>

                <li className="hidden lg:block">
                  <Link href="/cart">
                    <Cart css={userIcons} />
                  </Link>
                </li>

                <button
                  disabled={searchToggle}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchToggle(true);
                  }}
                >
                  <FaSearch
                    className={`${userIcons} ${
                      searchToggle ? "!text-nav !cursor-not-allowed" : ""
                    }`}
                  />
                </button>

                <li className="hidden lg:block">
                  <ThemeBtn />
                </li>

                <li>
                  <UserProfile />
                </li>
              </ul>
            </div>
          </div>

          {/* 🔹 CATEGORY NAV */}
          {showHeader && (
            <div className="bg-secondary/40 backdrop-blur-2xl mt-2 mx-2  rounded-xl hidden lg:block">
              <CateNav />
            </div>
          )}

          {/* 🔹 SIDEBAR */}
          <div className="relative z-[200]">
            <SidebarNav />
          </div>
        </Drawer>
      </div>

      {/* SEARCH BOX */}
      <SearchBox
        searchToggle={searchToggle}
        setSearchToggle={setSearchToggle}
      />

      {/* Spacer so content doesn't jump */}
      <div className="h-[120px] lg:h-[175px]" />
    </header>
  );
};

export default MainNav;
