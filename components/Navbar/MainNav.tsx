import Link from "next/link";
import React from "react";
import {
  FaCartArrowDown,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaMobileAlt,
  FaUserAlt,
} from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { Badge } from "../ui/badge";
import UserProfile from "../share/UserProfile/UserProfile";
import CateNav from "./CateNav";

const MainNav = () => {
  const socialIconStyle: string = "w-4 h-4 text-secondary";
  const userIcons: string = "w-6 h-6 text-nav";

  const navLink = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/" },
    { name: "About Us", href: "/" },
    { name: "Contact Us", href: "/" },
  ];

  return (
    <nav>
      <div className="w-full h-auto bg-primary ">
        <div className="container mx-auto py-2 px-5 flex justify-between">
          <Link
            href="tel:01716893200"
            aria-hidden="true"
            className="flex items-center gap-1"
          >
            <FaMobileAlt className="text-nav text-base" />
            <span className="text-secondary font-semibold text-sm">
              +88-01716893200
            </span>
          </Link>
          <h2 aria-hidden="true" className="text-nav font-semibold text-sm">
            Welcome to Cloudie Gadgets Shop
          </h2>
          <div className="flex gap-3">
            <Link href="/">
              <FaFacebookF className={`${socialIconStyle}`} />
            </Link>
            <Link href="/">
              <FaInstagram className={`${socialIconStyle}`} />
            </Link>
            <Link href="/">
              <IoLogoYoutube className={`${socialIconStyle}`} />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-auto bg-secondary   py-3 px-5 ">
        <div className="container mx-auto flex justify-between">
          <div className="text-nav font-semibold text-sm">logo</div>
          <div className="flex  items-center gap-4">
            <ul className="text-nav flex items-center gap-6">
              {navLink.map((item) => (
                <li key={item.name} className="group relative">
                  <Link
                    href={item.href}
                    className="transition-colors duration-300 hover:text-primary capitalize font-semibold text-lg"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="text-nav flex items-center gap-4">
              <li className="relative">
                <Link href="/">
                  <FaHeart className={userIcons} />
                </Link>
                <span
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                  className="absolute text-xs font-bold tabular-nums  leading-none text-secondary"
                >
                  5
                </span>
              </li>
              <li className="relative">
                <Link href="/">
                  <FaCartArrowDown className={userIcons} />
                </Link>
                <Badge className="h-5 w-5 absolute -top-2 bg-badge text-secondary -right-2 rounded-full font-bold tabular-nums">
                  10
                </Badge>
              </li>
              <li>
                <UserProfile />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" bg-primary/50">
        <CateNav />
      </div>
    </nav>
  );
};

export default MainNav;
