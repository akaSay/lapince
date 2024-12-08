import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marie L.",
    role: "Freelance",
    comment: "LaPince m'a permis de mieux gérer mes revenus variables.",
    rating: 5,
  },
  {
    name: "Thomas D.",
    role: "Entrepreneur",
    comment: "Une interface claire et des fonctionnalités puissantes.",
    rating: 5,
  },
  {
    name: "Sophie M.",
    role: "Étudiante",
    comment: "Parfait pour suivre mon budget étudiant !",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-center text-white"
        >
          Ce que disent nos utilisateurs
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-6 transition-transform border rounded-xl bg-[#1E2536]/50 border-blue-500/20 hover:scale-105"
            >
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="mb-4 text-gray-300">{testimonial.comment}</p>
              <div>
                <p className="font-medium text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
