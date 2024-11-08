import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { BudgetData } from "../../types/Budget";

interface BudgetFormProps {
  onSubmit: (data: BudgetData) => void;
  initialData?: BudgetData;
  onCancel?: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<BudgetData>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-300">
          {t("budget.form.category")}
        </label>
        <input
          {...register("category")}
          className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Alimentation"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-300">
          {t("budget.form.limit")} (€)
        </label>
        <input
          type="number"
          {...register("limit")}
          className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: 500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-300">
          {t("budget.form.category")}
        </label>
        <select
          {...register("icon")}
          className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="account_balance">
            {t("budget.form.icons.account_balance")}
          </option>
          <option value="restaurant">
            {t("budget.form.icons.restaurant")}
          </option>
          <option value="shopping_cart">
            {t("budget.form.icons.shopping_cart")}
          </option>
          <option value="directions_car">
            {t("budget.form.icons.directions_car")}
          </option>
          <option value="home">{t("budget.form.icons.home")}</option>
          <option value="sports_esports">
            {t("budget.form.icons.sports_esports")}
          </option>
          <option value="medical_services">
            {t("budget.form.icons.medical_services")}
          </option>
          <option value="school">{t("budget.form.icons.school")}</option>
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
          {initialData ? t("common.edit") : t("budget.new")}
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
