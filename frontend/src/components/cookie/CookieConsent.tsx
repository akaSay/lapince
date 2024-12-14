import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CookieSettings } from "../../hooks/useCookieConsent";

type CookieConsentProps = {
  onPrivacyClick: () => void;
};

export const CookieConsent = ({ onPrivacyClick }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookieConsent");
    if (!savedConsent) {
      setIsVisible(true);
    } else {
      setCookieSettings(JSON.parse(savedConsent));
    }
  }, []);

  const saveCookieSettings = (settings: CookieSettings) => {
    localStorage.setItem("cookieConsent", JSON.stringify(settings));
    window.dispatchEvent(
      new CustomEvent("cookieConsentUpdate", { detail: settings })
    );
    setIsVisible(false);
  };

  const acceptAllCookies = () => {
    const allAccepted: CookieSettings = {
      necessary: true,
      analytics: true,
      preferences: true,
    };
    saveCookieSettings(allAccepted);
  };

  const saveCustomSettings = () => {
    saveCookieSettings(cookieSettings);
  };

  const refuseCookies = () => {
    const onlyNecessary: CookieSettings = {
      necessary: true,
      analytics: false,
      preferences: false,
    };
    saveCookieSettings(onlyNecessary);
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
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
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
              <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="px-6 py-2 text-gray-400 border-blue-500/20 hover:bg-blue-500/10"
                >
                  Personnaliser
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refuseCookies}
                  className="px-6 py-2 text-gray-400 border-blue-500/20 hover:bg-blue-500/10"
                >
                  Refuser
                </Button>
                <Button
                  size="sm"
                  onClick={acceptAllCookies}
                  className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700"
                >
                  Accepter tout
                </Button>
              </div>
            </div>

            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 overflow-hidden border-t border-blue-500/20"
              >
                <div className="pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        Cookies nécessaires
                      </h3>
                      <p className="text-xs text-gray-400">
                        Requis pour le fonctionnement du site
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookieSettings.necessary}
                      disabled
                      className="text-blue-500 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        Cookies analytiques
                      </h3>
                      <p className="text-xs text-gray-400">
                        Nous aident à améliorer le site
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookieSettings.analytics}
                      onChange={(e) =>
                        setCookieSettings({
                          ...cookieSettings,
                          analytics: e.target.checked,
                        })
                      }
                      className="text-blue-500 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        Cookies de préférences
                      </h3>
                      <p className="text-xs text-gray-400">
                        Permettent de sauvegarder vos préférences
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookieSettings.preferences}
                      onChange={(e) =>
                        setCookieSettings({
                          ...cookieSettings,
                          preferences: e.target.checked,
                        })
                      }
                      className="text-blue-500 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      size="sm"
                      onClick={saveCustomSettings}
                      className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Enregistrer les préférences
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
