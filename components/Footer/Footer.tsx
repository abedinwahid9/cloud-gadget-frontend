import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 md:mb-0 mb-8  ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-blue-500">GadgetHub</h2>
          <p className="text-sm mt-2 text-gray-400">
            Your one-stop shop for the latest gadgets & tech accessories.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#">New Arrivals</a>
            </li>
            <li>
              <a href="#">Best Sellers</a>
            </li>
            <li>
              <a href="#">Smartphones</a>
            </li>
            <li>
              <a href="#">Accessories</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Warranty</a>
            </li>
            <li>
              <a href="#">Shipping Info</a>
            </li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-red-600">
              <FaYoutube />
            </a>
          </div>
          <form className="mt-2">
            <input
              type="email"
              placeholder="Subscribe for updates"
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-10 pt-4 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} GadgetHub. All rights reserved.
      </div>
    </footer>
  );
}
