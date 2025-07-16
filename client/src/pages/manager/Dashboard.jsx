import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import { Users, Building2, Wrench } from "lucide-react";
import axios from "@/lib/axios";
import ManagerProfileCard from "../../components/ManagerProfileCard";

const ManagerDashboard = () => {
  const [stats, setStats] = useState({ residents: 0, units: 0, staff: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/manager/dashboard-stats");
        setStats(response.data); // { residents: 42, units: 18, staff: 7 }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <ManagerProfileCard />
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard title="Total Residents" value={stats.residents} icon={Users} />
        <StatCard title="Total Units" value={stats.units} icon={Building2} />
        <StatCard title="Total Staff" value={stats.staff} icon={Wrench} />
      </div>
    </div>
  );
};

export default ManagerDashboard;
