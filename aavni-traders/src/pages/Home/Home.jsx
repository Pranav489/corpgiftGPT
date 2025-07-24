import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import ProductShowcase from "./ProductShowcase";
import CategoriesSection from "./CategoriesSection";
import ProductsPage from "./ProductsPage";
import useStore from "../../store/useStore";

function Home() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <ProductsPage />
      <ProductShowcase />
    </div>
  );
}

export default Home;
