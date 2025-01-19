import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import shippingImage from '../assets/shipping.png';
import paymentImage from '../assets/payment.png';
import returnImage from '../assets/return.png';
import giftImage from '../assets/gift.png';


const Services = () => {
  useEffect(() => {
      AOS.init({
        offset: 100,
        duration: 1000,
        easing: "ease-in-out",
      });
      AOS.refresh();
    })
  return (
    <div className="w-full lg:px-20 px-5 pt-0 pb-[80px] grid lg:grid-cols-4 grid-cols-1 justify-center items-center gap-10">
      <div data-aos="zoom-in" data-aos-delay="100" className="flex flex-col justify-center items-center gap-2">
        <img src={shippingImage} alt="Worldwide Shipping" className="mb-[20px] w-[60px]" />
        <h1 className="text-xl text-black font-semibold">Worldwide Shipping</h1>
        <p className="text-[17px] text-gray-500">Lorem ipsum dolor sit amet.</p>
      </div>
      <div data-aos="zoom-in" data-aos-delay="200" className="flex flex-col justify-center items-center gap-2">
        <img src={paymentImage} alt="Secure Payment" className="mb-[20px] w-[60px]" />
        <h1 className="text-xl text-black font-semibold">Secure Payment</h1>
        <p className="text-[17px] text-gray-500">Lorem ipsum dolor sit amet.</p>
      </div>
      <div data-aos="zoom-in" data-aos-delay="300" className="flex flex-col justify-center items-center gap-2">
        <img src={returnImage} alt="Return/Refund" className="mb-[20px] w-[60px]" />
        <h1 className="text-xl text-black font-semibold">Return/Refund</h1>
        <p className="text-[17px] text-gray-500">Lorem ipsum dolor sit amet.</p>
      </div>
      <div data-aos="zoom-in" data-aos-delay="400" className="flex flex-col justify-center items-center gap-2">
        <img src={giftImage} alt="Best Gift Voucher" className="mb-[20px] w-[60px]" />
        <h1 className="text-xl text-black font-semibold">Best Gift Voucher</h1>
        <p className="text-[17px] text-gray-500">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  );
};

export default Services;
