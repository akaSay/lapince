import React from "react";
import { formatCurrency } from "../../lib/utils";
import { Transaction } from "../../types/Transaction";

interface CategoryDistributionProps {
  transactions: Transaction[];
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  transactions,
}) => {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    if (transaction.type === "expense") {
      acc[transaction.category] =
        (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a
  );

  const total = Object.values(categoryTotals).reduce(
    (sum, amount) => sum + amount,
    0
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Distribution par catégorie</h3>
      <div className="space-y-4">
        {sortedCategories.map(([category, amount]) => {
          const percentage = ((amount / total) * 100).toFixed(1);
          return (
            <div key={category}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">{category}</span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-right text-xs text-gray-500 mt-1">
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryDistribution;
