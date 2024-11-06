import React from "react";
import { useFilters } from "../../contexts/FilterContext";

const DashboardFilters: React.FC = () => {
  const { filters, setFilters } = useFilters();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value || undefined,
    });
  };

  return (
    <div className="flex flex-wrap gap-4">
      <select
        name="dateRange"
        value={filters.dateRange || ""}
        onChange={handleFilterChange}
        className="px-3 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Toutes les périodes</option>
        <option value="this-month">Ce mois</option>
        <option value="last-month">Mois dernier</option>
        <option value="3-months">3 derniers mois</option>
        <option value="year">Cette année</option>
      </select>

      <select
        name="status"
        value={filters.status || ""}
        onChange={handleFilterChange}
        className="px-3 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Tous les statuts</option>
        <option value="success">À jour</option>
        <option value="warning">Attention</option>
        <option value="danger">Dépassement</option>
      </select>

      <select
        name="category"
        value={filters.category || ""}
        onChange={handleFilterChange}
        className="px-3 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Toutes les catégories</option>
        <option value="Alimentation">Alimentation</option>
        <option value="Transport">Transport</option>
        <option value="Logement">Logement</option>
        <option value="Loisirs">Loisirs</option>
      </select>
    </div>
  );
};

export default DashboardFilters;
