import { useEffect, useState } from "react";
import api from "../lib/api";
import { Budget } from "../types/Budget";

interface UseBudgetReturn {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
  createBudget: (budgetData: Omit<Budget, "id" | "spent">) => Promise<void>;
  updateBudget: (
    id: string,
    budgetData: Omit<Budget, "id" | "spent">
  ) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  fetchBudgets: () => Promise<void>;
}

export const useBudget = (): UseBudgetReturn => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await api.get<Budget[]>("/budgets");
      setBudgets(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const createBudget = async (budgetData: Omit<Budget, "id" | "spent">) => {
    try {
      await api.post("/budgets", budgetData);
      await fetchBudgets();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la création"
      );
      throw err;
    }
  };

  const updateBudget = async (
    id: string,
    budgetData: Omit<Budget, "id" | "spent">
  ) => {
    try {
      await api.put(`/budgets/${id}`, budgetData);
      await fetchBudgets();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la mise à jour"
      );
      throw err;
    }
  };

  const deleteBudget = async (id: string) => {
    try {
      await api.delete(`/budgets/${id}`);
      await fetchBudgets();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la suppression"
      );
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
