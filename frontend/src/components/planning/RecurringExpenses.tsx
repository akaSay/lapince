import React from "react";
import { formatCurrency } from "../../lib/utils";
import { Transaction } from "../../types/Transaction";

interface RecurringExpensesProps {
  expenses: Transaction[];
  onEdit?: (expense: Transaction) => void;
  onDelete?: (id: string) => void;
}

const RecurringExpenses: React.FC<RecurringExpensesProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium">Dépenses récurrentes</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <li key={expense.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{expense.description}</p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-red-600">
                    -{formatCurrency(expense.amount)}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit?.(expense)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => onDelete?.(expense.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecurringExpenses;
