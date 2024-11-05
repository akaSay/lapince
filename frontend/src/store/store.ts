import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./budgetSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    budget: budgetReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
