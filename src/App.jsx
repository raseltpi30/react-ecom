import React from 'react'
import Category from './Sections/Category'
import Types from './Sections/Types'
import Services from './Sections/Services'
import Header from './Sections/Header'
import Hero from './Sections/Hero'
import Reviews from './Sections/Reviews'
import Footer from './Sections/Footer'
import Productgrid from './Sections/ProductGrid'  // Replace with actual component name when available
import Banner from './Sections/Banner'
import Insta from './Sections/Insta'

const App = () => {
  return (
    <>
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
    </>
  )
}

export default App
