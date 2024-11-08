import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Transaction, TransactionType } from "../../types/Transaction";

interface TransactionFormProps {
  onSubmit: (data: Omit<Transaction, "id">) => void;
  onCancel: () => void;
  initialData?: Transaction;
  initialCategory?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  initialCategory,
}) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<Omit<Transaction, "id">>({
    description: initialData?.description || "",
    amount: initialData?.amount || 0,
    date: initialData?.date || new Date(),
    category: initialCategory || initialData?.category || "",
    type: initialData?.type || "expense",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-300">
          {t("transactions.form.description")}
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            {t("transactions.form.amount")}
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: parseFloat(e.target.value) })
            }
            className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            {t("transactions.form.type")}
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as TransactionType,
              })
            }
            className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="expense">{t("transactions.form.expense")}</option>
            <option value="income">{t("transactions.form.income")}</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-300">
          {t("transactions.form.category")}
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-3 py-2 bg-gray-700 rounded-lg"
          disabled={!!initialCategory}
        >
          <option value="">{t("dashboard.filters.allCategories")}</option>
          <option value="Alimentation">{t("dashboard.filters.food")}</option>
          <option value="Transport">{t("dashboard.filters.transport")}</option>
          <option value="Loisirs">{t("dashboard.filters.leisure")}</option>
          <option value="Logement">{t("dashboard.filters.housing")}</option>
        </select>
      </div>

      <div className="flex justify-end pt-4 space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-300 transition-colors hover:text-white"
        >
          {t("common.cancel")}
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {initialData ? t("common.edit") : t("transactions.new")}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
