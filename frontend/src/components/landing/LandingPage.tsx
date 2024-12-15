import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Ban,
  Bell,
  ChevronDown,
  Code2,
  Gift,
  Heart,
  LineChart,
  PiggyBank,
  Shield,
  Sparkles,
  Users,
  Wallet,
  Wifi,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import LogoPinceSmall from "../../assets/optimized/LogoPince-200.webp";
import LogoPinceMedium from "../../assets/optimized/LogoPince-400.webp";
import LogoPinceLarge from "../../assets/optimized/LogoPince-600.webp";
import { CookieConsent } from "../cookie/CookieConsent";
import { PrivacyPolicy } from "../legal/PrivacyPolicy";
import { TermsOfService } from "../legal/TermsOfService";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Modal } from "../ui/modal";
import { ScrollProgress } from "../ui/scroll-progress";
import { ScrollToTop } from "../ui/scroll-to-top";
import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "../ui/tooltip";
import { AnimatedNumber } from "./AnimatedNumbers";
import { DemoSection } from "./DemoSection";
import { FaqSection } from "./FaqSection";
import { Navbar } from "./Navbar";
import { TestimonialsSection } from "./TestimonialsSection";

export const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <TooltipProvider>
      <div
        ref={containerRef}
        className="relative min-h-screen overflow-hidden bg-[#1A1F2E]"
      >
        <a
          href="#main-content"
          className="p-4 text-white bg-blue-500 rounded-md sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
        >
          Aller au contenu principal
        </a>
        <ScrollProgress />
        <Navbar />

        {/* Background Elements */}
        <div className="fixed inset-0 -z-10">
          <motion.div
            style={{ opacity }}
            className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-background to-background"
          />
          <motion.div
            style={{ y }}
            className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"
          />
        </div>

        {/* Hero Section */}
        <section
          id="hero"
          className="container relative px-4 pt-32 pb-16 mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-center"
          >
            {/* Main Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="flex justify-center mb-4"
              >
                <picture>
                  <source
                    srcSet={`${LogoPinceSmall} 200w, ${LogoPinceMedium} 400w, ${LogoPinceLarge} 600w`}
                    sizes="(max-width: 768px) 200px, (max-width: 1024px) 400px, 600px"
                    type="image/webp"
                  />
                  <img
                    src={LogoPinceSmall}
                    alt="La Pince Logo"
                    loading="eager"
                    decoding="async"
                    width={200}
                    height={200}
                    className="object-contain w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
                  />
                </picture>
              </motion.div>
              <motion.h1
                className="text-5xl font-bold md:text-7xl lg:text-8xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                  LaPince
                </span>
                <br />
                <span className="text-2xl font-normal text-gray-400 md:text-3xl lg:text-4xl">
                  Gérez votre budget simplement
                </span>
              </motion.h1>

              <motion.p
                className="max-w-2xl mx-auto mt-8 text-xl text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Une application intuitive pour gérer vos finances personnelles
                avec précision et élégance.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-8 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <TooltipRoot>
                  <TooltipTrigger asChild>
                    <Button
                      size="lg"
                      className="relative px-8 h-14 min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white"
                      asChild
                      aria-label="Créer un compte"
                    >
                      <Link to="/register">
                        <span className="relative z-10">Commencer</span>
                        <motion.div
                          className="absolute inset-0 rounded-md bg-blue-500/20"
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <ArrowRight className="relative z-10 w-4 h-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Commencez votre gestion financière
                  </TooltipContent>
                </TooltipRoot>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-14 min-w-[200px] border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                    >
                      <span>Voir la démo</span>
                      <motion.div
                        className="ml-2"
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-[90vw]">
                    <div className="relative aspect-video">
                      <video
                        className="w-full rounded-lg"
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                      >
                        <source src="/Demo.mov" type="video/quicktime" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 gap-8 mt-24 md:grid-cols-3">
                {[
                  {
                    value: 1000,
                    suffix: "+",
                    label: "Utilisateurs actifs",
                    icon: Users,
                  },
                  {
                    value: 10000,
                    suffix: "€",
                    label: "Économies réalisées",
                    icon: Wallet,
                  },
                  {
                    value: 95,
                    suffix: "%",
                    label: "Clients satisfaits",
                    icon: Heart,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                      transition: { duration: 0.2 },
                    }}
                    className="relative p-6 overflow-hidden border rounded-xl bg-[#1E2536]/50 backdrop-blur-sm border-blue-500/20 group"
                  >
                    <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent group-hover:opacity-100" />
                    <div className="relative z-10">
                      <stat.icon className="w-8 h-8 mb-4 text-blue-400 opacity-75" />
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 * index }}
                        className="text-4xl font-bold text-blue-400"
                      >
                        <AnimatedNumber
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </motion.div>
                      <p className="mt-2 text-gray-400 group-hover:text-gray-300">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Trust Badges */}
        <div className="container px-4 mx-auto mt-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                label: "Données sécurisées",
                description: "Vos données sont chiffrées",
              },
              {
                icon: Gift,
                label: "100% Gratuit",
                description: "Aucun frais caché",
              },
              {
                icon: Ban,
                label: "Sans publicité",
                description: "Expérience sans interruption",
              },
              {
                icon: Code2,
                label: "Open Source",
                description: "Code source transparent",
              },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-1 group"
              >
                <div className="flex flex-col items-center p-4 text-center border rounded-xl border-blue-500/20 bg-[#1E2536]/50 backdrop-blur-sm w-full transition-all duration-200 group-hover:border-blue-500/40 group-hover:bg-[#1E2536]/70">
                  <div className="flex items-center justify-center w-10 h-10 mb-3 transition-colors duration-200 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20">
                    <badge.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="mb-1 font-medium text-white">{badge.label}</h3>
                  <p className="text-xs text-gray-400">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <section
          id="features"
          role="region"
          aria-labelledby="features-title"
          className="container px-4 py-32 mx-auto"
        >
          <h2 id="features-title" className="sr-only">
            Fonctionnalités
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-blue-500/5 blur-3xl" />
            <div className="relative grid gap-12 md:grid-cols-3">
              {[
                {
                  icon: PiggyBank,
                  title: "Suivi intelligent",
                  description:
                    "Catégorisation automatique et analyse en temps réel de vos dépenses",
                  gradient: "from-blue-500/20 to-blue-400/20",
                },
                {
                  icon: LineChart,
                  title: "Analyses avancées",
                  description:
                    "Visualisez vos tendances financières avec des graphiques interactifs",
                  gradient: "from-blue-500/20 to-blue-600/20",
                },
                {
                  icon: Bell,
                  title: "Alertes personnalisées",
                  description:
                    "Notifications intelligentes pour une meilleure gestion budgétaire",
                  gradient: "from-blue-400/20 to-blue-500/20",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.1}
                  className="relative p-8 overflow-hidden border group rounded-2xl bg-[#1E2536]/50 backdrop-blur-sm border-blue-500/20"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-blue-500/10"
                    >
                      <feature.icon className="w-8 h-8 text-blue-400" />
                    </motion.div>
                    <h3 className="mb-4 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 transition-colors group-hover:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="container px-4 py-16 mx-auto">
          <DemoSection />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="container px-4 py-16 mx-auto">
          <TestimonialsSection />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="container px-4 py-16 mx-auto">
          <FaqSection />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          role="region"
          aria-labelledby="contact-title"
          className="container px-4 py-24 mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-blue-500/5 blur-3xl" />
            <div className="relative">
              {/* Titre de section */}
              <div className="mb-12 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-white md:text-5xl"
                >
                  Contactez-nous
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-lg text-gray-400"
                >
                  Une question ? N'hésitez pas à nous contacter. Notre équipe
                  est là pour vous aider.
                </motion.p>
              </div>

              {/* Cartes de contact */}
              <div className="grid max-w-3xl gap-8 mx-auto md:grid-cols-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 text-center border rounded-xl bg-[#1E2536]/50 backdrop-blur-sm border-blue-500/20"
                >
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Support
                  </h3>
                  <p className="mb-4 text-gray-400">
                    Besoin d'aide avec l'application ?
                  </p>
                  <Button
                    variant="outline"
                    className="px-6 py-2 text-blue-400 hover:text-blue-300"
                    asChild
                  >
                    <a href="mailto:suppappbudget@gmail.com">
                      Nous contacter
                      <motion.span
                        className="ml-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ✉️
                      </motion.span>
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 text-center border rounded-xl bg-[#1E2536]/50 backdrop-blur-sm border-blue-500/20"
                >
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Commercial
                  </h3>
                  <p className="mb-4 text-gray-400">
                    Questions sur nos services ?
                  </p>
                  <Button
                    variant="outline"
                    className="px-6 py-2 text-blue-400 hover:text-blue-300"
                    asChild
                  >
                    <a href="mailto:suppappbudget@gmail.com">
                      Nous contacter
                      <motion.span
                        className="ml-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ✉️
                      </motion.span>
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section Fonctionnalités à venir - à ajouter avant la section CTA */}
        <section className="container px-4 py-24 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="mb-12 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-white md:text-5xl"
              >
                Prochainement
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-gray-400"
              >
                De nouvelles fonctionnalités pour améliorer votre expérience
              </motion.p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 border rounded-xl bg-[#1E2536]/50 backdrop-blur-sm border-blue-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10">
                      <Sparkles className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      Conseiller IA
                    </h3>
                    <p className="text-gray-400">
                      Bientôt, profitez de conseils personnalisés basés sur vos
                      habitudes de dépenses pour optimiser votre budget et
                      atteindre vos objectifs financiers plus rapidement.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 border rounded-xl bg-[#1E2536]/50 backdrop-blur-sm border-blue-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10">
                      <Wifi className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      Mode Hors Ligne
                    </h3>
                    <p className="text-gray-400">
                      Prochainement, accédez à vos données et gérez votre budget
                      même sans connexion internet. Synchronisation automatique
                      dès que vous êtes en ligne.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section - maintenant après la section contact */}
        <section className="container px-4 py-24 mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 overflow-hidden text-center rounded-3xl bg-[#1E2536]/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-blue-500/20 backdrop-blur-xl" />
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6 text-4xl font-bold text-white md:text-5xl"
              >
                Commencez à économiser
                <br />
                dès aujourd'hui
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl mx-auto mb-12 text-lg text-gray-400"
              >
                Rejoignez LaPince et découvrez comment une gestion financière
                intelligente peut transformer votre rapport à l'argent.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex justify-center space-x-4"
              >
                <Button
                  size="lg"
                  className="px-8 text-white bg-blue-600 h-14 hover:bg-blue-700"
                  asChild
                >
                  <Link to="/register">
                    Créer un compte gratuit
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container px-4 py-12 mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 pt-8 border-t md:flex-row border-blue-500/10">
            <div className="flex items-center space-x-2">
              <picture>
                <source
                  srcSet={`${LogoPinceSmall} 200w, ${LogoPinceMedium} 400w, ${LogoPinceLarge} 600w`}
                  sizes="(max-width: 768px) 200px, (max-width: 1024px) 400px, 600px"
                  type="image/webp"
                />
                <img
                  src={LogoPinceSmall}
                  alt="La Pince Logo"
                  loading="lazy"
                  decoding="async"
                  width={40}
                  height={40}
                  className="w-10 h-10 mt-2"
                />
              </picture>
              <span className="text-xl font-bold text-white">LaPince</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2024 LaPince. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="text-sm text-gray-400 hover:text-blue-400"
              >
                Politique de confidentialité
              </button>
              <button
                onClick={() => setIsTermsOpen(true)}
                className="text-sm text-gray-400 hover:text-blue-400"
              >
                Conditions d'utilisation
              </button>
            </div>
          </div>
        </footer>

        <ScrollToTop />

        <Modal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)}>
          <div className="max-h-[70vh] overflow-y-auto pr-2">
            <PrivacyPolicy />
          </div>
        </Modal>

        <Modal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)}>
          <div className="max-h-[70vh] overflow-y-auto pr-2">
            <TermsOfService />
          </div>
        </Modal>

        <CookieConsent onPrivacyClick={() => setIsPrivacyOpen(true)} />
      </div>
    </TooltipProvider>
  );
};
