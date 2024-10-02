"use client";

import React from "react";
import Layout from "./Layout";
import HeroSection from "./HeroSection";
import MainSection from "./MainSection";
import WarningSection from "./WarningSection";
import FreeGiftSection from "./FreeGiftSection";
import Feedback from "./feedback";
import PaymentMethods from "./PaymentMethods";
import Faqs from "./Faqs";
const ProductDetailComponent = () => {
  const product = {
    id: "1",
    name: "Bawah lantai penuh sarang anai-anai",
    images: [
      "/assets/images/product-1.png",
      "/assets/images/product-1.png",
      "/assets/images/product-2.png",
      "/assets/images/product-3.png",
    ],
    rating: 4.8,
    price: 39.0,
    discount: 20,
  };
  return (
    <Layout>
      <HeroSection product={product} />

      <MainSection />
      <WarningSection />
      <FreeGiftSection />
      <Feedback />
      <PaymentMethods />
      <Faqs />
    </Layout>
  );
};

export default ProductDetailComponent;
