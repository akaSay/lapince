import React, { useState } from "react";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import { Filters } from "../types/Filters";

const Reports: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({});

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const statistics = [
    {
      title: "Dépenses moyennes",
      value: "1 850€",
      icon: "analytics",
      trend: { value: 8, isPositive: false },
    },
    {
      title: "Économies moyennes",
      value: "650€",
      icon: "savings",
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Budget utilisé",
      value: "74%",
      icon: "pie_chart",
      trend: { value: 5, isPositive: true },
    },
  ];

  const expenseData = [
    { category: "Alimentation", amount: 450 },
    { category: "Transport", amount: 280 },
    { category: "Loisirs", amount: 350 },
    { category: "Logement", amount: 800 },
    { category: "Santé", amount: 150 },
  ];

  const filteredExpenseData = expenseData.filter((expense) => {
    if (
      filters.category &&
      expense.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Rapports & Analyses</h1>
        <button className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
          Télécharger le rapport
        </button>
      </div>

      <DashboardFilters onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {statistics.map((stat) => (
          <StatisticsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ExpenseChart data={filteredExpenseData} />
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="mb-6 text-lg font-medium text-white">
            Tendances mensuelles
          </h3>
          {/* Ajoutez ici un autre graphique ou des statistiques */}
        </div>
      </div>
    </div>
  );
};

export default Reports;
