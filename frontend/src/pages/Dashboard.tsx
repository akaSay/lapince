import React, { useState } from "react";
import BudgetCard from "../components/dashboard/BudgetCard";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import TransactionsList from "../components/dashboard/TransactionsList";
import TransactionModal from "../components/modals/TransactionModal";
import { formatCurrency } from "../lib/utils";
import { Filters } from "../types/Filters";
import { Transaction } from "../types/Transaction";

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleTransactionSubmit = (
    transactionData: Omit<Transaction, "id">
  ) => {
    console.log("Transaction soumise:", transactionData);
    setIsTransactionModalOpen(false);
  };

  // Données exemple
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

  const transactions = [
    {
      id: "1",
      description: "Courses Carrefour",
      amount: 85.5,
      date: new Date(),
      category: "Alimentation",
      type: "expense" as const,
      categoryIcon: "shopping_cart",
    },
    // ... autres transactions
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    if (
      filters.category &&
      transaction.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }

    if (filters.dateRange) {
      const today = new Date();
      const transactionDate = new Date(transaction.date);

      switch (filters.dateRange) {
        case "this-month":
          return (
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear()
          );
        case "last-month": {
          const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
          return (
            transactionDate.getMonth() === lastMonth.getMonth() &&
            transactionDate.getFullYear() === lastMonth.getFullYear()
          );
        }
        case "3-months": {
          const threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));
          return transactionDate >= threeMonthsAgo;
        }
        case "year":
          return transactionDate.getFullYear() === today.getFullYear();
      }
    }

    return true;
  });

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

  // Mettre à jour les statistiques en fonction des filtres
  const updateStatistics = () => {
    const filteredStats = [
      {
        title: "Budget total",
        value: formatCurrency(
          filteredBudgets.reduce((acc, curr) => acc + curr.limit, 0)
        ),
        icon: "account_balance_wallet",
        trend: { value: 5, isPositive: true },
      },
      {
        title: "Dépenses",
        value: formatCurrency(
          filteredTransactions
            .filter((t) => t.type === "expense")
            .reduce((acc, curr) => acc + curr.amount, 0)
        ),
        icon: "trending_down",
        trend: { value: 2, isPositive: false },
      },
    ];

    return filteredStats;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
        <button
          onClick={() => {
            setSelectedTransaction(undefined);
            setIsTransactionModalOpen(true);
          }}
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          + Nouvelle transaction
        </button>
      </div>

      <DashboardFilters onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {updateStatistics().map((stat) => (
          <StatisticsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {filteredBudgets.map((budget) => (
          <BudgetCard key={budget.category} {...budget} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ExpenseChart
          data={filteredBudgets.map((b) => ({
            category: b.category,
            amount: b.spent,
          }))}
        />
        <TransactionsList
          transactions={filteredTransactions}
          onEdit={(transaction) => {
            setSelectedTransaction(transaction);
            setIsTransactionModalOpen(true);
          }}
          variant="compact"
        />
      </div>

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => {
          setIsTransactionModalOpen(false);
          setSelectedTransaction(undefined);
        }}
        onSubmit={handleTransactionSubmit}
        initialData={selectedTransaction}
      />
    </div>
  );
};

export default Dashboard;
