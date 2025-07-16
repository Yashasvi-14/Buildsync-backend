import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ManagerDashboard from "../pages/manager/Dashboard";
import Residents from "../pages/manager/Residents";
import Units from "../pages/manager/Units";
import Staff from "../pages/manager/Staff";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="residents" element={<Residents />} />
        <Route path="units" element={<Units />} />
        <Route path="staff" element={<Staff />} />
      </Route>
    </Routes>
  );
};

export default ManagerRoutes;
