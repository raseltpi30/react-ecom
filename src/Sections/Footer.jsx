import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import images from assets
import client1 from "../assets/client1.png";
import client2 from "../assets/client2.png";
import client3 from "../assets/client3.png";
import client4 from "../assets/client4.png";
import client5 from "../assets/client5.png";
import client6 from "../assets/client6.png";

import googlePlay from "../assets/google.jpg";
import appleStore from "../assets/apple.jpg";

import pay1 from "../assets/pay-1.jpg";
import pay2 from "../assets/pay-2.jpg";
import pay3 from "../assets/pay-3.jpg";
import pay4 from "../assets/pay-4.jpg";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-scroll";


const Footer = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  // Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  const clients = [client1, client2, client3, client4, client5, client6];
  const usefulLinks = ["Home", "About", "Services", "Blogs", "Contact"];
  const informationLinks = [
    "Return Policy",
    "Privacy Policy",
    "Refund Policy",
    "Agreement",
    "We Our Brand",
  ];
  const topCategories = [
    "Wireless headphone",
    "Bluetooth speakers",
    "Portable devices",
    "Monio live camera",
    "Movie projector T6",
  ];
  const contactInfo = [
    "Phone: +1 234 567 890",
    "Email: info@domain.com",
    `401 Broadway, 24th floor,
    Orchard View, London, UK`,
  ];
  const paymentImages = [pay1, pay2, pay3, pay4];

  return (
    <div id="contact" className="w-full flex flex-col justify-center items-center">
      {/* Clients Section */}
      <div
        data-aos="zoom-in"
        data-aos-delay="100"
        className="w-full bg-themepurple lg:px-20 px-10 py-8 grid lg:grid-cols-6 grid-cols-2 justify-center items-center gap-10"
      >
        {clients.map((client, index) => (
          <img
            key={index}
            src={client}
            alt={`Client ${index + 1}`}
            className="w-[130px] opacity-70 cursor-pointer hover:opacity-100"
          />
        ))}
      </div>

      {/* Contact Info Section */}
      <div className="w-full lg:px-20 px-5 py-[60px] bg-gray-100 grid lg:grid-cols-[auto,auto,auto,auto,auto] grid-cols-1 justify-between items-start lg:gap-3 gap-10">
        {/* About Section */}
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          className="flex flex-col justify-center items-start gap-10 grow"
        >
          <div className="flex flex-col justify-center items-start gap-4">
            <h1 className="text-4xl font-bold text-themepurple underline italic">
              Electra Shop
            </h1>
            <p className="text-gray-500 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
              Vel aperiam facilis atque ullam pariatur. Nemo eligendi <br />
              officiis exercitationem officia reprehenderit.
            </p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <h1 className="text-black text-xl font-semibold capitalize">
              Download our App
            </h1>
            <div className="flex justify-center items-center gap-4">
              <img src={googlePlay} alt="Google Play" className="cursor-pointer" />
              <img src={appleStore} alt="Apple Store" className="cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <div data-aos="zoom-in" data-aos-delay="200">
          <h1 className="text-black text-xl font-semibold capitalize">
            Useful Links
          </h1>
          <ul className="mt-8 flex flex-col justify-center items-start gap-2">
            {usefulLinks.map((link, index) => (
              <li
                key={index}
                className="text-gray-500 cursor-pointer hover:text-black"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Information Links */}
        <div data-aos="zoom-in" data-aos-delay="300">
          <h1 className="text-black text-xl font-semibold capitalize">
            Information
          </h1>
          <ul className="mt-8 flex flex-col justify-center items-start gap-2">
            {informationLinks.map((link, index) => (
              <li
                key={index}
                className="text-gray-500 cursor-pointer hover:text-black"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Top Categories */}
        <div data-aos="zoom-in" data-aos-delay="400">
          <h1 className="text-black text-xl font-semibold capitalize">
            Top Category
          </h1>
          <ul className="mt-8 flex flex-col justify-center items-start gap-2">
            {topCategories.map((category, index) => (
              <li
                key={index}
                className="text-gray-500 cursor-pointer hover:text-black"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div data-aos="zoom-in" data-aos-delay="500">
          <h1 className="text-black text-xl font-semibold capitalize">
            Contact Info
          </h1>
          <ul className="mt-8 flex flex-col justify-center items-start gap-2">
            {contactInfo.map((info, index) => (
              <li
                key={index}
                className="text-gray-500 cursor-pointer hover:text-black"
              >
                {info}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full lg:px-20 px-5 py-[40px] bg-gray-100">
        <hr className="border-t border-gray-300 py-3" />
        <div className="w-full flex lg:flex-row flex-col justify-between items-center lg:gap-4 gap-10">
          <div className="lg:w-[20%] w-full flex justify-center items-center gap-4">
            {paymentImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Payment Option ${index + 1}`}
                className="w-[50px] rounded-lg"
              />
            ))}
          </div>
          <div className="lg:w-[60%] w-full flex flex-col justify-center items-center gap-4 flex-grow">
            <h1 className="text-black font-semibold text-2xl">
              Subscribe Newsletter
            </h1>
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                className="lg:w-auto w-full capitalize px-6 py-3 rounded-l-lg"
              />
              <button className="bg-themepurple lg:w-auto w-full text-white hover:bg-themeyellow hover:text-black px-6 py-3 rounded-r-lg font-semibold">
                SUBMIT
              </button>
            </div>
          </div>
          <div className="lg:w-[20%] w-full">
            <p className="text-gray-500 lg:text-end text-center">
              © 2024 Powered by Debug Entity
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Icon */}
      <div
        id="icon-box"
        className="bg-themepurple text-white p-3 rounded-full hover:bg-themeyellow hover:text-black cursor-pointer fixed lg:bottom-6 right-6 bottom-6"
      >
        <Link to="hero" spy={true} offset={-100} smooth={true}>
          <FaArrowUp className="w-[35px] h-[35px]" />
        </Link>
      </div>

    </div>
  );
};

export default Footer;
