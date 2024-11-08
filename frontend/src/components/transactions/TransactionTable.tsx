import React from "react";
import { formatCurrency, formatDate } from "../../lib/utils";
import { Transaction } from "../../types/Transaction";
import { useTranslation } from "react-i18next";

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {t("transactions.date")}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {t("transactions.description")}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {t("transactions.category")}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {t("transactions.amount")}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {t("common.actions")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(new Date(transaction.date))}
              </td>
              <td className="px-6 py-4">{transaction.description}</td>
              <td className="px-6 py-4">{transaction.category}</td>
              <td
                className={`px-6 py-4 ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onEdit?.(transaction)}
                  className="mr-2 text-indigo-600 hover:text-indigo-900"
                >
                  {t("common.edit")}
                </button>
                <button
                  onClick={() => onDelete?.(transaction.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  {t("common.delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
