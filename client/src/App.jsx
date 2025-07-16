import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import HeroSection from "@/components/HeroSection";
import Register from "./pages/Register";
import Login from "./pages/Login";

import ManagerRoutes from "./routes/ManagerRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
         <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manager/*" element={<ManagerRoutes />} />
        <Route path="*" element={<div className="text-red-500">404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;

