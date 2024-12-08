import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const FaqSection = () => {
  const faqs = [
    {
      question: "Comment fonctionne LaPince ?",
      answer:
        "LaPince est une application de gestion de budget entièrement manuelle. Vous saisissez vos dépenses et revenus vous-même, ce qui vous permet de garder un contrôle total sur vos données financières. Aucune connexion bancaire n'est nécessaire.",
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer:
        "Absolument. Vos données sont stockées de manière sécurisée et ne sont accessibles que par vous. Nous n'avons pas accès à vos informations bancaires puisque tout est géré manuellement.",
    },
    {
      question: "L'application est-elle gratuite ?",
      answer:
        "Oui, LaPince est entièrement gratuite. Vous pouvez utiliser toutes les fonctionnalités sans frais cachés.",
    },
    {
      question: "Comment puis-je commencer ?",
      answer:
        "C'est simple ! Créez un compte gratuitement, puis commencez à saisir vos dépenses et revenus. Vous pouvez créer des catégories personnalisées et suivre votre budget en temps réel.",
    },
    {
      question: "Puis-je exporter mes données ?",
      answer:
        "Oui, vous pouvez exporter vos données financières à tout moment dans différents formats pour les analyser ou les sauvegarder.",
    },
    {
      question: "Pourquoi choisir une gestion manuelle ?",
      answer:
        "La gestion manuelle offre plusieurs avantages : une meilleure conscience de vos dépenses, aucun accès requis à vos comptes bancaires, et une plus grande flexibilité dans la catégorisation de vos transactions.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative max-w-3xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Questions Fréquentes
        </h2>
        <p className="text-gray-400">
          Tout ce que vous devez savoir sur LaPince
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <AccordionItem
              value={`item-${index}`}
              className="bg-[#1E2536]/50 backdrop-blur-sm border border-blue-500/20 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-6 hover:no-underline">
                <span className="text-white">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
};
