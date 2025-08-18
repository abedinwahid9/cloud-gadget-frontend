import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaMobileAlt } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const MainNav = () => {
  const socialIconStyle: string = "w-4 h-4 text-secondary";

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
      <div className="w-full h-10 bg-secondary  ">
        <div className="container mx-auto flex justify-between">
          <div>logo</div>
          <div>
            <ul>
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
                <Link href="/">contact</Link>
              </li>
              <li>
                <Link href="/"></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
