import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { notificationService } from "../services/notificationService";
import { exportService } from "../services/exportService";
import SettingsForm from "../components/settings/SettingsForm";
import { useSettings } from "../hooks/useSettings";
import { SettingsData } from "../types/settings";

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { settings, loading, error, updateSettings } = useSettings();

  const handleSettingsSubmit = async (newSettings: SettingsData) => {
    try {
      // Valeurs par défaut pour les objets
      const defaultNotifications = {
        email: false,
        push: false,
        budget: false,
        weekly: false,
        monthly: false,
      };

      const defaultPrivacy = {
        showProfile: false,
        showStats: false,
        showBudget: false,
      };

      const defaultExport = {
        format: "csv",
        frequency: "monthly",
      };

      // Nettoyer les données avant l'envoi avec des valeurs par défaut
      const cleanedSettings = {
        theme: newSettings.theme || "dark",
        language: newSettings.language || "fr",
        currency: newSettings.currency || "EUR",
        notifications: {
          ...defaultNotifications,
          ...(newSettings.notifications || {}),
        },
        privacy: {
          ...defaultPrivacy,
          ...(newSettings.privacy || {}),
        },
        export: {
          ...defaultExport,
          ...(newSettings.export || {}),
        },
      };

      await updateSettings(cleanedSettings);

      // Appliquer les changements de thème seulement si nécessaire
      if (newSettings.theme !== theme) {
        toggleTheme();
      }

      // Configurer les notifications si elles sont activées
      if (cleanedSettings.notifications.push) {
        await notificationService.subscribeToNotifications();
      }

      // TODO: Ajouter une notification de succès
    } catch (err) {
      console.error("Erreur lors de la mise à jour des paramètres:", err);
      // TODO: Ajouter une notification d'erreur
    }
  };

  const handleExportTransactions = async () => {
    try {
      await exportService.exportTransactions(settings?.export.format || "csv");
    } catch (error) {
      console.error("Erreur lors de l'exportation des transactions:", error);
    }
  };

  const handleExportBudgets = async () => {
    try {
      await exportService.exportBudgets(settings?.export.format || "csv");
    } catch (error) {
      console.error("Erreur lors de l'exportation des budgets:", error);
    }
  };

  // Ajout d'une classe conditionnelle basée sur le thème
  const themeClass = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

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
    <div className={`space-y-6 ${themeClass}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Paramètres</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SettingsForm settings={settings} onSubmit={handleSettingsSubmit} />

        <div className="space-y-6">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-white">
              {t("settings.exportData")}
            </h3>
            <div className="space-y-4">
              <button
                onClick={handleExportTransactions}
                className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {t("settings.exportTransactions")}
              </button>
              <button
                onClick={handleExportBudgets}
                className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {t("settings.exportBudgets")}
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
