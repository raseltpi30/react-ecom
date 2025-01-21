import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { reviewdata } from '../export';
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";

const Reviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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
    <div id="testimonials" className="w-full lg:px-20 px-5 py-[80px] bg-gray-100 flex flex-col justify-center items-center gap-4">
      <h1 data-aos="zoom-in" data-aos-delay="100" className="text-themepurple text-xl font-semibold capitalize">1300+ Customer reviews</h1>
      <h1 data-aos="zoom-in" data-aos-delay="200" className="text-black font-semibold text-[42px] leading-[50px] text-center capitalize">Our customer love</h1>
      <div data-aos="zoom-in" data-aos-delay="300" className="w-full mt-10">
        <Slider {...settings} className="w-full">
          {reviewdata.map((review, index) => (
            <div>
              <div key={index} className="w-full flex flex-col justify-center items-center gap-4 lg:p-10 p-3" >
                {/* User's image */}
                <img
                  src={review.img}
                  alt={review.name}
                  className="rounded-full w-[100px] m-auto"
                />
                <div className="flex justify-center items-center gap-1">
                  <FaStar className="text-themepurple" />
                  <FaStar className="text-themepurple" />
                  <FaStar className="text-themepurple" />
                  <FaStar className="text-themepurple" />
                  <FaStar className="text-themepurple" />
                </div>
                {/* Review text */}
                <p className="text-center text-gray-500 text-lg">
                  {review.para}
                </p>

                {/* Reviewer details */}
                <div className="w-full flex justify-center items-center gap-5">
                  <FaQuoteLeft className="fill-themepurple size-16 text-center" />
                  <div className="flex flex-col justify-center items-start">
                    <h1 className="text-black text-xl capitalize font-semibold">
                      {review.name}
                    </h1>
                    <h1 className="text-gray-500 capitalize">{review.post}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Reviews
