import React from "react";
import { useTranslation } from "react-i18next";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import TrendChart from "../components/reports/TrendChart";
import { useFilters } from "../contexts/FilterContext";
import { useBudget } from "../hooks/useBudget";
import { useStatistics } from "../hooks/useStatistics";
import { useTransaction } from "../hooks/useTransaction";
import { getMonthlyData } from "../lib/chartUtils";
import { isDateInRange } from "../lib/dateUtils";
import { formatCurrency } from "../lib/utils";

const Reports: React.FC = () => {
  const { t } = useTranslation();
  const { filters } = useFilters();
  const { transactions } = useTransaction();
  const { budgets } = useBudget();

  const filteredTransactions = transactions.filter((transaction) => {
    if (!isDateInRange(transaction.date, filters.dateRange)) {
      return false;
    }

    if (
      filters.category &&
      transaction.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }

    return true;
  });

  const hasDataForPeriod =
    filteredTransactions.length > 0 || !filters.dateRange;

  const { currentExpenses, previousExpenses, expensesTrend } = useStatistics(
    transactions,
    budgets,
    filteredTransactions,
    hasDataForPeriod,
    filters.dateRange
  );

  const reportStats = [
    {
      title: t("reports.currentExpenses"),
      value: formatCurrency(currentExpenses),
      icon: "trending_down",
      trend: { value: expensesTrend, isPositive: expensesTrend <= 0 },
    },
    {
      title: t("reports.previousMonth"),
      value: formatCurrency(previousExpenses),
      icon: "calendar_today",
      trend: { value: 0, isPositive: true },
    },
    {
      title: t("reports.monthlyVariation"),
      value: `${expensesTrend > 0 ? "+" : ""}${expensesTrend.toFixed(1)}%`,
      icon: expensesTrend > 0 ? "trending_up" : "trending_down",
      trend: { value: expensesTrend, isPositive: expensesTrend <= 0 },
    },
  ];

  // Données pour le graphique
  const expenseData = hasDataForPeriod
    ? Object.entries(
        filteredTransactions
          .filter((t) => t.type === "expense")
          .reduce((acc, transaction) => {
            const category = transaction.category;
            acc[category] = (acc[category] || 0) + transaction.amount;
            return acc;
          }, {} as Record<string, number>)
      ).map(([category, amount]) => ({
        category,
        amount,
      }))
    : [];

  // Créer les données pour TrendChart dans le bon format
  const monthlyData = getMonthlyData(filteredTransactions);

  const trendChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: t("report.monthlyExpenses"),
        data: monthlyData.values,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{t("reports.title")}</h1>
      </div>

      <DashboardFilters />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {reportStats.map((stat) => (
          <StatisticsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {hasDataForPeriod ? (
          <>
            <TrendChart data={trendChartData} />
            <ExpenseChart data={expenseData} />
          </>
        ) : (
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="py-4 text-center text-gray-400">
              {t("report.noData")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
