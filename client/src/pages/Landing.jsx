// src/pages/Landing.jsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeatureSection";
import TestimonialsSection from "../components/TestimonialsSection";
import HowItWorks from "../components/HowItWorks";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const Landing = () => {
  const location = useLocation();

useEffect(() => {
  if (location.hash) {
    const element = document.querySelector(location.hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [location]);
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection/>
      <HowItWorks/>
      <TestimonialsSection/>
      <FaqSection/>
      <Footer/>
    </>
  );
};

export default Landing;
