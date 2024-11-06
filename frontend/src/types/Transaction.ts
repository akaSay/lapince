export type TransactionType = "expense" | "income";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date | string;
  category: string;
  type: TransactionType;
  categoryIcon?: string;
}
