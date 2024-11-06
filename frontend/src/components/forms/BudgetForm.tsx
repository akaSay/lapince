import React from "react";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit } = useForm<BudgetData>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Catégorie
        </label>
        <input
          {...register("category")}
          className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Alimentation"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Limite (€)
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
          Icône
        </label>
        <select
          {...register("icon")}
          className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="account_balance">💰 Budget</option>
          <option value="restaurant">🍽️ Restaurant</option>
          <option value="shopping_cart">🛒 Courses</option>
          <option value="directions_car">🚗 Transport</option>
          <option value="home">🏠 Logement</option>
          <option value="sports_esports">🎮 Loisirs</option>
          <option value="medical_services">🏥 Santé</option>
          <option value="school">📚 Education</option>
        </select>
      </div>

      <div className="flex justify-end pt-4 space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-300 transition-colors hover:text-white"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {initialData ? "Modifier" : "Ajouter"}
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
