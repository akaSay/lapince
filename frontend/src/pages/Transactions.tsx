import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import TransactionsList from "../components/dashboard/TransactionsList";
import TransactionModal from "../components/modals/TransactionModal";
import StatisticsSkeleton from "../components/skeletons/StatisticsSkeleton";
import TransactionSkeleton from "../components/skeletons/TransactionSkeleton";
import { useFilters } from "../contexts/FilterContext";
import { useBudget } from "../hooks/useBudget";
import { useStatistics } from "../hooks/useStatistics";
import { useTransaction } from "../hooks/useTransaction";
import { isDateInRange } from "../lib/dateUtils";
import { formatCurrency } from "../lib/utils";
import { Transaction } from "../types/Transaction";

const Transactions: React.FC = () => {
  const { t } = useTranslation();
  const { filters } = useFilters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();

  const {
    transactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    loading,
  } = useTransaction();

  const { budgets } = useBudget();

  const handleTransactionSubmit = async (
    transactionData: Omit<Transaction, "id">
  ) => {
    try {
      if (selectedTransaction) {
        await updateTransaction(selectedTransaction.id, transactionData);
      } else {
        await createTransaction(transactionData);
      }
      setIsModalOpen(false);
      setSelectedTransaction(undefined);
    } catch (error) {
      // L'erreur est déjà gérée dans le hook
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (transaction: Transaction) => {
    if (window.confirm(t("transactions.confirmDelete"))) {
      try {
        await deleteTransaction(transaction.id);
      } catch (error) {
        // L'erreur est déjà gérée dans le hook
      }
    }
  };

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

  const {
    currentExpenses,
    currentIncome,
    expensesTrend,
    incomeTrend,
    balanceTrend,
  } = useStatistics(
    transactions,
    budgets,
    filteredTransactions,
    hasDataForPeriod,
    filters.dateRange
  );

  const balance = currentIncome - currentExpenses;

  const statistics = [
    {
      title: t("transactions.statistics.monthlyExpenses"),
      value: formatCurrency(currentExpenses),
      icon: "trending_down",
      trend: {
        value: Number(expensesTrend.toFixed(1)),
        isPositive: expensesTrend <= 0,
      },
    },
    {
      title: t("transactions.statistics.totalIncome"),
      value: formatCurrency(currentIncome),
      icon: "trending_up",
      trend: {
        value: Number(incomeTrend.toFixed(1)),
        isPositive: incomeTrend >= 0,
      },
    },
    {
      title: t("transactions.statistics.balance"),
      value: formatCurrency(balance),
      icon: "account_balance",
      trend: {
        value: Number(balanceTrend.toFixed(1)),
        isPositive: balanceTrend >= 0,
      },
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            {t("transactions.title")}
          </h1>
        </div>
        <DashboardFilters />
        <StatisticsSkeleton />
        <TransactionSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-white">
          {t("transactions.title")}
        </h1>
      </div>

      <DashboardFilters />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {statistics.map((stat) => (
          <StatisticsCard key={stat.title} {...stat} />
        ))}
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="p-6 text-center text-gray-400 bg-gray-800 rounded-lg">
          {t("transactions.noTransactions")}
        </div>
      ) : (
        <TransactionsList
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

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
