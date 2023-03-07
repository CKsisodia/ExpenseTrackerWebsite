import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducer/authSlice";
import expenseSlice from "../reducer/expenseSlice";

const store = configureStore({
  reducer: { expense: expenseSlice.reducer, user:authSlice.reducer },
});

export default store;
