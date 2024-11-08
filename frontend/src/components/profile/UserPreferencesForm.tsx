import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../types/User";

interface UserPreferencesFormProps {
  user: User;
  onSubmit: (preferences: User["preferences"]) => void;
}

const UserPreferencesForm: React.FC<UserPreferencesFormProps> = ({
  user,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState(user.preferences);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("settings.currency")}
        </label>
        <select
          value={preferences.currency}
          onChange={(e) =>
            setPreferences({ ...preferences, currency: e.target.value })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="EUR">{t("settings.currencies.EUR")}</option>
          <option value="USD">{t("settings.currencies.USD")}</option>
          <option value="GBP">{t("settings.currencies.GBP")}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("settings.language")}
        </label>
        <select
          value={preferences.language}
          onChange={(e) =>
            setPreferences({ ...preferences, language: e.target.value })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="fr">{t("settings.languages.fr")}</option>
          <option value="en">{t("settings.languages.en")}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("settings.theme")}
        </label>
        <select
          value={preferences.theme}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              theme: e.target.value as "light" | "dark",
            })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="light">{t("settings.themes.light")}</option>
          <option value="dark">{t("settings.themes.dark")}</option>
        </select>
      </div>

      <button
        type="submit"
        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {t("settings.save")}
      </button>
    </form>
  );
};

export default UserPreferencesForm;
