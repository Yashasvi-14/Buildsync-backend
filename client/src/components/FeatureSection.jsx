import React from "react";
import { Building, Users, Wrench, CreditCard } from "lucide-react";

const features = [
  {
    title: "Building Management",
    description:
      "Easily add and manage buildings, floors, and residential units all in one place.",
    icon: <Building className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Role-based Access",
    description:
      "Different panels and permissions for admins, managers, and residents.",
    icon: <Users className="w-8 h-8 text-green-600" />,
  },
  {
    title: "Maintenance Requests",
    description:
      "Residents can raise issues, and managers can update their status in real-time.",
    icon: <Wrench className="w-8 h-8 text-yellow-600" />,
  },
  {
    title: "Integrated Payments",
    description:
      "Accept maintenance dues and utility bills using secure Stripe integration.",
    icon: <CreditCard className="w-8 h-8 text-purple-600" />,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="w-full py-20 bg-gray-50 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Features</h2>
        <p className="text-gray-600 mt-4">
          Everything you need to manage buildings smartly and securely.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
