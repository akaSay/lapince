import React, { useState } from "react";
import SettingsForm from "../components/settings/SettingsForm";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    theme: "dark",
    language: "fr",
    currency: "EUR",
    notifications: {
      email: true,
      push: true,
      budget: true,
      weekly: false,
      monthly: true,
    },
    privacy: {
      showProfile: true,
      showStats: true,
      showBudget: false,
    },
    export: {
      format: "csv",
      frequency: "monthly",
    },
  });

  const handleSettingsSubmit = (newSettings: typeof settings) => {
    console.log("Paramètres mis à jour:", newSettings);
    setSettings(newSettings);
    // Implémentez la logique de sauvegarde ici
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Paramètres</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SettingsForm settings={settings} onSubmit={handleSettingsSubmit} />

        <div className="space-y-6">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-white">
              Exportation des données
            </h3>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                Exporter les transactions
              </button>
              <button className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                Exporter les budgets
              </button>
            </div>
          </div>

          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-white">
              Gestion du compte
            </h3>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700">
                Supprimer mon compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
