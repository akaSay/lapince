import React, { useState } from "react";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import TransactionsList from "../components/dashboard/TransactionsList";
import TransactionModal from "../components/modals/TransactionModal";
import { Filters } from "../types/Filters";
import { Transaction } from "../types/Transaction";

const Transactions: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    // Logique de filtrage à implémenter ici
  };

  // Données exemple
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
    {
      id: "2",
      description: "Salaire",
      amount: 2500,
      date: new Date(),
      category: "Revenu",
      type: "income" as const,
      categoryIcon: "payments",
    },
    // ... autres transactions
  ];

  const statistics = [
    {
      title: "Total des revenus",
      value: "3 500€",
      icon: "trending_up",
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Total des dépenses",
      value: "1 850€",
      icon: "trending_down",
      trend: { value: 8, isPositive: false },
    },
    {
      title: "Solde",
      value: "1 650€",
      icon: "account_balance",
      trend: { value: 15, isPositive: true },
    },
  ];

  const handleTransactionSubmit = (
    transactionData: Omit<Transaction, "id">
  ) => {
    console.log("Transaction soumise:", transactionData);
    // Implémentez la logique de sauvegarde ici
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (transaction: Transaction) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette transaction ?")
    ) {
      console.log("Supprimer:", transaction);
      // Implémentez la logique de suppression ici
    }
  };

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
        case "this-month": {
          return (
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear()
          );
        }
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
        case "year": {
          return transactionDate.getFullYear() === today.getFullYear();
        }
      }
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <button
          onClick={() => {
            setSelectedTransaction(undefined);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          + Nouvelle transaction
        </button>
      </div>

      <DashboardFilters onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {statistics.map((stat) => (
          <StatisticsCard key={stat.title} {...stat} />
        ))}
      </div>

      <TransactionsList
        transactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTransaction(undefined);
        }}
        onSubmit={handleTransactionSubmit}
        initialData={selectedTransaction}
      />
    </div>
  );
};

export default Transactions;
