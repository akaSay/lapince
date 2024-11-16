import React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../lib/utils";

interface BudgetCardProps {
  category: string;
  description?: string;
  icon: string;
  spent?: number;
  limit: number;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onAddTransaction: (category: string) => void;
  onClick?: () => void;
  variant?: "default" | "editable";
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  category,
  icon,
  spent = 0,
  limit,
  onDelete,
  onAddTransaction,
  onClick,
  variant = "default",
}) => {
  const { t } = useTranslation();

  const percentage = (spent / limit) * 100;
  const remaining = spent >= limit ? 0 : limit - spent;
  const overSpent = spent > limit ? spent - limit : 0;

  const getStatus = () => {
    if (percentage >= 100) return "danger";
    if (percentage >= 75) return "warning";
    return "success";
  };

  const status = getStatus();

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
    <div
      className={`
        p-4 bg-gray-800 rounded-lg shadow-lg 
        transition-all duration-200 
        ${
          variant === "editable"
            ? "cursor-pointer hover:bg-gray-700 hover:shadow-xl hover:scale-[1.02] group"
            : variant === "default"
            ? "cursor-pointer hover:bg-gray-700"
            : ""
        }
      `}
      onClick={
        variant === "editable"
          ? onClick
          : variant === "default"
          ? onClick
          : undefined
      }
    >
      <div className="flex flex-col space-y-4">
        {/* Header avec titre et actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-lg ${getStatusColor()}`}>
              <i className="text-white material-icons-outlined">{icon}</i>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-white">
                {t(`categories.expense.${category}`)}
              </h3>
              {variant === "editable" && (
                <i className="hidden text-gray-400 transition-colors material-icons-outlined group-hover:inline-block">
                  edit
                </i>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`px-2 py-1 text-sm rounded ${getStatusTextColor()} border ${
                status === "danger" ? "border-red-600" : "border-gray-600"
              }`}
            >
              {status === "success" && t("dashboard.filters.upToDate")}
              {status === "warning" && t("dashboard.filters.warning")}
              {status === "danger" && t("dashboard.filters.exceeded")}
            </div>
            {variant === "editable" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(e);
                }}
                className="p-1.5 text-gray-400 hover:text-red-400 transition-colors rounded-full hover:bg-gray-700"
                title="Supprimer le budget"
              >
                <i className="text-xl material-icons-outlined">delete</i>
              </button>
            )}
          </div>
        </div>

        {/* Montants */}
        <div className="flex justify-between text-sm text-gray-400">
          <span>{formatCurrency(spent)}</span>
          {percentage > 100 ? (
            <span className="text-red-400">
              Dépassé de {formatCurrency(overSpent)}
            </span>
          ) : (
            <span>Reste {formatCurrency(remaining)}</span>
          )}
        </div>

        {/* Barre de progression */}
        <div className="h-1.5 mb-4 overflow-hidden bg-gray-700 rounded-full">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getStatusColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {t("budget.statistics.remaining")}:{" "}
            {formatCurrency(Math.abs(remaining))}
          </span>
          {variant === "default" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddTransaction(category);
              }}
              className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("dashboard.quickActions.addTransaction")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default BudgetCard;
