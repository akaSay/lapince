import React from "react";
import SettingsForm from "../components/settings/SettingsForm";
import { useSettings } from "../hooks/useSettings";
import { SettingsData } from "../types/settings";

const Settings: React.FC = () => {
  const { settings, loading, error, updateSettings } = useSettings();

  const handleSettingsSubmit = async (newSettings: SettingsData) => {
    try {
      const defaultExport = {
        format: "csv",
        frequency: "monthly",
      };

      const cleanedSettings = {
        theme: newSettings.theme,
        language: newSettings.language,
        currency: newSettings.currency,
        notifications: {
          email: newSettings.notifications?.email ?? false,
          push: newSettings.notifications?.push ?? false,
          budget: newSettings.notifications?.budget ?? false,
          weekly: newSettings.notifications?.weekly ?? false,
          monthly: newSettings.notifications?.monthly ?? false,
        },
        privacy: {
          showProfile: newSettings.privacy?.showProfile ?? false,
          showStats: newSettings.privacy?.showStats ?? false,
          showBudget: newSettings.privacy?.showBudget ?? false,
        },
        export: newSettings.export ?? defaultExport,
      };

      await updateSettings(cleanedSettings);
      // TODO: Ajouter une notification de succès
    } catch (err) {
      console.error("Erreur lors de la mise à jour des paramètres:", err);
      // TODO: Ajouter une notification d'erreur
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <span className="text-white">Chargement...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-100 rounded-lg">
        Une erreur est survenue lors du chargement des paramètres
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-4 text-yellow-500 bg-yellow-100 rounded-lg">
        Aucun paramètre trouvé
      </div>
    );
  }

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
