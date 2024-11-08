import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/useLanguage";
import { SettingsData } from "../../types/settings";

interface SettingsFormProps {
  settings: SettingsData;
  onSubmit: (data: SettingsData) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSubmit }) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = e.target.value;
    const newCurrency = newLanguage === "en" ? "USD" : "EUR";

    // Mettre à jour les paramètres avec la nouvelle langue et devise
    await onSubmit({
      ...settings,
      language: newLanguage,
      currency: newCurrency,
    });

    // Changer la langue dans i18n
    await changeLanguage(newLanguage);
  };

  // Synchroniser la devise avec la langue au chargement
  useEffect(() => {
    if (settings.language !== currentLanguage) {
      const newCurrency = currentLanguage === "en" ? "USD" : "EUR";
      if (settings.currency !== newCurrency) {
        onSubmit({
          ...settings,
          currency: newCurrency,
        });
      }
    }
  }, [currentLanguage]);

  return (
    <form className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <div className="space-y-4">
        {/* Select Langue */}
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            {t("settings.language")}
          </label>
          <select
            value={settings.language}
            onChange={handleLanguageChange}
            className="w-full p-2 text-white bg-gray-700 rounded-lg"
          >
            <option value="fr">{t("settings.languages.fr")}</option>
            <option value="en">{t("settings.languages.en")}</option>
          </select>
        </div>

        {/* Select Devise (désactivé car synchronisé avec la langue) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            {t("settings.currency")}
          </label>
          <select
            value={settings.currency}
            disabled
            className="w-full p-2 text-white bg-gray-700 rounded-lg opacity-60"
          >
            <option value="EUR">{t("settings.currencies.EUR")}</option>
            <option value="USD">{t("settings.currencies.USD")}</option>
          </select>
        </div>

        {/* Autres champs du formulaire... */}
      </div>
    </form>
  );
};

export default SettingsForm;
