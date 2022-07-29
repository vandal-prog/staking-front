import React from "react";

import HeroSection from "../components/ui/HeroSection";

import LiveAuction from "../components/ui/Live-auction/LiveAuction";
import SellerSection from "../components/ui/Seller-section/SellerSection";

import About from "../components/ui/aboutp/About";

import Trending from "../components/ui/Trending-section/Trending";

import StepSection from "../components/ui/Step-section/StepSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <SellerSection />
      <About />
      <LiveAuction />
      
      <Trending />
      <StepSection />
    </>
  );
};

export default Home;
