import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AddCard from "../components/common/AddCard";
import BudgetCard from "../components/dashboard/BudgetCard";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import BudgetModal from "../components/modals/BudgetModal";
import BudgetSkeleton from "../components/skeletons/BudgetSkeleton";
import { useFilters } from "../contexts/FilterContext";
import { useBudget } from "../hooks/useBudget";
import { useStatistics } from "../hooks/useStatistics";
import { useToast } from "../hooks/useToast";
import { useTransaction } from "../hooks/useTransaction";
import { isDateInRange } from "../lib/dateUtils";
import type { Budget, BudgetData } from "../types/Budget";
import { formatCurrency } from "../lib/utils";

const Budget: React.FC = () => {
  const { t } = useTranslation();
  const { error: showError } = useToast();

  const { budgets, loading, error, createBudget, deleteBudget, updateBudget } =
    useBudget();
  const { transactions } = useTransaction();
  const { filters } = useFilters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<
    (BudgetData & { id?: string }) | undefined
  >();

  // Filtrer les transactions
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

  // Préparation des données avec les budgets filtrés
  const budgetArray = Array.isArray(budgets) ? budgets : [];

  const filteredBudgets = budgetArray
    .map((budget) => {
      const spent = filteredTransactions
        .filter((t) => t.category === budget.category && t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        ...budget,
        spent,
        shouldShow: spent > 0 || !filters.dateRange,
      };
    })
    .filter(
      (budget) =>
        !filters.category ||
        budget.category.toLowerCase() === filters.category.toLowerCase()
    );

  // Utiliser filteredBudgets pour les statistiques
  const { currentExpenses, previousExpenses, expensesTrend } = useStatistics(
    filteredTransactions,
    filteredBudgets,
    filteredTransactions,
    hasDataForPeriod,
    filters.dateRange
  );

  // Calculer le budget total à partir des budgets filtrés
  const totalBudget = filteredBudgets.reduce(
    (sum, budget) => sum + budget.limit,
    0
  );

  const budgetStats = [
    {
      title: t("budget.statistics.monthlyExpenses"),
      value: formatCurrency(currentExpenses),
      icon: "trending_down",
      trend: { value: expensesTrend, isPositive: expensesTrend <= 0 },
    },
    {
      title: t("budget.statistics.previousMonth"),
      value: formatCurrency(previousExpenses),
      icon: "calendar_today",
      trend: { value: 0, isPositive: true },
    },
    {
      title: t("budget.statistics.totalBudget"),
      value: formatCurrency(totalBudget), // Utiliser le budget total filtré
      icon: "account_balance",
      trend: { value: 0, isPositive: true },
    },
  ];

  // Handlers
  const handleCreateBudget = async (budgetData: BudgetData) => {
    try {
      if (selectedBudget?.id) {
        await updateBudget(
          selectedBudget.id,
          budgetData as Omit<Budget, "id" | "spent">
        );
      } else {
        await createBudget(budgetData as Omit<Budget, "id" | "spent">);
      }
      setIsModalOpen(false);
      setSelectedBudget(undefined);
    } catch (err) {
      // L'erreur sera gérée dans le hook useBudget
    }
  };

  const handleBudgetClick = (budget: Budget) => {
    setSelectedBudget({
      id: budget.id,
      category: budget.category,
      limit: budget.limit,
      icon: budget.icon,
    });
    setIsModalOpen(true);
  };

  const handleDeleteBudget = async (id: string) => {
    if (window.confirm(t("budget.confirmDelete"))) {
      try {
        await deleteBudget(id);
      } catch (err) {
        // L'erreur sera gérée dans le hook useBudget
      }
    }
  };

  const handleAddTransaction = () => {
    showError("errors.default");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{t("budget.title")}</h1>
        </div>
        <DashboardFilters />
        <BudgetSkeleton />
      </div>
    );
  }
  if (error)
    return (
      <div className="text-white">
        {t("common.error")}: {error}
      </div>
    );

  const expenseData = filteredBudgets.map((budget) => ({
    category: budget.category,
    amount: budget.spent || 0,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{t("budget.title")}</h1>
        <button
          onClick={() => {
            setSelectedBudget(undefined);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {t("budget.new")}
        </button>
      </div>

      <DashboardFilters />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {budgetStats.map((stat) => (
          <StatisticsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {hasDataForPeriod ? (
          <>
            {filteredBudgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                {...budget}
                onDelete={() => handleDeleteBudget(budget.id)}
                onAddTransaction={handleAddTransaction}
                onClick={() => handleBudgetClick(budget)}
                variant="editable"
              />
            ))}
            <AddCard
              onClick={() => {
                setSelectedBudget(undefined);
                setIsModalOpen(true);
              }}
              label={t("budget.new")}
            />
          </>
        ) : (
          <div className="col-span-2 p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="py-4 text-center text-gray-400">
              {t("dashboard.noData")}
            </div>
          </div>
        )}
      </div>

      {hasDataForPeriod && <ExpenseChart data={expenseData} />}

      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBudget(undefined);
        }}
        onSubmit={handleCreateBudget}
        budget={selectedBudget}
      />
    </div>
  );
};

export default Budget;
