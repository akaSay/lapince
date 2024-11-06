import { useEffect, useState } from "react";
import { Budget } from "../types/Budget";
import { Transaction } from "../types/Transaction";

interface SearchResults {
  transactions: Transaction[];
  budgets: Budget[];
}

export const useSearch = (
  allTransactions: Transaction[],
  allBudgets: Budget[]
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResults>({
    transactions: [],
    budgets: [],
  });

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults({ transactions: [], budgets: [] });
      return;
    }

    const searchLower = searchTerm.toLowerCase();

    // Recherche dans les transactions
    const filteredTransactions = allTransactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchLower) ||
        transaction.category.toLowerCase().includes(searchLower)
    );

    // Recherche dans les budgets
    const filteredBudgets = allBudgets.filter((budget) =>
      budget.category.toLowerCase().includes(searchLower)
    );

    setResults({
      transactions: filteredTransactions,
      budgets: filteredBudgets,
    });
  }, [searchTerm, allTransactions, allBudgets]);

  return {
    searchTerm,
    setSearchTerm,
    results,
  };
};
