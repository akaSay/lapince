import React, { useState } from "react";
import BudgetCard from "../components/dashboard/BudgetCard";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import TransactionsList from "../components/dashboard/TransactionsList";
import TransactionModal from "../components/modals/TransactionModal";
import { useFilters } from "../contexts/FilterContext";
import { useBudget } from "../hooks/useBudget";
import { useStatistics } from "../hooks/useStatistics";
import { useTransaction } from "../hooks/useTransaction";
import { isDateInRange } from "../lib/dateUtils";
import { Transaction } from "../types/Transaction";
import { formatCurrency } from "../lib/utils";

const Dashboard: React.FC = () => {
  const { filters } = useFilters();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { budgets, deleteBudget, fetchBudgets } = useBudget();
  const { transactions, createTransaction } = useTransaction();

  const filteredTransactions = transactions.filter((transaction) => {
    if (!isDateInRange(transaction.date, filters.dateRange)) {
      return false;
    }
    if (
      filters.category &&
      transaction.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }
    return true;
  });

  const hasDataForPeriod =
    filteredTransactions.length > 0 || !filters.dateRange;

  const { currentExpenses, previousExpenses, expensesTrend } = useStatistics(
    transactions,
    budgets,
    filteredTransactions,
    hasDataForPeriod,
    filters.dateRange
  );

  const dashboardStats = [
    {
      title: "Dépenses du mois",
      value: formatCurrency(currentExpenses),
      icon: "trending_down",
      trend: { value: expensesTrend, isPositive: expensesTrend <= 0 },
    },
    {
      title: "Mois précédent",
      value: formatCurrency(previousExpenses),
      icon: "calendar_today",
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Tendance",
      value: `${expensesTrend > 0 ? "+" : ""}${expensesTrend.toFixed(1)}%`,
      icon: expensesTrend > 0 ? "trending_up" : "trending_down",
      trend: { value: expensesTrend, isPositive: expensesTrend <= 0 },
    },
  ];

  const budgetsWithFilteredSpent = budgets.map((budget) => {
    const filteredSpent = filteredTransactions
      .filter((t) => t.category === budget.category && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      ...budget,
      spent: filteredSpent,
      shouldShow: filteredSpent > 0 || !filters.dateRange,
    };
  });

  const filteredBudgets = budgetsWithFilteredSpent.filter((budget) => {
    if (!budget.shouldShow) return false;
    if (
      filters.category &&
      budget.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }
    if (filters.status) {
      const percentage = (budget.spent / budget.limit) * 100;
      switch (filters.status) {
        case "success":
          return percentage < 75;
        case "warning":
          return percentage >= 75 && percentage < 100;
        case "danger":
          return percentage >= 100;
        default:
          return true;
      }
    }
    return true;
  });

  const handleTransactionSubmit = async (
    transactionData: Omit<Transaction, "id">
  ) => {
    try {
      await createTransaction(transactionData);
      setIsTransactionModalOpen(false);
      await fetchBudgets();
    } catch (error) {
      console.error("Erreur lors de la création de la transaction:", error);
    }
  };

  const handleAddTransaction = (category: string) => {
    setSelectedCategory(category);
    setIsTransactionModalOpen(true);
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

      <DashboardFilters />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {dashboardStats.map((stat) => (
          <StatisticsCard key={stat.title} {...stat} />
        ))}
      </div>

      {hasDataForPeriod ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredBudgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                {...budget}
                onDelete={() => deleteBudget(budget.id)}
                onAddTransaction={handleAddTransaction}
                variant="default"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ExpenseChart
              data={filteredBudgets.map((b) => ({
                category: b.category,
                amount: b.spent || 0,
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
        </>
      ) : (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="py-4 text-center text-gray-400">
            Aucune donnée disponible pour la période sélectionnée
          </div>
        </div>
      )}

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => {
          setIsTransactionModalOpen(false);
          setSelectedCategory("");
          setSelectedTransaction(undefined);
        }}
        onSubmit={handleTransactionSubmit}
        initialData={selectedTransaction}
        initialCategory={selectedCategory}
      />
    </div>
  );
};

export default Dashboard;
