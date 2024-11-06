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
    const searchTerms = searchLower.split(" ").filter((t) => t.length > 0);

    // Recherche dans les transactions
    const filteredTransactions = allTransactions.filter((transaction) => {
      const descriptionLower = transaction.description.toLowerCase();
      const categoryLower = transaction.category.toLowerCase();

      return searchTerms.every(
        (term) =>
          descriptionLower.includes(term) || categoryLower.includes(term)
      );
    });

    // Recherche dans les budgets
    const filteredBudgets = allBudgets.filter((budget) => {
      const categoryLower = budget.category.toLowerCase();
      return searchTerms.every((term) => categoryLower.includes(term));
    });

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
