import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Transaction } from "../../types/Transaction";

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
  initialValues?: Transaction;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    description: initialValues?.description || "",
    amount: initialValues?.amount?.toString() || "",
    category: initialValues?.category || "",
    type: initialValues?.type || "expense",
    date: initialValues?.date || new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount =
      formData.amount === "" ? 0 : parseFloat(formData.amount);
    onSubmit({
      ...formData,
      amount: numericAmount,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Autoriser: chiffres, un seul point décimal, signe moins au début, et champ vide
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      // Si la valeur est vide ou valide, mettre à jour le state
      setFormData((prev) => ({
        ...prev,
        amount: value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("transactions.description")}
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("transactions.amount")}
        </label>
        <input
          type="number"
          value={formData.amount}
          onChange={handleAmountChange}
          step="0.01"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("transactions.category")}
        </label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("transactions.type")}
        </label>
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value as "income" | "expense",
            })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="expense">{t("transactions.expense")}</option>
          <option value="income">{t("transactions.income")}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("transactions.date")}
        </label>
        <input
          type="date"
          value={formData.date.toString().split("T")[0]}
          onChange={(e) =>
            setFormData({ ...formData, date: new Date(e.target.value) })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialValues ? t("transactions.edit") : t("transactions.new")}
      </button>
    </form>
  );
};

export default TransactionForm;
