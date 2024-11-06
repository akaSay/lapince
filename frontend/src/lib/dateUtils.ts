// Créons un fichier utilitaire pour la gestion des dates
export const isDateInRange = (date: Date | string, dateRange?: string) => {
  const checkDate = new Date(date);
  const today = new Date();

  if (!dateRange) return true;

  switch (dateRange) {
    case "this-month": {
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      return checkDate >= firstDayOfMonth && checkDate <= today;
    }
    case "last-month": {
      const firstDayLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const lastDayLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );
      return checkDate >= firstDayLastMonth && checkDate <= lastDayLastMonth;
    }
    case "3-months": {
      const threeMonthsAgo = new Date(today);
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      return checkDate >= threeMonthsAgo && checkDate <= today;
    }
    case "year": {
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      return checkDate >= firstDayOfYear && checkDate <= today;
    }
    default:
      return true;
  }
};
