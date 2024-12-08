import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoPince from "../../assets/LogoPince.png";
import { useActiveSection } from "../../hooks/useActiveSection";
import { Button } from "../ui/button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  const navLinks = [
    { href: "#features", label: "Fonctionnalités" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (href: string) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      setIsMenuOpen(false);

      setTimeout(() => {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b bg-[#1A1F2E]/80 backdrop-blur-md border-blue-500/10"
    >
      <div className="container flex items-center justify-between h-20 px-4 mx-auto">
        <button
          onClick={scrollToTop}
          className="flex items-center flex-1 transition-opacity hover:opacity-80"
        >
          <div className="flex items-center h-full gap-3">
            <div className="flex items-center justify-center w-12 h-12">
              <img
                src={LogoPince}
                alt="La Pince Logo"
                className="object-contain w-full h-full mt-3"
              />
            </div>
            <span className="text-2xl font-bold text-white">LaPince</span>
          </div>
        </button>

        {/* Menu Desktop */}
        <div className="items-center hidden space-x-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollToSection(href)}
              className={`transition-colors ${
                activeSection === href.slice(1)
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-blue-400"
              }`}
            >
              {label}
            </button>
          ))}
          <Button
            variant="outline"
            className="px-6 py-2 text-blue-400 border-blue-500/20 hover:bg-blue-500/10"
            asChild
          >
            <Link to="/login">Connexion</Link>
          </Button>
          <Button
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700"
            asChild
          >
            <Link to="/register">Inscription</Link>
          </Button>
        </div>

        {/* Menu Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-gray-300 md:hidden hover:text-blue-400"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        className="absolute left-0 right-0 overflow-hidden border-b md:hidden bg-[#1A1F2E]/95 border-blue-500/10"
      >
        <div className="container px-4 py-4 mx-auto space-y-4">
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollToSection(href)}
              className={`block w-full text-left py-2 transition-colors ${
                activeSection === href.slice(1)
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-blue-400"
              }`}
            >
              {label}
            </button>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-blue-500/10">
            <Button
              variant="outline"
              className="w-full px-6 py-2 text-blue-400 border-blue-500/20 hover:bg-blue-500/10"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/login">Connexion</Link>
            </Button>
            <Button
              className="w-full px-6 py-2 text-white bg-blue-600 hover:bg-blue-700"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/register">Inscription</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};
