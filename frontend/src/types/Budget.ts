export type Budget = {
  id?: string;
  category: string;
  limit: number;
  spent?: number;
  period: "monthly" | "yearly";
  startDate: Date;
  month: string;
  status: string;
  icon: string;
};

// Type pour la création d'un nouveau budget
export type CreateBudgetInput = Omit<Budget, "id" | "spent">;
