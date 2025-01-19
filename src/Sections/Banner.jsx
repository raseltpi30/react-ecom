import React, { useEffect } from 'react';
import deal from '../assets/deal-bg.jpg';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Banner = () => {
  useEffect(() => {
      AOS.init({
        offset: 100,
        duration: 1000,
        easing: "ease-in-out",
      });
      AOS.refresh();
    })
  return (
    <div className="w-full lg:px-20 px-5 py-[80px]">
      <div
        data-aos="zoom-in"
        data-aos-delay="100"
        className="w-full h-[300px] rounded-lg bg-cover bg-center flex flex-col justify-center items-center gap-3"
        style={{ backgroundImage: `url(${deal})` }}
      >
        <h1 className="text-themeyellow text-xl font-semibold">
          Every day shopping
        </h1>
        <h1 className="text-white font-bold text-[42px] leading-[50px] text-center">
          Deal of the Day
        </h1>
        <button className="bg-themeyellow hover:bg-white text-black font-semibold px-8 py-3 rounded-lg mt-8">
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default Banner;
