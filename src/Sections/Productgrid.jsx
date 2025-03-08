import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MdStar, MdAddShoppingCart, MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Productgrid = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); // ✅ Use navigate for routing

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1000,
      easing: "ease-in-out",
    });
    AOS.refresh();

    axios.get("http://localhost:8000/api/user/products")
      .then(response => {
        setProducts(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // ✅ Function to navigate to Product Details
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div id="products" className="w-full lg:px-20 px-5 py-[80px] bg-gray-100 flex flex-col justify-center items-center gap-4">
      <h1 data-aos="zoom-in" data-aos-delay="100" className="text-themepurple text-xl font-semibold">
        Browse Collection
      </h1>
      <h1 data-aos="zoom-in" data-aos-delay="200" className="text-black font-semibold text-[42px] leading-[50px] text-center">
        Trending Products
      </h1>

      {loading ? (
        <p className="text-lg text-gray-600 font-semibold">Loading products...</p>
      ) : (
        <div data-aos="slide-up" data-aos-delay="300" className="w-full grid lg:grid-cols-4 grid-cols-1 justify-center items-center gap-10 mt-10">
          {products.map((product, index) => (
            <div 
              id='product-box' 
              key={index} 
              className="flex flex-col justify-center items-center gap-2 bg-white p-4 rounded-lg cursor-pointer relative"
              onClick={() => handleProductClick(product.id)} // ✅ Clicking anywhere will navigate
            >
              <img src={product.img} alt={product.name} className='lg:h-[250px] h-[200px]' />

              {/* ✅ Clickable Icons */}
              <div id="icons" className="flex justify-center items-center gap-3 absolute top-[20px]">
                <div 
                  className="bg-themepurple hover:bg-themeyellow hover:text-black rounded-full p-3 text-white"
                  onClick={(e) => { e.stopPropagation(); handleProductClick(product.id); }} // ✅ Prevent Parent Click
                >
                  <MdOutlineRemoveRedEye />
                </div>
                <div 
                  className="bg-themepurple hover:bg-themeyellow hover:text-black rounded-full p-3 text-white"
                  onClick={(e) => { e.stopPropagation(); console.log("Added to Wishlist:", product); }} 
                >
                  <FaRegHeart />
                </div>
                <div 
                  className="bg-themepurple hover:bg-themeyellow hover:text-black rounded-full p-3 text-white"
                  onClick={(e) => { e.stopPropagation(); console.log("Added to Cart:", product); }} 
                >
                  <MdAddShoppingCart />
                </div>
              </div>

              <h1 className="text-lg text-gray-400 font-normal">{product.name}</h1>
              <h1 className="text-xl text-black font-semibold">{product.category}</h1>
              <h1 className="text-lg text-themepurple font-semibold">{product.price}</h1>
              <div className="w-full mt-2">
                <hr />
                <div className="flex justify-between items-center gap-6 mt-3">
                  <div className="flex justify-center gap-1">
                    <FaStar className='text-themepurple' />
                    <FaStar className='text-themepurple' />
                    <FaStar className='text-themepurple' />
                    <FaStar className='text-themepurple' />
                    <FaStar className='text-themepurple' />
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-[13px] font-semibold">
                    {product.sale_percentage}%
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button data-aos="zoom-in" data-aos-delay="400" className="bg-themepurple hover:bg-themeyellow text-white hover:text-black font-semibold px-8 py-3 rounded-lg mt-8">
        VIEW MORE
      </button>
    </div>
  );
};

export default Productgrid;
