import React, { useState } from "react";
import BudgetCard from "../components/dashboard/BudgetCard";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import BudgetModal from "../components/modals/BudgetModal";
import { Filters } from "../types/Filters";

const Budget: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<
    | {
        category: string;
        limit: number;
        icon: string;
      }
    | undefined
  >();

  const budgets = [
    {
      category: "Alimentation",
      icon: "restaurant",
      spent: 450,
      limit: 600,
      status: "success" as const,
    },
    {
      category: "Transport",
      icon: "directions_car",
      spent: 280,
      limit: 300,
      status: "warning" as const,
    },
    {
      category: "Loisirs",
      icon: "sports_esports",
      spent: 350,
      limit: 300,
      status: "danger" as const,
    },
  ];

  const statistics = [
    {
      title: "Budget mensuel",
      value: "2 500€",
      icon: "account_balance_wallet",
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Dépenses totales",
      value: "1 850€",
      icon: "trending_down",
      trend: { value: 8, isPositive: false },
    },
    {
      title: "Économies",
      value: "650€",
      icon: "savings",
      trend: { value: 12, isPositive: true },
    },
  ];

  const expenseData = budgets.map((budget) => ({
    category: budget.category,
    amount: budget.spent,
  }));

  const handleBudgetSubmit = (budgetData: {
    category: string;
    limit: number;
    icon: string;
  }) => {
    console.log("Budget soumis:", budgetData);
    // Implémentez la logique de sauvegarde ici
  };

  const handleBudgetClick = (budget: typeof selectedBudget) => {
    setSelectedBudget(budget);
    setIsModalOpen(true);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    // Logique de filtrage à implémenter ici
  };

  const filteredBudgets = budgets.filter((budget) => {
    if (
      filters.category &&
      budget.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }

    if (filters.status) {
      return budget.status === filters.status;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Gestion du budget</h1>
        <button
          onClick={() => {
            setSelectedBudget(undefined);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          + Nouveau budget
        </button>
      </div>

      <DashboardFilters onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {statistics.map((stat) => (
          <StatisticsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {filteredBudgets.map((budget) => (
            <div
              key={budget.category}
              onClick={() =>
                handleBudgetClick({
                  category: budget.category,
                  limit: budget.limit,
                  icon: budget.icon,
                })
              }
            >
              <BudgetCard {...budget} />
            </div>
          ))}
        </div>
        <ExpenseChart data={expenseData} />
      </div>

      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBudget(undefined);
        }}
        onSubmit={handleBudgetSubmit}
        initialData={selectedBudget}
      />
    </div>
  );
};

export default Budget;
