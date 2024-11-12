import { useEffect, useState } from "react";
import api from "../lib/api";
import { Transaction } from "../types/Transaction";
import { useToast } from "./useToast";

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { success, error: showError } = useToast();

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      const transactionsData = response.data.data || [];
      setTransactions(transactionsData);
    } catch (error) {
      showError("errors.transaction.fetch");
      setTransactions([]);
    }
  };

  const createTransaction = async (data: Omit<Transaction, "id">) => {
    try {
      const response = await api.post("/transactions", data);
      const newTransaction = response.data;
      await fetchTransactions();
      success("success.transaction.create");
      return newTransaction;
    } catch (error) {
      showError("errors.transaction.create");
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
      success("success.transaction.update");
      return updatedTransaction;
    } catch (error) {
      showError("errors.transaction.update");
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      success("success.transaction.delete");
    } catch (error) {
      showError("errors.transaction.delete");
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
