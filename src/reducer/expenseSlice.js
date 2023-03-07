import { getExpenseDataAction } from "./asyncExpenseReducer";
const { createSlice } = require("@reduxjs/toolkit");

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenseList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpenseDataAction.fulfilled, (state, action) => {
      const getExpenseData = action.payload;
      
      const expenseArr = [];
      for (const key in getExpenseData) {
        const newExpense = getExpenseData[key];
        expenseArr.push({
          id: newExpense.id,
          expenseTitle: newExpense.expenseTitle,
          expenseAmount: newExpense.expenseAmount,
          expenseDescription: newExpense.expenseDescription,
          expenseDate: newExpense.expenseDate,
          key: key,
        });
      }
      console.log("expense array in slice", expenseArr);
      state.expenseList = expenseArr;
    });
  },
});

export default expenseSlice;
export const expenseAction = expenseSlice.actions;
