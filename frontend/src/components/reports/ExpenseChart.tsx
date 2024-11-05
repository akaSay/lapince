import React from "react";
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
  // Note: Dans un cas réel, vous utiliseriez une bibliothèque de graphiques comme Chart.js ou Recharts
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Évolution des dépenses</h3>
        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={period}
        >
          <option value="weekly">Hebdomadaire</option>
          <option value="monthly">Mensuel</option>
          <option value="yearly">Annuel</option>
        </select>
      </div>
      <div className="h-64 flex items-center justify-center text-gray-500">
        Graphique à implémenter
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Total des dépenses:</span>
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
