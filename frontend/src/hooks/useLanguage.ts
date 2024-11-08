import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("preferredLanguage", language);
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    supportedLanguages: ["fr", "en"] as const,
  };
};
