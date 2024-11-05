import React, { useState } from "react";

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
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          Préférences générales
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Thème
            </label>
            <select
              value={formData.theme}
              onChange={(e) =>
                setFormData({ ...formData, theme: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="dark">Sombre</option>
              <option value="light">Clair</option>
              <option value="system">Système</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Langue
            </label>
            <select
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Devise
            </label>
            <select
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Notifications</h3>
        <div className="space-y-3">
          {Object.entries(formData.notifications).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notifications: {
                      ...formData.notifications,
                      [key]: e.target.checked,
                    },
                  })
                }
                className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-300">
                {key === "email" && "Notifications par email"}
                {key === "push" && "Notifications push"}
                {key === "budget" && "Alertes de dépassement de budget"}
                {key === "weekly" && "Résumé hebdomadaire"}
                {key === "monthly" && "Rapport mensuel"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          Paramètres de confidentialité
        </h3>
        <div className="space-y-3">
          {Object.entries(formData.privacy).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    privacy: {
                      ...formData.privacy,
                      [key]: e.target.checked,
                    },
                  })
                }
                className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-300">
                {key === "showProfile" && "Afficher mon profil"}
                {key === "showStats" && "Afficher mes statistiques"}
                {key === "showBudget" && "Afficher mon budget"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enregistrer les modifications
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
