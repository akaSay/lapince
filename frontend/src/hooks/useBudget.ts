import { useEffect, useState } from "react";
import api from "../lib/api";
import { Budget } from "../types/Budget";
import { useToast } from "./useToast";

interface UseBudgetReturn {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
  createBudget: (budgetData: Omit<Budget, "id" | "spent">) => Promise<Budget>;
  updateBudget: (
    id: string,
    budgetData: Omit<Budget, "id" | "spent">
  ) => Promise<Budget>;
  deleteBudget: (id: string) => Promise<void>;
  fetchBudgets: () => Promise<void>;
}

export const useBudget = (): UseBudgetReturn => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { success, error: showError } = useToast();

  const fetchBudgets = async () => {
    try {
      setLoading(true);
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
      const response = await api.post("/budgets", budgetData);
      setBudgets((prev) => [...prev, response.data]);
      success("success.budget.create");
      return response.data;
    } catch (err) {
      showError("errors.budget.create");
      throw err;
    }
  };

  const updateBudget = async (
    id: string,
    budgetData: Omit<Budget, "id" | "spent">
  ) => {
    try {
      const response = await api.put(`/budgets/${id}`, budgetData);
      setBudgets((prev) =>
        prev.map((budget) => (budget.id === id ? response.data : budget))
      );
      success("success.budget.update");
      return response.data;
    } catch (err) {
      showError("errors.budget.update");
      throw err;
    }
  };

  const deleteBudget = async (id: string) => {
    try {
      await api.delete(`/budgets/${id}`);
      setBudgets((prev) => prev.filter((budget) => budget.id !== id));
      success("success.budget.delete");
    } catch (err) {
      showError("errors.budget.delete");
      throw err;
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

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
