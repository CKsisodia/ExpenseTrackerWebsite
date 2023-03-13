import { getExpenseDataAction } from "./asyncExpenseReducer";
const { createSlice } = require("@reduxjs/toolkit");

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenseList: [],
    editForm: false,
    toBeEditedExpenseData: undefined,
  },
  reducers: {
    editFormOpen(state, action) {
      state.editForm = true;
      const expenseItemData = action.payload;
      console.log("in expense slice ", expenseItemData);
      state.toBeEditedExpenseData = expenseItemData;
    },
    cancelEditForm(state, action) {
      state.editForm = false;
      state.toBeEditedExpenseData = undefined;
    },
  },
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
