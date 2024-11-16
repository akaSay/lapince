import React from "react";
import { formatCurrency } from "../../lib/utils";
import { useTranslation } from "react-i18next";

interface ExpenseChartProps {
  data: Array<{
    category: string;
    amount: number;
  }>;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const { t } = useTranslation();

  // Filtrer les données avec un montant > 0
  const validData = data.filter((item) => item.amount > 0);

  // Si pas de données valides, afficher un message
  if (validData.length === 0) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="mb-6 text-lg font-medium text-white">
          {t("dashboard.statistics.expensesByCategory")}
        </h3>
        <div className="py-4 text-center text-gray-400">
          {t("dashboard.noData")}
        </div>
      </div>
    );
  }

  // Trier les données par montant décroissant
  const sortedData = [...validData].sort((a, b) => b.amount - a.amount);
  const maxAmount = Math.max(...validData.map((item) => item.amount));

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg sm:p-6">
      <h3 className="mb-6 text-lg font-medium text-white">
        {t("dashboard.statistics.expensesByCategory")}
      </h3>
      <div className="space-y-4">
        {sortedData.map((item) => (
          <div key={item.category} className="w-full">
            <div className="flex justify-between mb-1.5">
              <span className="text-sm text-gray-400 truncate max-w-[60%]">
                {t(`categories.expense.${item.category}`)}
              </span>
              <span className="text-sm text-gray-400">
                {formatCurrency(item.amount)}
              </span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300 bg-blue-600 rounded-full"
                style={{
                  width: `${(item.amount / maxAmount) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;
