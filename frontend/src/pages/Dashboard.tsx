import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddCard from "../components/common/AddCard";
import Modal from "../components/common/Modal";
import BudgetCard from "../components/dashboard/BudgetCard";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import TransactionsList from "../components/dashboard/TransactionsList";
import TransactionModal from "../components/modals/TransactionModal";
import BudgetSkeleton from "../components/skeletons/BudgetSkeleton";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";
import StatisticsSkeleton from "../components/skeletons/StatisticsSkeleton";
import TransactionSkeleton from "../components/skeletons/TransactionSkeleton";
import { useFilters } from "../contexts/FilterContext";
import { useBudget } from "../hooks/useBudget";
import { useStatistics } from "../hooks/useStatistics";
import { useTransaction } from "../hooks/useTransaction";
import api from "../lib/api";
import { isDateInRange } from "../lib/dateUtils";
import { formatCurrency } from "../lib/utils";
import { Transaction } from "../types/Transaction";

// Définir le type pour l'objectif d'épargne
type SavingsGoal = {
  current: number;
  target: number;
  month: string;
};

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { filters } = useFilters();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isBudgetDetailsModalOpen, setIsBudgetDetailsModalOpen] =
    useState(false);
  const [selectedBudgetTransactions, setSelectedBudgetTransactions] = useState<
    Transaction[]
  >([]);
  const [selectedBudgetName, setSelectedBudgetName] = useState("");
  const {
    budgets,
    deleteBudget,
    fetchBudgets,
    loading: budgetsLoading,
  } = useBudget();
  const {
    transactions,
    createTransaction,
    loading: transactionsLoading,
    deleteTransaction,
    updateTransaction,
  } = useTransaction();

  // Déplacer currentMonth en haut pour qu'il soit accessible partout
  const currentMonth = filters?.dateRange?.startsWith("month-")
    ? filters.dateRange
    : `month-${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1
      ).padStart(2, "0")}`;

  const [savingsGoal, setSavingsGoal] = useState<SavingsGoal>({
    current: 0,
    target: 1000,
    month: currentMonth,
  });

  // Charger l'objectif d'épargne depuis l'API
  useEffect(() => {
    const fetchSavingsGoal = async () => {
      try {
        const response = await api.get(`/savings-goals/${currentMonth}`);
        setSavingsGoal(response.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement de l'objectif d'épargne:",
          error
        );
      }
    };

    fetchSavingsGoal();
  }, [currentMonth]);

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

  const hasDataForPeriod = true;

  const {
    currentExpenses,
    previousExpenses,
    currentBalance,
    expensesTrend,
    balanceTrend,
  } = useStatistics(
    transactions,
    budgets,
    filteredTransactions,
    hasDataForPeriod,
    filters.dateRange
  );

  const dashboardStats = [
    {
      title: t("dashboard.statistics.monthlyExpenses"),
      value: formatCurrency(currentExpenses),
      icon: "trending_down",
      trend: {
        value: Number(expensesTrend.toFixed(1)),
        isPositive: expensesTrend <= 0,
      },
    },
    {
      title: t("dashboard.statistics.previousMonth"),
      value: formatCurrency(previousExpenses),
      icon: "calendar_today",
      trend: {
        value: 0,
        isPositive: true,
      },
    },
    {
      title: t("dashboard.statistics.currentBalance"),
      value: formatCurrency(currentBalance),
      icon: "account_balance",
      trend: {
        value: Number(balanceTrend.toFixed(1)),
        isPositive: balanceTrend >= 0,
      },
    },
  ];

  const budgetArray = Array.isArray(budgets) ? budgets : [];

  const filteredBudgets = budgetArray
    .map((budget) => {
      const budgetMonth = budget.month || filters.dateRange;

      const spent = filteredTransactions
        .filter(
          (t) =>
            t.category === budget.category &&
            t.type === "expense" &&
            budgetMonth === filters.dateRange
        )
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        ...budget,
        month: budgetMonth,
        spent,
        shouldShow: budgetMonth === filters.dateRange,
      };
    })
    .filter(
      (budget) =>
        budget.month === filters.dateRange &&
        budget.shouldShow &&
        (!filters.category ||
          budget.category.toLowerCase() === filters.category.toLowerCase())
    );

  const handleTransactionSubmit = async (
    transactionData: Omit<Transaction, "id">
  ) => {
    try {
      await createTransaction(transactionData);
      setIsTransactionModalOpen(false);
      await fetchBudgets();
    } catch (error) {}
  };

  const handleAddTransaction = (category: string) => {
    setSelectedCategory(category);
    setIsTransactionModalOpen(true);
  };

  const handleDeleteBudget = async (id: string) => {
    if (window.confirm(t("budget.confirmDelete"))) {
      try {
        await deleteBudget(id);
      } catch (error) {}
    }
  };

  const handleBudgetClick = (category: string) => {
    const budgetTransactions = filteredTransactions.filter(
      (t) => t.category === category
    );
    setSelectedBudgetTransactions(budgetTransactions);
    setSelectedBudgetName(t(`dashboard.filters.${category}`));
    setIsBudgetDetailsModalOpen(true);
  };

  const handleUpdateSavingsGoal = async (newTarget: number) => {
    try {
      const response = await api.patch(`/savings-goals/${savingsGoal.month}`, {
        target: newTarget,
      });
      setSavingsGoal(response.data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'objectif:", error);
    }
  };

  const handleUpdateCurrentSavings = async (newAmount: number) => {
    const savingsTransaction = {
      amount: newAmount,
      type: "expense",
      category: "savings",
      description: "Épargne",
      date: new Date(),
    };

    try {
      await createTransaction(savingsTransaction as Omit<Transaction, "id">);
      const response = await api.patch(`/savings-goals/${currentMonth}`, {
        current: savingsGoal.current + newAmount,
      });
      setSavingsGoal(response.data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'épargne:", error);
    }
  };

  const handleTransactionUpdate = async (transaction: Transaction) => {
    try {
      // Si c'est une transaction d'épargne, mettre à jour l'objectif d'épargne
      if (transaction.category === "savings") {
        const oldTransaction = transactions.find(
          (t) => t.id === transaction.id
        );
        const difference = transaction.amount - (oldTransaction?.amount || 0);

        // Appel API au lieu du localStorage
        try {
          const response = await api.patch(`/savings-goals/${currentMonth}`, {
            current: savingsGoal.current + difference,
          });
          setSavingsGoal(response.data);
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'épargne:", error);
        }
      }

      // Extraire les données nécessaires pour la mise à jour
      const { id, ...transactionData } = transaction;
      await updateTransaction(id, transactionData);
      setIsTransactionModalOpen(false);
      await fetchBudgets();
    } catch (error) {}
  };

  const handleTransactionDelete = async (transaction: Transaction) => {
    if (window.confirm(t("transactions.confirmDelete"))) {
      try {
        // Si c'est une transaction d'épargne, mettre à jour l'objectif d'épargne
        if (transaction.category === "savings") {
          // Appel API au lieu du localStorage
          try {
            const response = await api.patch(`/savings-goals/${currentMonth}`, {
              current: savingsGoal.current - transaction.amount,
            });
            setSavingsGoal(response.data);
          } catch (error) {
            console.error("Erreur lors de la mise à jour de l'épargne:", error);
          }
        }

        await deleteTransaction(transaction.id);
      } catch (error) {}
    }
  };

  const totalBudget = budgets.reduce(
    (total, budget) => total + budget.limit,
    0
  );
  const remainingBudget = totalBudget - currentExpenses;

  const totalSavings = transactions
    .filter((t) => {
      if (t.category !== "savings") return false;

      return isDateInRange(t.date, filters.dateRange);
    })
    .reduce((sum, t) => sum + t.amount, 0);

  if (budgetsLoading || transactionsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            {t("dashboard.title")}
          </h1>
        </div>
        <DashboardFilters />
        <StatisticsSkeleton />
        <BudgetSkeleton />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartSkeleton />
          <TransactionSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          {t("dashboard.title")}
        </h1>
        <button
          onClick={() => {
            setSelectedTransaction(undefined);
            setIsTransactionModalOpen(true);
          }}
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {t("dashboard.newTransaction")}
        </button>
      </div>

      <DashboardFilters />

      <DashboardStats
        savingsGoal={{
          current: savingsGoal.current,
          target: savingsGoal.target,
        }}
        monthlyBudget={{
          total: totalBudget,
          remaining: remainingBudget,
        }}
        savings={{
          amount: totalSavings,
          progress: (savingsGoal.current / savingsGoal.target) * 100,
        }}
        onUpdateSavingsGoal={handleUpdateSavingsGoal}
        onUpdateCurrentSavings={handleUpdateCurrentSavings}
      />

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
                onDelete={() => handleDeleteBudget(budget.id!)}
                onAddTransaction={handleAddTransaction}
                onClick={() => handleBudgetClick(budget.category)}
                variant="default"
              />
            ))}
            <AddCard
              onClick={() => {
                setSelectedTransaction(undefined);
                setIsTransactionModalOpen(true);
              }}
              label={t("dashboard.newTransaction")}
            />
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
              onEdit={handleTransactionUpdate}
              onDelete={handleTransactionDelete}
              variant="compact"
            />
          </div>
        </>
      ) : (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="py-4 text-center text-gray-400">
            {t("dashboard.noData")}
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

      <Modal
        isOpen={isBudgetDetailsModalOpen}
        onClose={() => setIsBudgetDetailsModalOpen(false)}
        title={`Transactions - ${selectedBudgetName}`}
      >
        <TransactionsList
          transactions={selectedBudgetTransactions}
          variant="compact"
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
