import React from "react";
import { formatCurrency } from "../../lib/utils";

interface ExpenseData {
  category: string;
  amount: number;
}

interface ExpenseChartProps {
  data: ExpenseData[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const maxAmount = Math.max(...data.map((item) => item.amount));

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg sm:p-6">
      <h3 className="mb-4 text-lg font-medium text-white sm:mb-6">
        Dépenses par catégorie
      </h3>
      <div className="space-y-3 sm:space-y-4">
        {data.map((item) => (
          <div key={item.category}>
            <div className="flex flex-col justify-between mb-1 space-y-1 text-sm text-gray-400 sm:flex-row sm:space-y-0">
              <span className="font-medium">{item.category}</span>
              <span>{formatCurrency(item.amount)}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
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
