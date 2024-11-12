import { useEffect, useState } from "react";
import { Budget } from "../types/Budget";
import { Transaction } from "../types/Transaction";
import { removeAccents } from "../lib/utils";

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

    const searchNormalized = removeAccents(searchTerm.toLowerCase().trim());
    const searchTerms = searchNormalized.split(" ").filter((t) => t.length > 0);

    // Recherche dans les transactions avec gestion des accents
    const filteredTransactions = allTransactions.filter((transaction) => {
      const descriptionNormalized = removeAccents(
        transaction.description.toLowerCase()
      );
      const categoryNormalized = removeAccents(
        transaction.category.toLowerCase()
      );
      const amountString = transaction.amount.toString();

      return searchTerms.some(
        (term) =>
          descriptionNormalized.includes(term) ||
          categoryNormalized.includes(term) ||
          amountString.includes(term)
      );
    });

    // Recherche dans les budgets avec gestion des accents
    const filteredBudgets = allBudgets.filter((budget) => {
      const categoryNormalized = removeAccents(budget.category.toLowerCase());
      return searchTerms.some((term) => categoryNormalized.includes(term));
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
