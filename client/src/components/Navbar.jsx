import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/buildsync-logo.png"; 
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Guide", path: "/how-it-works" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="BuildSync Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav Links */}
<div className="hidden md:flex gap-4 items-center">
  {navLinks.map(link => {
    if (link.name === "Login") {
      return (
        <Link key={link.name} to={link.path}>
          <Button variant="outline" className="border-black text-black hover:bg-gray-100">
            {link.name}
          </Button>
        </Link>
      );
    }

    if (link.name === "Register") {
      return (
        <Link key={link.name} to={link.path}>
          <Button className="bg-primary text-white hover:bg-primary/90">
            {link.name}
          </Button>
        </Link>
      );
    }

    return (
      <Link
        key={link.name}
        to={link.path}
        className="text-gray-700 hover:text-primary transition font-medium"
      >
        {link.name}
      </Link>
    );
  })}
</div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map(link => {
  if (link.name === "Login") {
    return (
      <Link key={link.name} to={link.path} onClick={() => setMobileOpen(false)}>
        <Button
          variant="outline"
          className="w-full border-black text-black mt-1 hover:bg-gray-100"
        >
          {link.name}
        </Button>
      </Link>
    );
  }

  if (link.name === "Register") {
    return (
      <Link key={link.name} to={link.path} onClick={() => setMobileOpen(false)}>
        <Button className="w-full bg-primary text-white mt-1 hover:bg-primary/90">
          {link.name}
        </Button>
      </Link>
    );
  }

  return (
    <Link
      key={link.name}
      to={link.path}
      onClick={() => setMobileOpen(false)}
      className="block text-gray-700 hover:text-primary transition font-medium mt-1"
    >
      {link.name}
    </Link>
  );
})}


        </div>
      )}
    </header>
  );
};

export default Navbar;
