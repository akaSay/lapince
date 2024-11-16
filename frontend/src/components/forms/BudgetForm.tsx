import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CATEGORY_GROUPS } from "../../lib/categories";
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
    defaultValues: initialData || {
      category: "",
      limit: 0,
      icon: "attach_money",
    },
  });

  const onSubmitForm = (data: BudgetData) => {
    const formattedData = {
      ...data,
      limit: Number(data.limit),
      icon: t(`categories.expense.${data.category}`).split(" ")[0],
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-300">
          {t("budget.form.category")}
        </label>
        <select
          {...register("category", { required: true })}
          className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t("budget.form.selectCategory")}</option>
          {Object.entries(CATEGORY_GROUPS)
            .filter(([key]) => key !== "income")
            .map(([groupKey, group]) => (
              <optgroup
                key={groupKey}
                label={t(`categories.groups.${groupKey}`)}
              >
                {group.categories.map((category) => (
                  <option key={category} value={category}>
                    {t(`categories.expense.${category}`)}
                  </option>
                ))}
              </optgroup>
            ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-300">
          {t("budget.form.limit")}
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          {...register("limit", { required: true, min: 0 })}
          className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <input type="hidden" {...register("icon")} defaultValue="attach_money" />

      <div className="flex justify-end gap-4 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-300 transition-colors hover:text-white"
          >
            {t("common.cancel")}
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {initialData ? t("common.save") : t("budget.form.create")}
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
