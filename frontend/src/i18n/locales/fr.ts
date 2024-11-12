export default {
  common: {
    loading: "Chargement...",
    error: "Une erreur est survenue",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    noData: "Aucune donnée disponible",
    viewAll: "Voir tout",
    email: "Adresse email",
    password: "Mot de passe",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer le mot de passe",
  },
  dashboard: {
    title: "Tableau de bord",
    newTransaction: "Nouvelle transaction",
    noData: "Aucune donnée disponible pour la période sélectionnée",
    filters: {
      period: "Période",
      allPeriods: "Toutes les périodes",
      thisMonth: "Ce mois",
      lastMonth: "Mois dernier",
      threeMonths: "3 derniers mois",
      thisYear: "Cette année",
      status: "Statut",
      allStatus: "Tous les statuts",
      upToDate: "À jour",
      warning: "Attention",
      exceeded: "Dépassement",
      category: "Catégorie",
      allCategories: "Toutes les catégories",
      food: "Alimentation",
      transport: "Transport",
      housing: "Logement",
      leisure: "Loisirs",
    },
    statistics: {
      monthlyExpenses: "Dépenses mensuelles",
      previousMonth: "Mois précédent",
      trend: "Tendance",
      currentBalance: "Solde actuel",
      totalIncome: "Revenus totaux",
      totalExpenses: "Dépenses totales",
      expensesByCategory: "Dépenses par catégorie",
    },
    quickActions: {
      addTransaction: "Ajouter une transaction",
      viewBudget: "Voir le budget",
      viewReports: "Voir les rapports",
    },
    recentTransactions: "Transactions récentes",
  },
  transactions: {
    title: "Transactions",
    new: "Nouvelle transaction",
    edit: "Modifier la transaction",
    delete: "Supprimer la transaction",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer cette transaction ?",
    form: {
      date: "Date",
      description: "Description",
      amount: "Montant",
      category: "Catégorie",
      type: "Type",
      income: "Revenu",
      expense: "Dépense",
      save: "Enregistrer",
      cancel: "Annuler",
    },
    filters: {
      search: "Rechercher une transaction",
      dateRange: "Période",
      category: "Catégorie",
      type: "Type",
      all: "Toutes",
      income: "Revenus",
      expense: "Dépenses",
    },
    noTransactions: "Aucune transaction trouvée",
    statistics: {
      monthlyExpenses: "Dépenses du mois",
      totalIncome: "Total des revenus",
      balance: "Solde",
    },
  },
  budget: {
    title: "Budget",
    new: "Nouveau budget",
    add: "Ajouter un budget",
    edit: "Modifier le budget",
    delete: "Supprimer le budget",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer ce budget ?",
    form: {
      category: "Catégorie",
      limit: "Limite mensuelle",
      currency: "Devise",
      save: "Enregistrer",
      cancel: "Annuler",
      icons: {
        account_balance: "💰 Budget",
        restaurant: "🍽️ Restaurant",
        shopping_cart: "🛒 Courses",
        directions_car: "🚗 Transport",
        home: "🏠 Logement",
        sports_esports: "🎮 Loisirs",
        medical_services: "🏥 Santé",
        school: "📚 Education",
      },
    },
    status: {
      upToDate: "À jour",
      warning: "Attention",
      exceeded: "Dépassement",
    },
    statistics: {
      spent: "Dépensé",
      remaining: "Restant",
      limit: "Limite",
    },
    noBudgets: "Aucun budget trouvé",
  },
  reports: {
    title: "Rapports",
    currentExpenses: "Dépenses actuelles",
    previousMonth: "Mois précédent",
    monthlyVariation: "Variation mensuelle",
    filters: {
      period: "Période",
      category: "Catégorie",
      type: "Type",
    },
    charts: {
      expenses: "Répartition des dépenses",
      income: "Sources de revenus",
      trend: "Tendance",
      comparison: "Comparaison",
    },
    expenseChart: {
      title: "Graphique des dépenses",
      weekly: "Hebdomadaire",
      monthly: "Mensuel",
      yearly: "Annuel",
      graph: "Graphique des dépenses (à implémenter)",
      totalExpenses: "Total des dépenses",
    },
  },
  settings: {
    title: "Paramètres",
    save: "Enregistrer",
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
      en: "Anglais",
    },
    currency: "Devise",
    currencies: {
      EUR: "Euro (€)",
      USD: "Dollar ($)",
      GBP: "Livre Sterling (£)",
    },
    notifications: "Notifications",
    notificationTypes: {
      push: "Notifications push",
      email: "Notifications par email",
      budget: "Alertes de budget",
      weekly: "Résumé hebdomadaire",
      monthly: "Résumé mensuel",
    },
    privacy: "Confidentialité",
    privacySettings: {
      showStats: "Afficher les statistiques",
      showProfile: "Profil public",
      showBudget: "Budget public",
    },
    exportData: "Exporter les données",
    exportTransactions: "Exporter les transactions",
    exportBudgets: "Exporter les budgets",
    accountManagement: "Gestion du compte",
    deleteAccount: "Supprimer mon compte",
  },
  layout: {
    search: {
      placeholder: "Rechercher...",
      noResults: "Aucun résultat trouvé",
      transactions: "Transactions",
      budgets: "Budgets",
      moreTransactions: "autres transactions",
      moreBudgets: "autres budgets",
    },
    profile: {
      loading: "Chargement...",
      myProfile: "Mon profil",
      settings: "Paramètres",
      logout: "Déconnexion",
      premium: "Premium",
    },
    sidebar: {
      appName: "BudgetApp",
      dashboard: "Tableau de bord",
      transactions: "Transactions",
      budget: "Budget",
      reports: "Rapports",
      profile: "Profil",
      version: "Version 1.0.0",
    },
  },
  report: {
    title: "Rapports",
    noData: "Aucune donnée disponible pour la période sélectionnée",
    monthlyExpenses: "Dépenses mensuelles",
    charts: {
      trend: "Tendance des dépenses",
      expenses: "Répartition des dépenses",
    },
  },
  profile: {
    title: "Profil",
    editProfile: "Modifier le profil",
    notificationPreferences: "Préférences de notification",
    budgetAlert: "Alertes de budget",
    linkedAccounts: "Comptes liés",
    mainBankAccount: "Compte bancaire principal",
    configure: "Configurer",
    form: {
      name: "Nom complet",
      email: "Adresse email",
      language: "Langue",
      currency: "Devise",
      save: "Enregistrer",
      cancel: "Annuler",
    },
    stats: {
      profileCompletion: "Profil complété",
      memberSince: "Membre depuis",
      totalTransactions: "Transactions totales",
      activeBudgets: "Budgets actifs",
    },
    notifications: {
      title: "Notifications",
      email: "Notifications par email",
      push: "Notifications push",
      budget: "Alertes de budget",
    },
    linkedAccount: {
      title: "Comptes liés",
      mainBank: "Compte bancaire principal",
      configure: "Configurer",
    },
  },
  notifications: {
    title: "Notifications",
    markAllAsRead: "Tout marquer comme lu",
    markAsRead: "Marquer comme lu",
    markAsUnread: "Marquer comme non lu",
    read: "Lu",
    unread: "Non lu",
    empty: "Aucune notification",
    new: "Nouvelle notification",
    types: {
      transaction: "Transaction",
      budget: "Budget",
      alert: "Alerte",
      system: "Système",
    },
    status: {
      success: "Succès",
      warning: "Avertissement",
      error: "Erreur",
      info: "Information",
    },
    messages: {
      budgetExceeded: "Budget {{category}} dépassé",
      budgetWarning: "Budget {{category}} presque atteint",
      newTransaction: "Nouvelle transaction ajoutée",
      transactionUpdated: "Transaction mise à jour",
      transactionDeleted: "Transaction supprimée",
      largeTransaction: "Transaction importante détectée",
      largeTransactionDetail:
        "Une dépense importante de {{amount}}€ a été enregistrée",
      recurringExpense: "Dépense récurrente détectée",
      recurringExpenseDetail:
        'Vous avez effectué plusieurs paiements similaires pour "{{description}}"',
      monthlySavings: "Félicitations !",
      monthlySavingsDetail: "Vous avez économisé {{amount}}€ ce mois-ci !",
    },
  },
  errors: {
    budget: {
      create:
        "Impossible de créer le budget. Veuillez vérifier les informations saisies.",
      update: "La mise à jour du budget a échoué. Veuillez réessayer.",
      delete: "La suppression du budget n'a pas pu être effectuée.",
      fetch: "Impossible de charger les budgets. Vérifiez votre connexion.",
    },
    transaction: {
      create:
        "La création de la transaction a échoué. Vérifiez les données saisies.",
      update: "Impossible de mettre à jour la transaction. Veuillez réessayer.",
      delete: "La suppression de la transaction n'a pas pu être effectuée.",
    },
    settings: {
      update: "La mise à jour des paramètres a échoué. Veuillez réessayer.",
    },
    default:
      "Une erreur inattendue est survenue. Veuillez réessayer ultérieurement.",
    network:
      "La connexion au serveur a échoué. Vérifiez votre connexion internet.",
    validation: {
      required: "Ce champ est obligatoire",
      invalidFormat: "Format invalide",
      minLength: "Doit contenir au moins {{min}} caractères",
      maxLength: "Ne doit pas dépasser {{max}} caractères",
      invalidEmail: "Adresse email invalide",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      passwordStrength:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre",
    },
    resetPassword: "Erreur lors de la réinitialisation du mot de passe",
    passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
    invalidResetToken: "Le lien de réinitialisation est invalide ou a expiré",
    emailNotFound: "Aucun compte n'est associé à cette adresse email",
  },
  success: {
    budget: {
      create: "Budget créé avec succès",
      update: "Budget mis à jour avec succès",
      delete: "Budget supprimé avec succès",
    },
    transaction: {
      create: "Transaction créée avec succès",
      update: "Transaction mise à jour avec succès",
      delete: "Transaction supprimée avec succès",
    },
    settings: {
      update: "Paramètres mis à jour avec succès",
    },
    export: {
      transactions: "Transactions exportées avec succès",
      budgets: "Budgets exportés avec succès",
    },
    passwordReset: "Votre mot de passe a été réinitialisé avec succès",
    resetLinkSent: "Un email de réinitialisation a été envoyé",
  },
  auth: {
    forgotPassword: "Mot de passe oublié",
    resetPassword: "Réinitialiser le mot de passe",
    sendResetLink: "Envoyer le lien de réinitialisation",
    resetEmailSent:
      "Un email a été envoyé avec les instructions pour réinitialiser votre mot de passe",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    backToLogin: "Retour à la connexion",
    resetSuccess: "Votre mot de passe a été réinitialisé avec succès",
  },
};
