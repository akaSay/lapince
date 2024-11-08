import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/useLanguage";

interface ProfileFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
      budget: boolean;
    };
  }) => void;
  initialData?: {
    name: string;
    email: string;
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
      budget: boolean;
    };
  };
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { changeLanguage } = useLanguage();
  const [formData, setFormData] = React.useState(
    initialData || {
      name: "",
      email: "",
      language: "fr",
      currency: "EUR",
      notifications: {
        email: false,
        push: false,
        budget: false,
      },
    }
  );

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    const newCurrency = newLanguage === "en" ? "USD" : "EUR";

    // Mettre à jour uniquement le state local
    setFormData((prev) => ({
      ...prev,
      language: newLanguage,
      currency: newCurrency,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    // Changer la langue seulement après la validation du formulaire
    await changeLanguage(formData.language);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            {t("profile.form.name")}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            {t("profile.form.email")}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-300">
          {t("profile.notificationPreferences")}
        </h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.notifications.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notifications: {
                    ...formData.notifications,
                    email: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded form-checkbox focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-300">
              {t("profile.notifications.email")}
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.notifications.push}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notifications: {
                    ...formData.notifications,
                    push: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded form-checkbox focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-300">
              {t("profile.notifications.push")}
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.notifications.budget}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notifications: {
                    ...formData.notifications,
                    budget: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded form-checkbox focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-300">
              {t("profile.notifications.budget")}
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            {t("settings.language")}
          </label>
          <select
            value={formData.language}
            onChange={handleLanguageChange}
            className="w-full p-2 text-white bg-gray-700 rounded"
          >
            <option value="fr">{t("settings.languages.fr")}</option>
            <option value="en">{t("settings.languages.en")}</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            {t("settings.currency")}
          </label>
          <select
            value={formData.currency}
            disabled
            className="w-full p-2 text-white bg-gray-700 rounded opacity-60"
          >
            <option value="EUR">{t("settings.currencies.EUR")}</option>
            <option value="USD">{t("settings.currencies.USD")}</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-500"
        >
          {t("common.cancel")}
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
        >
          {t("common.save")}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
