import { UserPlus, Building2, Users, LineChart } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="h-8 w-8 text-primary" />,
    title: "Create an Account",
    description: "Sign up as an admin, manager, or resident to get started.",
  },
  {
    icon: <Building2 className="h-8 w-8 text-primary" />,
    title: "Add Buildings & Units",
    description: "Managers add buildings, floors, and assign units to residents.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Manage Residents",
    description: "Approve, manage, and track all residents and service staff efficiently.",
  },
  {
    icon: <LineChart className="h-8 w-8 text-primary" />,
    title: "Monitor Everything",
    description: "Real-time dashboards with secure access for all roles.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">How BuildSync Works</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          BuildSync makes building and resident management seamless, secure, and smart.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
