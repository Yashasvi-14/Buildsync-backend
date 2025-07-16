// src/components/StatCard.jsx
import { cn } from "@/utils/cn";

const StatCard = ({ icon: Icon, label, value, className }) => {
  return (
    <div className={cn("bg-white p-4 rounded-2xl shadow-md flex items-center gap-4", className)}>
      <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
        <Icon size={28} />
      </div>
      <div>
        <h3 className="text-gray-500 text-sm">{label}</h3>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
