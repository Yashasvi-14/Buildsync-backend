import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-white py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Modern Building Management, <br />
          Simplified with{" "}
          <span className="text-brand-dark">BuildSync</span>

        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Centralize operations — manage residents, units, staff, and maintenance with one seamless, powerful dashboard.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/register"
            className="bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow hover:opacity-90 transition-all"

          >
            Get Started
          </Link>

          <a
  href="#features"
  className="text-brand-dark font-medium text-sm hover:underline"
>
  Learn More
</a>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
