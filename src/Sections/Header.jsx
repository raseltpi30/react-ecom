import React, { useState } from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-scroll";
import LogoutButton from "../components/frontend/LogoutButton";

const Header = ({setIsLoggedIn}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="w-full px-16 py-2 bg-themeyellow lg:flex hidden justify-between items-center gap-6">
        <h1 className="text-sm font-semibold flex justify-center items-center gap-2">
          <FaPhoneAlt className="text-[18px]" />
          <span>+91 890 293 0910</span>
        </h1>
        <h1 className="text-sm font-semibold flex justify-center items-center gap-2">
          <FaMapMarkerAlt className="text-[18px]" />
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quia?</span>
        </h1>
        <h1 className="text-sm font-semibold flex justify-center items-center gap-2">
          <FaEnvelope className="text-[18px]" />
          <span>electrashop@company.com</span>
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="w-full bg-gray-100 flex justify-between items-center gap-1 lg:px-16 px-6 py-5 sticky top-0 z-50">
        {/* Logo */}
        <h1 className="text-themepurple font-bold lg:text-[38px] text-3xl underline italic">
          Electra Shop
        </h1>

        {/* Desktop Navigation */}
        <ul className="lg:flex justify-center items-center gap-10 hidden">
          {[
            { name: "Home", to: "hero" },
            { name: "About", to: "about" },
            { name: "Products", to: "products" },
            { name: "Testimonials", to: "testimonials" },
            { name: "Contact", to: "contact" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-70} // Adjust for sticky header height
              duration={500}
              className="text-black text-sm uppercase font-semibold cursor-pointer px-4 py-2 rounded-lg hover:bg-themepurple hover:text-white"
            >
              {item.name}
            </Link>
          ))}
          {/* Logout Option as List Item */}
          <LogoutButton setIsLoggedIn={setIsLoggedIn} />
        </ul>

        {/* Icons for Desktop */}
        <div id="header-icons" className="lg:flex hidden justify-center items-center gap-6 text-black">
          <FaSearch className="w-[20px] h-[20px] transform hover:scale-125 transition-transform duration-300 cursor-pointer hover:text-themepurple" />
          <FaUser className="w-[20px] h-[20px] transform hover:scale-125 transition-transform duration-300 cursor-pointer hover:text-themepurple" />
          <FaHeart className="w-[20px] h-[20px] transform hover:scale-125 transition-transform duration-300 cursor-pointer hover:text-themepurple" />
          <div className="relative">
            <FaShoppingCart className="w-[20px] h-[20px] transform hover:scale-125 transition-transform duration-300 cursor-pointer hover:text-themepurple" />
            <div className="bg-themepurple hover:bg-themeyellow px-3 py-1 text-white hover:text-black rounded-full absolute -top-[24px] -right-[15px] text-[14px] font-bold">
              2
            </div>
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="flex justify-center items-center lg:hidden">
          <div onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes className="text-themepurple text-3xl cursor-pointer" />
            ) : (
              <FaBars className="text-themepurple text-3xl cursor-pointer" />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full h-fit bg-themepurple p-4 absolute top-[80px] left-0 lg:hidden`}
        >
          <ul className="flex flex-col justify-center items-center gap-2 w-full">
            {[
              { name: "Home", to: "hero" },
              { name: "About", to: "about" },
              { name: "Products", to: "products" },
              { name: "Testimonials", to: "testimonials" },
              { name: "Contact", to: "contact" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-white uppercase font-semibold cursor-pointer p-3 rounded-lg hover:bg-themeyellow hover:text-black w-full text-center"
                onClick={() => setMenuOpen(false)} // Close the menu on click
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;