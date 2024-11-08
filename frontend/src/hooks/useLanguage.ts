import { useTranslation } from "react-i18next";
import api from "../lib/api";

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (language: string) => {
    try {
      console.log("Changing language to:", language); // Debug

      // Changer la langue dans i18n
      await i18n.changeLanguage(language);

      // Déterminer la devise
      const currency = language === "en" ? "USD" : "EUR";

      // Sauvegarder les préférences
      localStorage.setItem("preferredLanguage", language);
      localStorage.setItem("currency", currency);

      // Mettre à jour les paramètres utilisateur
      await api.patch("/settings", {
        language,
        currency,
      });

      console.log("Language changed successfully"); // Debug
    } catch (error) {
      console.error("Erreur lors du changement de langue:", error);
    }
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    supportedLanguages: ["fr", "en"] as const,
  };
};
