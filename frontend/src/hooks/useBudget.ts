import { useEffect, useState } from "react";
import api from "../lib/api";
import { Budget } from "../types/Budget";
import { useToast } from "./useToast";

export interface UseBudgetReturn {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
  createBudget: (data: Omit<Budget, "id" | "spent">) => Promise<Budget>;
  updateBudget: (
    id: string,
    data: Omit<Budget, "id" | "spent">
  ) => Promise<Budget>;
  deleteBudget: (id: string) => Promise<void>;
  fetchBudgets: () => Promise<void>;
}

export const useBudget = (): UseBudgetReturn => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { success, error: showError } = useToast();

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<Budget[]>("/budgets");
      setBudgets(response.data);
    } catch (err) {
      setError("errors.budget.fetch");
      showError("errors.budget.fetch");
    } finally {
      setLoading(false);
    }
  };

  const createBudget = async (budgetData: Omit<Budget, "id" | "spent">) => {
    try {
      setLoading(true);
      const response = await api.post("/budgets", budgetData);
      setBudgets((prev) => [...prev, response.data]);
      success("success.budget.create");
      return response.data;
    } catch (err) {
      showError("errors.budget.create");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBudget = async (
    id: string,
    budgetData: Omit<Budget, "id" | "spent">
  ) => {
    try {
      setLoading(true);
      const response = await api.put(`/budgets/${id}`, budgetData);
      setBudgets((prev) =>
        prev.map((budget) => (budget.id === id ? response.data : budget))
      );
      success("success.budget.update");
      return response.data;
    } catch (err) {
      showError("errors.budget.update");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBudget = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/budgets/${id}`);
      setBudgets((prev) => prev.filter((budget) => budget.id !== id));
      success("success.budget.delete");
    } catch (err) {
      showError("errors.budget.delete");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    budgets,
    loading,
    error,
    createBudget,
    updateBudget,
    deleteBudget,
    fetchBudgets,
  };
};
