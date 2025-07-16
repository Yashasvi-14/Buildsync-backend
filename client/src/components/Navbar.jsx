import { Link } from "react-router-dom";
import logo from "@/assets/buildsync-logo.png";

const Navbar = () => {
  return (
    <nav className="h-20 flex items-center justify-between px-6 bg-white shadow">
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="BuildSync Logo"
          className="h-14 w-auto object-contain"
        />
      </Link>

      <div className="flex gap-4 items-center">
        <Link
          to="/login"
            className="text-sm font-medium text-white px-4 py-2 rounded 
             bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] hover:opacity-90 transition-all"

        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-sm font-medium text-white px-4 py-2 rounded 
             bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] hover:opacity-90 transition-all"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
