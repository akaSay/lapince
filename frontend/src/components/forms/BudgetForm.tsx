import React, { useState } from "react";

interface BudgetFormProps {
  onSubmit: (budget: { category: string; limit: number; icon: string }) => void;
  initialData?: {
    category: string;
    limit: number;
    icon: string;
  };
  onCancel: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    category: initialData?.category || "",
    limit: initialData?.limit || 0,
    icon: initialData?.icon || "account_balance_wallet",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Catégorie
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          <option value="Alimentation">Alimentation</option>
          <option value="Transport">Transport</option>
          <option value="Loisirs">Loisirs</option>
          <option value="Logement">Logement</option>
          <option value="Santé">Santé</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Limite mensuelle
        </label>
        <input
          type="number"
          value={formData.limit}
          onChange={(e) =>
            setFormData({ ...formData, limit: parseFloat(e.target.value) })
          }
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Icône
        </label>
        <select
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="restaurant">Restaurant</option>
          <option value="directions_car">Transport</option>
          <option value="sports_esports">Loisirs</option>
          <option value="home">Logement</option>
          <option value="local_hospital">Santé</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {initialData ? "Modifier" : "Créer"}
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
