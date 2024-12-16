export interface BudgetData {
  category: string;
  limit: number;
  icon: string;
}

export type Budget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: "monthly" | "yearly";
  startDate: Date;
  month: string;
  status: "active" | "inactive";
  icon: string;
};
