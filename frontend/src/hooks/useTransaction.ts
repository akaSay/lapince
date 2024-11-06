import { useEffect, useState } from "react";
import api from "../lib/api";
import { Transaction } from "../types/Transaction";

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      const transactionsData = response.data.data || [];
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des transactions:", error);
      setTransactions([]);
    }
  };

  const createTransaction = async (data: Omit<Transaction, "id">) => {
    try {
      const response = await api.post("/transactions", data);
      const newTransaction = response.data;
      await fetchTransactions();
      return newTransaction;
    } catch (error) {
      console.error("Erreur lors de la création de la transaction:", error);
      throw error;
    }
  };

  const updateTransaction = async (id: string, data: Partial<Transaction>) => {
    try {
      const response = await api.put(`/transactions/${id}`, data);
      const updatedTransaction = response.data;
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? updatedTransaction : t))
      );
      return updatedTransaction;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la transaction:", error);
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la transaction:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    fetchTransactions,
  };
};
