import React, { useState } from "react";
import { Budget } from "../../types/Budget";

interface BudgetPlanningFormProps {
  onSubmit: (budget: Omit<Budget, "id" | "spent">) => void;
  initialValues?: Budget;
}

const BudgetPlanningForm: React.FC<BudgetPlanningFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const [formData, setFormData] = useState({
    category: initialValues?.category || "",
    limit: initialValues?.limit || 0,
    period: initialValues?.period || "monthly",
    startDate: initialValues?.startDate || new Date(),
    month: initialValues?.month || new Date().toISOString().slice(0, 7),
    status: initialValues?.status || "active",
    icon: initialValues?.icon || "💰",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Catégorie
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
          Montant
        </label>
        <input
          type="number"
          value={formData.limit}
          onChange={(e) =>
            setFormData({ ...formData, limit: parseFloat(e.target.value) })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Période
        </label>
        <select
          value={formData.period}
          onChange={(e) =>
            setFormData({
              ...formData,
              period: e.target.value as "monthly" | "yearly",
            })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="monthly">Mensuel</option>
          <option value="yearly">Annuel</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date de début
        </label>
        <input
          type="date"
          value={formData.startDate.toISOString().split("T")[0]}
          onChange={(e) =>
            setFormData({ ...formData, startDate: new Date(e.target.value) })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialValues ? "Modifier le budget" : "Créer un budget"}
      </button>
    </form>
  );
};

export default BudgetPlanningForm;
