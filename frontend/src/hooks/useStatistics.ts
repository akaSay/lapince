import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Budget } from "../types/Budget";
import { Transaction } from "../types/Transaction";

const calculateTrend = (
  current: number,
  previous: number,
  type: "expenses" | "income" | "balance"
) => {
  if (previous === 0) {
    if (type === "expenses") {
      // Pour les dépenses, augmentation = négatif
      return current > 0 ? -100 : 0;
    } else if (type === "income") {
      // Pour les revenus, augmentation = positif
      return current > 0 ? 100 : 0;
    } else {
      // Pour le solde, dépend si positif ou négatif
      return current > 0 ? 100 : current < 0 ? -100 : 0;
    }
  }

  const trend = ((current - previous) / Math.abs(previous)) * 100;
  return Number(trend.toFixed(1)); // Limiter à 1 décimale
};

export const useStatistics = (
  allTransactions: Transaction[],
  budgets: Budget[],
  filteredTransactions: Transaction[],
  hasDataForPeriod: boolean,
  dateRange?: string
) => {
  const { t } = useTranslation();

  return useMemo(() => {
    // Calculer les dépenses et revenus à partir des transactions filtrées
    const currentExpenses = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const currentIncome = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    // Obtenir le mois précédent
    const getPreviousMonth = () => {
      if (!dateRange?.startsWith("month-")) return null;
      const [, year, month] = dateRange.split("-").map(Number);
      const prevDate = new Date(year, month - 2);
      return `month-${prevDate.getFullYear()}-${String(
        prevDate.getMonth() + 1
      ).padStart(2, "0")}`;
    };

    // Calculer les transactions du mois précédent
    const previousMonth = getPreviousMonth();
    const previousMonthTransactions = previousMonth
      ? allTransactions.filter((t) => {
          const [, year, month] = previousMonth.split("-").map(Number);
          const date = new Date(t.date);
          return date.getFullYear() === year && date.getMonth() === month - 1;
        })
      : [];

    const previousExpenses = previousMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const previousIncome = previousMonthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculer les soldes
    const currentBalance = currentIncome - currentExpenses;
    const previousBalance = previousIncome - previousExpenses;

    // Calculer les tendances avec la nouvelle fonction
    const expensesTrend = calculateTrend(
      currentExpenses,
      previousExpenses,
      "expenses"
    );
    const incomeTrend = calculateTrend(currentIncome, previousIncome, "income");
    const balanceTrend = calculateTrend(
      currentBalance,
      previousBalance,
      "balance"
    );

    // Calculer le budget total et disponible
    const currentMonth = dateRange?.startsWith("month-")
      ? dateRange
      : `month-${new Date().getFullYear()}-${String(
          new Date().getMonth() + 1
        ).padStart(2, "0")}`;

    const totalBudget = budgets
      .filter((b) => b.month === currentMonth)
      .reduce((sum, b) => sum + b.limit, 0);

    const budgetAvailable = totalBudget - currentExpenses;

    return {
      currentExpenses,
      previousExpenses,
      currentIncome,
      previousIncome,
      currentBalance,
      previousBalance,
      expensesTrend,
      incomeTrend,
      balanceTrend,
      totalBudget,
      budgetAvailable,
    };
  }, [
    allTransactions,
    budgets,
    filteredTransactions,
    hasDataForPeriod,
    dateRange,
    t,
  ]);
};
