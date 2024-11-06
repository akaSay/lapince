import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  fr: {
    translation: {
      settings: {
        title: "Paramètres",
        generalPreferences: "Préférences générales",
        theme: "Thème",
        themes: {
          dark: "Sombre",
          light: "Clair",
          system: "Système",
        },
        language: "Langue",
        languages: {
          fr: "Français",
          en: "English",
        },
        currency: "Devise",
        currencies: {
          EUR: "Euro (€)",
          USD: "Dollar ($)",
          GBP: "Livre (£)",
        },
        notifications: "Notifications",
        notificationTypes: {
          email: "Notifications par email",
          push: "Notifications push",
          budget: "Alertes de dépassement de budget",
          weekly: "Résumé hebdomadaire",
          monthly: "Rapport mensuel",
        },
        privacy: "Paramètres de confidentialité",
        privacySettings: {
          showProfile: "Afficher mon profil",
          showStats: "Afficher mes statistiques",
          showBudget: "Afficher mon budget",
        },
        exportData: "Exporter les données",
        exportTransactions: "Exporter les transactions",
        exportBudgets: "Exporter les budgets",
        accountManagement: "Gestion du compte",
        deleteAccount: "Supprimer mon compte",
        save: "Enregistrer les modifications",
      },
    },
  },
  en: {
    translation: {
      settings: {
        title: "Settings",
        generalPreferences: "General Preferences",
        theme: "Theme",
        themes: {
          dark: "Dark",
          light: "Light",
          system: "System",
        },
        language: "Language",
        languages: {
          fr: "French",
          en: "English",
        },
        currency: "Currency",
        currencies: {
          EUR: "Euro (€)",
          USD: "Dollar ($)",
          GBP: "Pound (£)",
        },
        notifications: "Notifications",
        notificationTypes: {
          email: "Email notifications",
          push: "Push notifications",
          budget: "Budget alerts",
          weekly: "Weekly summary",
          monthly: "Monthly report",
        },
        privacy: "Privacy Settings",
        privacySettings: {
          showProfile: "Show my profile",
          showStats: "Show my statistics",
          showBudget: "Show my budget",
        },
        exportData: "Export Data",
        exportTransactions: "Export Transactions",
        exportBudgets: "Export Budgets",
        accountManagement: "Account Management",
        deleteAccount: "Delete my account",
        save: "Save changes",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
