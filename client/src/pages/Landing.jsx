// src/pages/Landing.jsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeatureSection";
import TestimonialsSection from "../components/TestimonialsSection";
import HowItWorks from "../components/HowItWorks";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
//import FeatureSection from "@/components/FeatureSection";

const Landing = () => {
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
