import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type CookieConsentProps = {
  onPrivacyClick: () => void;
};

export const CookieConsent = ({ onPrivacyClick }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà accepté les cookies
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const refuseCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#1A1F2E]/95 backdrop-blur-sm border-t border-blue-500/20"
        >
          <div className="container flex flex-col items-center gap-4 mx-auto md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-300">
                Nous utilisons des cookies pour améliorer votre expérience. En
                continuant à utiliser notre site, vous acceptez notre{" "}
                <button
                  onClick={onPrivacyClick}
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  politique de confidentialité
                </button>
                .
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={refuseCookies}
                className="text-gray-400 border-blue-500/20 hover:bg-blue-500/10"
              >
                Refuser
              </Button>
              <Button
                size="sm"
                onClick={acceptCookies}
                className="text-white bg-blue-600 hover:bg-blue-700"
              >
                Accepter
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
