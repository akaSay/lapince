// Créons un fichier utilitaire pour la gestion des dates
export const isDateInRange = (date: Date | string, range?: string): boolean => {
  if (!range) return true;

  const targetDate = new Date(date);
  const today = new Date();

  // Pour les filtres de mois spécifiques (format: month-YYYY-MM)
  if (range.startsWith("month-")) {
    const [, year, month] = range.split("-");
    return (
      targetDate.getFullYear() === parseInt(year) &&
      targetDate.getMonth() === parseInt(month) - 1
    );
  }

  // Pour les autres périodes
  switch (range) {
    case "3-months": {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      return targetDate >= threeMonthsAgo && targetDate <= today;
    }
    case "year": {
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear(), 11, 31);
      return targetDate >= startOfYear && targetDate <= endOfYear;
    }
    default:
      return true;
  }
};
