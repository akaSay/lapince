export interface BudgetData {
  category: string;
  limit: number;
  icon: string;
}

export interface Budget extends BudgetData {
  status: string;
  id: string;
  spent?: number;
}
