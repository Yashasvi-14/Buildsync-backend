import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/buildsync-logo.png"; // adjust path if needed

const HeroSection = () => {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Text Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Simplify Building Management with <span className="text-blue-600">BuildSync</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            BuildSync is your all-in-one solution for managing residents, staff, maintenance, and payments — seamlessly and securely.
          </p>
          <Link to="/login">
            <Button className="text-lg px-6 py-4 rounded-xl shadow-lg">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="BuildSync Logo"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
