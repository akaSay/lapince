export interface BudgetData {
  category: string;
  limit: number;
  icon: string;
}

export interface Budget extends BudgetData {
  id?: string;
  spent?: number;
  period: string;
  startDate: Date;
  month: string;
  status: string;
}
