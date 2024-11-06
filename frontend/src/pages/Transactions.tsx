import React, { useState } from "react";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import TransactionsList from "../components/dashboard/TransactionsList";
import TransactionModal from "../components/modals/TransactionModal";
import { useFilters } from "../contexts/FilterContext";
import { useTransaction } from "../hooks/useTransaction";
import { isDateInRange } from "../lib/dateUtils";
import { formatCurrency } from "../lib/utils";
import { Transaction } from "../types/Transaction";

const Transactions: React.FC = () => {
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
  } = useTransaction();

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
      console.error("Erreur lors de la gestion de la transaction:", error);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (transaction: Transaction) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette transaction ?")
    ) {
      try {
        await deleteTransaction(transaction.id);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
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

  const getFilteredAmount = (
    type: "expense" | "income",
    dateRange?: string
  ) => {
    return transactions
      .filter((t) => t.type === type && isDateInRange(t.date, dateRange))
      .reduce((acc, t) => acc + t.amount, 0);
  };

  const currentMonthExpenses = getFilteredAmount("expense", "this-month");
  const lastMonthExpenses = getFilteredAmount("expense", "last-month");
  const currentMonthIncome = getFilteredAmount("income", "this-month");
  const lastMonthIncome = getFilteredAmount("income", "last-month");

  const currentBalance = currentMonthIncome - currentMonthExpenses;
  const lastBalance = lastMonthIncome - lastMonthExpenses;

  const statistics = [
    {
      title: "Dépenses du mois",
      value: formatCurrency(
        filteredTransactions.length > 0 ? currentMonthExpenses : 0
      ),
      icon: "trending_down",
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Total des revenus",
      value: formatCurrency(
        filteredTransactions.length > 0 ? currentMonthIncome : 0
      ),
      icon: "trending_up",
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Solde",
      value: formatCurrency(
        filteredTransactions.length > 0 ? currentBalance : 0
      ),
      icon: "account_balance",
      trend: { value: 0, isPositive: true },
    },
  ];

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

      <DashboardFilters />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {statistics.map((stat) => (
          <StatisticsCard key={stat.title} {...stat} />
        ))}
      </div>

      {filteredTransactions.length > 0 ? (
        <TransactionsList
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="py-4 text-center text-gray-400">
            Aucune donnée disponible pour la période sélectionnée
          </div>
        </div>
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
