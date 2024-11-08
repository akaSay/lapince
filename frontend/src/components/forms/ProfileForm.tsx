import React, { useState } from "react";
import { useTranslation } from "react-i18next";
interface ProfileFormProps {
  onSubmit: (profileData: {
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
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    language: initialData?.language || "fr",
    currency: initialData?.currency || "EUR",
    notifications: {
      email: initialData?.notifications?.email ?? true,
      push: initialData?.notifications?.push ?? true,
      budget: initialData?.notifications?.budget ?? true,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              {t("profile.form.language")}
            </label>
            <select
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              {t("profile.form.currency")}
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

      <div className="flex justify-end pt-4 space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-300 transition-colors hover:text-white"
        >
          {t("profile.form.cancel")}
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {t("profile.form.save")}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
