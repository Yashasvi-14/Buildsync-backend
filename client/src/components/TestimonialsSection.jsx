import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "BuildSync has completely streamlined our building management. It’s efficient and easy to use.",
    name: "Rahul Mehra",
    role: "Manager, Lotus Towers",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "Paying rent and raising complaints is now hassle-free. I love how smooth the resident experience is.",
    name: "Anjali Verma",
    role: "Resident, Skyview Residency",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "Assigning staff and tracking issues became so efficient after switching to BuildSync.",
    name: "Karan Singh",
    role: "Admin, Maple Heights",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Trusted by Building Communities</h2>
        <p className="mb-12 text-gray-600">Here’s what our users have to say about BuildSync.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md text-left">
              <p className="text-gray-700 mb-4 italic">“{t.quote}”</p>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={t.image} alt={t.name} />
                  <AvatarFallback>{t.name.split(" ")[0][0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
