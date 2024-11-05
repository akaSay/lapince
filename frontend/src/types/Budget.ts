interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: "monthly" | "yearly";
}

export default Budget;
