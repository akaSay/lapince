import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "../../lib/utils";
import { Transaction } from "../../types/Transaction";

interface TransactionsListProps {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
  variant?: "default" | "compact";
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  onEdit,
  onDelete,
  variant = "default",
}) => {
  const { t } = useTranslation();

  const displayedTransactions =
    variant === "compact" ? transactions.slice(0, 5) : transactions;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700 sm:px-6">
        <h3 className="text-lg font-medium text-white">
          {t("dashboard.recentTransactions")}
        </h3>
        {variant === "compact" && transactions.length > 5 && (
          <Link
            to="/transactions"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            {t("common.viewAll")}
          </Link>
        )}
      </div>
      <div className={variant === "compact" ? "" : "overflow-x-auto"}>
        {displayedTransactions.length === 0 ? (
          <div className="p-4 text-center text-gray-400 sm:p-8">
            <p>{t("dashboard.noData")}</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-700">
            {displayedTransactions.map((transaction) => (
              <li
                key={transaction.id}
                className="px-4 py-3 transition-colors hover:bg-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {transaction.categoryIcon && (
                      <div className="text-gray-400">
                        <i className="material-icons-outlined">
                          {transaction.categoryIcon}
                        </i>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-white">
                        {transaction.description}
                      </p>
                      <div className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <div className="text-sm text-gray-400">
                          {t(
                            `categories.${transaction.type}.${transaction.category}`
                          )}
                        </div>
                        <p className="text-xs text-gray-400 sm:hidden">
                          {formatDate(new Date(transaction.date))}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${
                          transaction.type === "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="hidden text-sm text-gray-400 sm:block">
                        {formatDate(new Date(transaction.date))}
                      </p>
                    </div>
                    {variant !== "compact" && (
                      <div className="flex space-x-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(transaction)}
                            className="p-1 text-gray-400 transition-colors hover:text-white"
                          >
                            <i className="text-sm material-icons-outlined">
                              edit
                            </i>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(transaction)}
                            className="p-1 text-gray-400 transition-colors hover:text-red-400"
                          >
                            <i className="text-sm material-icons-outlined">
                              delete
                            </i>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
