import { Transaction } from "../types/Transaction";

export const getMonthlyData = (
  transactions: Transaction[],
  months: number = 6
) => {
  const today = new Date();
  const monthsData: { [key: string]: number } = {};

  // Initialiser les derniers mois avec 0
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = date.toLocaleDateString("fr-FR", {
      month: "short",
      year: "2-digit",
    });
    monthsData[monthKey] = 0;
  }

  // Remplir avec les données réelles
  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      const date = new Date(transaction.date);
      const monthKey = date.toLocaleDateString("fr-FR", {
        month: "short",
        year: "2-digit",
      });
      if (monthsData[monthKey] !== undefined) {
        monthsData[monthKey] += transaction.amount;
      }
    }
  });

  return {
    labels: Object.keys(monthsData),
    values: Object.values(monthsData),
  };
};

export const calculateTrend = (values: number[]) => {
  if (values.length < 2) return 0;

  const lastMonth = values[values.length - 1];
  const previousMonth = values[values.length - 2];

  if (previousMonth === 0) return 100;

  return ((lastMonth - previousMonth) / previousMonth) * 100;
};

export const calculateMonthlyAverage = (
  expenses: number,
  dateRange?: string
) => {
  switch (dateRange) {
    case "year":
      return expenses / 12;
    case "3-months":
      return expenses / 3;
    default:
      return expenses;
  }
};
