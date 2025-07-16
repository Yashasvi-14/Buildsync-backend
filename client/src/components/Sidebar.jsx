// Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/manager/dashboard" },
    { name: "Residents", path: "/manager/residents" },
    { name: "Units", path: "/manager/units" },
    { name: "Staff", path: "/manager/staff" },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-md flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">BuildSync</h1>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-lg font-medium transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-blue-600 font-bold"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-6">
        <button className="w-full text-left text-red-500 hover:text-red-700 font-semibold">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
