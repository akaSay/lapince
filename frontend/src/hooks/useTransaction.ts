import { useState, useEffect } from "react";
import { Transaction } from "../types/Transaction";
import api from "../lib/api";
import { useToast } from "./useToast";

export interface UseTransactionReturn {
  transactions: Transaction[];
  loading: boolean;
  createTransaction: (data: Omit<Transaction, "id">) => Promise<Transaction>;
  updateTransaction: (
    id: string,
    data: Omit<Transaction, "id">
  ) => Promise<Transaction>;
  deleteTransaction: (id: string) => Promise<void>;
  fetchTransactions: () => Promise<void>;
}

export const useTransaction = (): UseTransactionReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, error: showError } = useToast();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/transactions");
      const transactionsData = response.data.data || [];
      setTransactions(transactionsData);
    } catch (error) {
      showError("errors.transaction.fetch");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (data: Omit<Transaction, "id">) => {
    try {
      setLoading(true);
      const response = await api.post("/transactions", data);
      const newTransaction = response.data;
      await fetchTransactions();
      success("success.transaction.create");
      return newTransaction;
    } catch (error) {
      showError("errors.transaction.create");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTransaction = async (id: string, data: Partial<Transaction>) => {
    try {
      setLoading(true);
      const response = await api.put(`/transactions/${id}`, data);
      const updatedTransaction = response.data;
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? updatedTransaction : t))
      );
      success("success.transaction.update");
      return updatedTransaction;
    } catch (error) {
      showError("errors.transaction.update");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      success("success.transaction.delete");
    } catch (error) {
      showError("errors.transaction.delete");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    loading,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    fetchTransactions,
  };
};
