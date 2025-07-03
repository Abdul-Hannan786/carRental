import Banner from "@/components/Banner";
import FeaturedSection from "@/components/FeaturedSection";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import Testimonial from "@/components/Testimonial";
import React from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonial />
      <Newsletter />
      
    </>
  );
};

export default Home;
