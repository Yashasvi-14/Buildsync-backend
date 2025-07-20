import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import HeroSection from "@/components/HeroSection";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FeatureSection from "./components/FeatureSection";
import FaqSection from "./components/FaqSection";
import HowItWorks from "./components/HowItWorks";

import ManagerRoutes from "./routes/ManagerRoutes";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<HeroSection />} />
        <Route path="/features" element={<FeatureSection />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manager/*" element={<ManagerRoutes />} />
        <Route path="*" element={<div className="text-red-500">404 Not Found</div>} />
    </Routes>
  );
}

export default App;

