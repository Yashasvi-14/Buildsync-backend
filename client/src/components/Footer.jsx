import { Link } from "react-scroll";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">BuildSync</h3>
          <p className="text-gray-400">
            Seamless building management for admins, managers, and residents.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-gray-400">
            <li>
              <Link to="hero" smooth duration={500} className="cursor-pointer hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="features" smooth duration={500} className="cursor-pointer hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link to="testimonials" smooth duration={500} className="cursor-pointer hover:text-white">
                Testimonials
              </Link>
            </li>
            <li>
              <Link to="faq" smooth duration={500} className="cursor-pointer hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} BuildSync. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
