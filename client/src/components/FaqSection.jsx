import { useState } from "react";

const faqs = [
  {
    question: "What is BuildSync?",
    answer:
      "BuildSync is a smart building management system designed to streamline operations for admins, managers, and residents.",
  },
  {
    question: "Who can use BuildSync?",
    answer:
      "BuildSync is designed for building admins, floor managers, and residents to manage operations, complaints, billing, and communication.",
  },
  {
    question: "Is my data secure on BuildSync?",
    answer:
      "Absolutely. We use secure authentication and encrypted communication to protect your data.",
  },
  {
    question: "Can I use BuildSync on mobile?",
    answer:
      "Yes, BuildSync is mobile-responsive and works well on all devices.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section  className="py-20 bg-gray-100" id="faq">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left text-lg font-medium"
              >
                {faq.question}
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
