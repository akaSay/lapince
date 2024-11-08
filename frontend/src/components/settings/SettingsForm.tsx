import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/useLanguage";

interface SettingsFormProps {
  settings: {
    theme: string;
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
      budget: boolean;
      weekly: boolean;
      monthly: boolean;
    };
    privacy: {
      showProfile: boolean;
      showStats: boolean;
      showBudget: boolean;
    };
    export: {
      format: string;
      frequency: string;
    };
  };
  onSubmit: (settings: SettingsFormProps["settings"]) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSubmit }) => {
  const { t } = useTranslation();
  const { changeLanguage, supportedLanguages } = useLanguage();

  const [formData, setFormData] = useState({
    ...settings,
    export: settings.export ?? {
      format: "csv",
      frequency: "monthly",
    },
  });

  const notifications = formData?.notifications ?? {
    email: false,
    push: false,
    budget: false,
    weekly: false,
    monthly: false,
  };

  const privacy = formData?.privacy ?? {
    showProfile: false,
    showStats: false,
    showBudget: false,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    changeLanguage(newLanguage);
    setFormData({
      ...formData,
      language: newLanguage,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="mb-4 text-lg font-medium text-white">
          {t("settings.generalPreferences")}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              {t("settings.theme")}
            </label>
            <select
              value={formData.theme}
              onChange={(e) =>
                setFormData({ ...formData, theme: e.target.value })
              }
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="dark">{t("settings.themes.dark")}</option>
              <option value="light">{t("settings.themes.light")}</option>
              <option value="system">{t("settings.themes.system")}</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              {t("settings.language")}
            </label>
            <select
              value={formData.language}
              onChange={handleLanguageChange}
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {t(`settings.languages.${lang}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              {t("settings.currency")}
            </label>
            <select
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value })
              }
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="mb-4 text-lg font-medium text-white">
          {t("settings.notifications")}
        </h3>
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notifications: {
                      ...notifications,
                      [key]: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded form-checkbox focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-300">
                {key === "email" && t("settings.notificationTypes.email")}
                {key === "push" && t("settings.notificationTypes.push")}
                {key === "budget" && t("settings.notificationTypes.budget")}
                {key === "weekly" && t("settings.notificationTypes.weekly")}
                {key === "monthly" && t("settings.notificationTypes.monthly")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="mb-4 text-lg font-medium text-white">
          {t("settings.privacy")}
        </h3>
        <div className="space-y-3">
          {Object.entries(privacy).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    privacy: {
                      ...privacy,
                      [key]: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded form-checkbox focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-300">
                {key === "showProfile" &&
                  t("settings.privacySettings.showProfile")}
                {key === "showStats" && t("settings.privacySettings.showStats")}
                {key === "showBudget" &&
                  t("settings.privacySettings.showBudget")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {t("settings.save")}
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
