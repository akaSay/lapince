import React from "react";
import { Filters } from "../../types/Filters";

interface DashboardFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
      <select
        className="w-full sm:w-auto bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onFilterChange({ category: e.target.value })}
      >
        <option value="">Toutes les catégories</option>
        <option value="alimentation">Alimentation</option>
        <option value="transport">Transport</option>
        <option value="loisirs">Loisirs</option>
        <option value="logement">Logement</option>
      </select>

      <select
        className="w-full sm:w-auto bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onFilterChange({ dateRange: e.target.value })}
      >
        <option value="this-month">Ce mois</option>
        <option value="last-month">Mois dernier</option>
        <option value="3-months">3 derniers mois</option>
        <option value="year">Cette année</option>
      </select>

      <select
        className="w-full sm:w-auto bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onFilterChange({ status: e.target.value })}
      >
        <option value="">Tous les statuts</option>
        <option value="success">À jour</option>
        <option value="warning">Attention</option>
        <option value="danger">Dépassement</option>
      </select>
    </div>
  );
};

export default DashboardFilters;
