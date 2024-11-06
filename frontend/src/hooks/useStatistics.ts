import { useMemo } from "react";
import { formatCurrency } from "../lib/utils";
import { Budget } from "../types/Budget";
import { Transaction } from "../types/Transaction";

const calculateTrendPercentage = (
  current: number,
  previous: number
): number => {
  // Si les deux valeurs sont identiques, pas de changement
  if (current === previous) return 0;

  // Si la valeur précédente est 0, on utilise la différence absolue
  if (previous === 0) {
    return current > 0 ? current : -current;
  }

  // Calcul normal de la tendance
  return Number((((current - previous) / Math.abs(previous)) * 100).toFixed(2));
};

const getPreviousPeriodDates = (
  currentStartDate: Date,
  currentEndDate: Date
): { start: Date; end: Date } => {
  const periodLength = currentEndDate.getTime() - currentStartDate.getTime();
  return {
    start: new Date(currentStartDate.getTime() - periodLength),
    end: new Date(currentStartDate),
  };
};

export const useStatistics = (
  transactions: Transaction[],
  budgets: Budget[],
  filteredTransactions: Transaction[],
  hasDataForPeriod: boolean,
  dateRange?: string
) => {
  return useMemo(() => {
    // Vérification des données filtrées
    if (!filteredTransactions.length) {
      return {
        commonStats: [],
        currentExpenses: 0,
        previousExpenses: 0,
        currentIncome: 0,
        previousIncome: 0,
        currentBalance: 0,
        previousBalance: 0,
        expensesTrend: 0,
        incomeTrend: 0,
        balanceTrend: 0,
        totalBudget: 0,
        budgetAvailable: 0,
        budgetUsagePercentage: 0,
      };
    }

    // Tri des transactions par date
    const sortedTransactions = [...filteredTransactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Calcul des dépenses et revenus pour la période actuelle
    const currentExpenses = sortedTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const currentIncome = sortedTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    // Détermination des dates de la période actuelle
    const currentStartDate = new Date(sortedTransactions[0].date);
    const currentEndDate = new Date(
      sortedTransactions[sortedTransactions.length - 1].date
    );

    // Calcul de la période précédente
    const { start: previousPeriodStartDate, end: previousPeriodEndDate } =
      getPreviousPeriodDates(currentStartDate, currentEndDate);

    // Filtrage des transactions de la période précédente
    const previousPeriodTransactions = transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate >= previousPeriodStartDate &&
        transactionDate < previousPeriodEndDate
      );
    });

    // Calcul des montants de la période précédente
    const previousExpenses = previousPeriodTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const previousIncome = previousPeriodTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    // Calcul des soldes
    const currentBalance = currentIncome - currentExpenses;
    const previousBalance = previousIncome - previousExpenses;

    // Calcul des tendances
    const expensesTrend = calculateTrendPercentage(
      currentExpenses,
      previousExpenses
    );
    const incomeTrend = calculateTrendPercentage(currentIncome, previousIncome);
    const balanceTrend = calculateTrendPercentage(
      currentBalance,
      previousBalance
    );

    // Calcul du budget
    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
    const budgetAvailable = totalBudget - currentExpenses;
    const budgetUsagePercentage =
      totalBudget > 0
        ? Number(((currentExpenses / totalBudget) * 100).toFixed(2))
        : 0;

    const commonStats = [
      {
        title: "Dépenses de la période",
        value: formatCurrency(currentExpenses),
        icon: "trending_down",
        trend: {
          value: expensesTrend,
          isPositive: expensesTrend <= 0,
        },
      },
      {
        title: "Revenus de la période",
        value: formatCurrency(currentIncome),
        icon: "trending_up",
        trend: {
          value: incomeTrend,
          isPositive: incomeTrend >= 0,
        },
      },
      {
        title: "Solde",
        value: formatCurrency(currentBalance),
        icon: "account_balance",
        trend: {
          value: balanceTrend,
          isPositive: balanceTrend >= 0,
        },
      },
    ];

    return {
      commonStats,
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
      budgetUsagePercentage,
    };
  }, [
    transactions,
    budgets,
    filteredTransactions,
    hasDataForPeriod,
    dateRange,
  ]);
};
