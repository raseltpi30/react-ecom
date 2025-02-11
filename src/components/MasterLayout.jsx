import React from "react";
import Header from "../Sections/Header";
import Hero from "../Sections/Hero";
import Category from "../Sections/Category";
import Types from "../Sections/Types";
import Services from "../Sections/Services";
import Productgrid from "../Sections/Productgrid";
import Banner from "../Sections/Banner";
import Reviews from "../Sections/Reviews";
import Insta from "../Sections/Insta";
import Footer from "../Sections/Footer";

const MasterLayout = () => {
  return (
    <div className="website-content">
      <Header />
      <Hero />
      <Category />
      <Types />
      <Services />
      <Productgrid />
      <Banner />
      <Reviews />
      <Insta />
      <Footer />
    </div>
  );
};

export default MasterLayout;
