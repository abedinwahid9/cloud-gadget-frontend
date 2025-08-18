import { Badge } from "lucide-react";
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

const MainNav = () => {
  const socialIconStyle: string = "w-4 h-4 text-secondary";
  const userIcons: string = "w-4 h-4 text-nav";

  return (
    <nav>
      <div className="w-full h-8 bg-primary ">
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
      <div className="w-full h-10 bg-secondary   py-2 px-5 ">
        <div className="container mx-auto flex justify-between">
          <div className="text-nav font-semibold text-sm">logo</div>
          <div className="flex  items-center gap-4">
            <ul className="text-nav flex items-center gap-4">
              <li>
                <Link href="/">home</Link>
              </li>
              <li>
                <Link href="/">products</Link>
              </li>
              <li>
                <Link href="">about us</Link>
              </li>
              <li>
                <Link href="/">contact us</Link>
              </li>
            </ul>
            <ul className="text-nav flex items-center gap-4">
              <li>
                <Link href="/">
                  <FaHeart className={userIcons} />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <FaCartArrowDown className={userIcons} />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <FaUserAlt className={userIcons} />
                </Link>
              </li>
              <div className="relative inline-block">
                <Badge>
                  <Link href="/"></Link>
                </Badge>

                {/* This is the icon you want to place at top right */}
                <FaUserAlt className="absolute top-0 right-0 text-primary" />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
