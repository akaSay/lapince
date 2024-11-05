import React from "react";
import { formatCurrency } from "../../lib/utils";

interface BudgetCardProps {
  category: string;
  icon: string;
  spent: number;
  limit: number;
  status: "success" | "warning" | "danger";
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  category,
  icon,
  spent,
  limit,
  status,
}) => {
  const percentage = Math.min((spent / limit) * 100, 100);
  const remaining = limit - spent;

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "bg-green-600";
      case "warning":
        return "bg-yellow-600";
      case "danger":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "danger":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="p-4 overflow-hidden bg-gray-800 rounded-lg shadow-lg sm:p-6">
      <div className="flex flex-col justify-between mb-4 space-y-2 sm:flex-row sm:items-center sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getStatusColor()}`}>
            <i className="text-white material-icons-outlined">{icon}</i>
          </div>
          <h3 className="text-lg font-medium text-white">{category}</h3>
        </div>
        <div
          className={`px-2 py-1 rounded text-sm ${getStatusTextColor()} border ${
            status === "danger" ? "border-red-600" : "border-gray-600"
          } self-start sm:self-auto`}
        >
          {status === "success" && "À jour"}
          {status === "warning" && "Attention"}
          {status === "danger" && "Dépassement"}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-col justify-between mb-1 space-y-1 text-sm sm:flex-row sm:space-y-0">
          <span
            className={status === "danger" ? "text-red-400" : "text-gray-400"}
          >
            Dépensé: {formatCurrency(spent)}
          </span>
          <span className="text-gray-400">Limite: {formatCurrency(limit)}</span>
        </div>
        <div className="h-2 overflow-hidden bg-gray-700 rounded-full">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getStatusColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
        <span
          className={`text-sm ${
            remaining < 0 ? "text-red-400" : "text-gray-400"
          }`}
        >
          {remaining < 0 ? "Dépassement:" : "Reste:"}{" "}
          {formatCurrency(Math.abs(remaining))}
        </span>
        <button className="w-full px-3 py-1 text-white transition-colors bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700">
          + Transaction
        </button>
      </div>
    </div>
  );
};

export default BudgetCard;
