import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookieConsent } from "../../hooks/useCookieConsent";

// Remplacer par votre ID de mesure GA
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GoogleAnalytics = () => {
  const location = useLocation();
  const { isAnalyticsAllowed } = useCookieConsent();

  useEffect(() => {
    // Charger le script GA seulement si l'utilisateur a accepté
    if (isAnalyticsAllowed) {
      // Script Google Analytics
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Configuration GA
      window.gtag = function () {
        // @ts-ignore
        window.dataLayer = window.dataLayer || [];
        // @ts-ignore
        window.dataLayer.push(arguments);
      };

      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, {
        cookie_flags: "SameSite=None;Secure",
      });
    }

    return () => {
      // Nettoyer le script si l'utilisateur révoque son consentement
      if (!isAnalyticsAllowed) {
        const scripts = document.querySelectorAll(
          `script[src*="googletagmanager"]`
        );
        scripts.forEach((script) => script.remove());
      }
    };
  }, [isAnalyticsAllowed]);

  // Suivre les changements de page
  useEffect(() => {
    if (isAnalyticsAllowed) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, isAnalyticsAllowed]);

  return null;
};
