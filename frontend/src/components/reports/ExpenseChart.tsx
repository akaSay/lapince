import React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../lib/utils";
import { Transaction } from "../../types/Transaction";

interface ExpenseChartProps {
  transactions: Transaction[];
  period: "weekly" | "monthly" | "yearly";
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({
  transactions,
  period,
}) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{t("reports.charts.expenses")}</h3>
        <select
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={period}
        >
          <option value="weekly">{t("reports.expenseChart.weekly")}</option>
          <option value="monthly">{t("reports.expenseChart.monthly")}</option>
          <option value="yearly">{t("reports.expenseChart.yearly")}</option>
        </select>
      </div>
      <div className="flex items-center justify-center h-64 text-gray-500">
        {t("reports.expenseChart.graph")}
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{t("reports.expenseChart.totalExpenses")}:</span>
          <span className="font-medium">
            {formatCurrency(
              transactions
                .filter((t) => t.type === "expense")
                .reduce((sum, t) => sum + t.amount, 0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
