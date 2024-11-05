export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  type: TransactionType;
  categoryIcon?: string;
}
