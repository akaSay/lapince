import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Budget } from "../types/Budget";

interface BudgetState {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
}

const initialState: BudgetState = {
  budgets: [],
  loading: false,
  error: null,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgets: (state, action: PayloadAction<Budget[]>) => {
      state.budgets = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setBudgets, setLoading, setError } = budgetSlice.actions;
export default budgetSlice.reducer;
