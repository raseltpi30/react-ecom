import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import headset from '../assets/headset.jpg';
import dslr from '../assets/dslr.jpg';
import eirbuds from '../assets/earbuds.jpg';

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1000,
      easing: "ease-in-out",
    });
    AOS.refresh();
  })

  return (
    <div id="hero" className="w-full flex justify-center items-center lg:h-[700px] h-[600px]">
      <Slider className="w-full" {...settings}>
        {/* Slide 1 */}
        <div>
          <div
            className="w-full lg:px-20 px-5 lg:h-[700px] h-[600px] flex flex-col justify-center items-start gap-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${headset})` }}
          >
            <h1
              data-aos="zoom-in"
              data-aos-delay="50"
              className="text-themeyellow border rounded-lg border-themeyellow px-6 py-2 text-xl"
            >
              Get upto Discounts 80% off
            </h1>
            <h1
              data-aos="zoom-in"
              data-aos-delay="100"
              className="text-white lg:text-[120px] text-[60px] uppercase font-bold lg:leading-[120px] leading-[80px]"
            >
              Wireless <br />
              Headset
            </h1>
            <h1
              data-aos="zoom-in"
              data-aos-delay="150"
              className="text-white text-2xl"
            >
              <span className="text-themeyellow">100% trusted</span> Electronics gadgets
            </h1>
            <button
              data-aos="zoom-in"
              data-aos-delay="200"
              className="bg-themeyellow px-6 py-3 rounded-lg text-black font-semibold"
            >
              ONLINE COLLECTIONS
            </button>
          </div>
        </div>

        {/* Slide 2 */}
        <div>
          <div
            className="w-full lg:px-20 px-5 lg:h-[700px] h-[600px] flex flex-col justify-center items-start gap-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${dslr})` }}
          >
            <h1
              data-aos="zoom-in"
              data-aos-delay="50"
              className="text-themeyellow border rounded-lg border-themeyellow px-6 py-2 text-xl"
            >
              Get upto Discounts 80% off
            </h1>
            <h1
              data-aos="zoom-in"
              data-aos-delay="100"
              className="text-white lg:text-[120px] text-[60px] uppercase font-bold lg:leading-[120px] leading-[70px]"
            >
              DSLR 360 <br />
              Camera
            </h1>
            <h1
              data-aos="zoom-in"
              data-aos-delay="150"
              className="text-white text-2xl"
            >
              <span className="text-themeyellow">100% trusted</span> Electronics gadgets
            </h1>
            <button
              data-aos="zoom-in"
              data-aos-delay="200"
              className="bg-themeyellow px-6 py-3 rounded-lg text-black font-semibold"
            >
              ONLINE COLLECTIONS
            </button>
          </div>
        </div>

        {/* Slide 3 */}
        <div>
          <div
            className="w-full lg:px-20 px-5 lg:h-[700px] h-[600px] flex flex-col justify-center items-start gap-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${eirbuds})` }}
          >
            <h1
              data-aos="zoom-in"
              data-aos-delay="50"
              className="text-themeyellow border rounded-lg border-themeyellow px-6 py-2 text-xl"
            >
              Get upto Discounts 80% off
            </h1>
            <h1
              data-aos="zoom-in"
              data-aos-delay="100"
              className="text-white lg:text-[120px] text-[60px] uppercase font-bold lg:leading-[120px] leading-[70px]"
            >
              Wireless <br />
              Earbuds
            </h1>
            <h1
              data-aos="zoom-in"
              data-aos-delay="150"
              className="text-white text-2xl"
            >
              <span className="text-themeyellow">100% trusted</span> Electronics gadgets
            </h1>
            <button
              data-aos="zoom-in"
              data-aos-delay="200"
              className="bg-themeyellow px-6 py-3 rounded-lg text-black font-semibold"
            >
              ONLINE COLLECTIONS
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HeroSlider;
