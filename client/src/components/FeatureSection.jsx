import { Building, Wrench, ShieldCheck, BarChart } from "lucide-react";

const features = [
  {
    icon: <Building size={32} className="text-brand-dark" />,
    title: "Resident & Unit Management",
    desc: "Track units, assign residents, and manage occupancy in real time.",
  },
  {
    icon: <Wrench size={32} className="text-brand-dark" />,
    title: "Staff & Maintenance",
    desc: "Assign maintenance staff, track tasks, and handle service requests efficiently.",
  },
  {
    icon: <ShieldCheck size={32} className="text-brand-dark" />,
    title: "Role-Based Dashboards",
    desc: "Separate views for admins, managers, and residents — each with specific access.",
  },
  {
    icon: <BarChart size={32} className="text-brand-dark" />,
    title: "Analytics & Insights",
    desc: "Monitor building health, unit usage, and staff performance with visual reports.",
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Powerful Features to Run Your Building Smarter
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
