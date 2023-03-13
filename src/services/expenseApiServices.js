class ExpenseApiService {
  BASE_URL = "https://expense-tracker-1311-default-rtdb.firebaseio.com/";
  static getInstance() {
    return new ExpenseApiService();
  }

  addExpenseData = async (data) => {
    console.log("3, data of add expensedata", data);
    const localId = data.localId;
    const response = await fetch(
      this.BASE_URL + localId + "/expense_items.json",
      {
        method: "POST",
        body: JSON.stringify({
          expenseTitle: data.expenseTitle,
          expenseAmount: data.expenseAmount,
          expenseDescription: data.expenseDescription,
          expenseDate: data.expenseDate,
          id: data.id,
        }),
      }
    );
    if (response.ok) {
      const expenseItems = await response.json();
      console.log(expenseItems);
      return expenseItems;
    }
  };

  getExpenseData = async (localId) => {
    console.log("get expense data in api service", localId);

    const response = await fetch(
      this.BASE_URL + localId + "/expense_items.json",
      {
        method: "GET",
      }
    );
    console.log("get response API", response);
    if (response.ok) {
      const getData = await response.json();
      console.log("get data in API", getData);
      return getData;
    }
  };

  deleteExepnseData = async (data) => {
    console.log(" 3 key and local id at delete API", data);
    const localId = data.localId;
    const key = data.key;
    const response = await fetch(
      this.BASE_URL + localId + "/expense_items/" + key + ".json",
      {
        method: "DELETE",
      }
    );
  };

  updateExpenseData = async (updatedExpenseData) => {
    console.log("updatedExpense Data in API ", updatedExpenseData);

    const response = await fetch(
      `https://expense-tracker-1311-default-rtdb.firebaseio.com/${updatedExpenseData.localId}/expense_items/${updatedExpenseData.key}.json`,

      {
        method: "PATCH",
        body: JSON.stringify({
          expenseTitle: updatedExpenseData.expenseTitle,
          expenseAmount: updatedExpenseData.expenseAmount,
          expenseDescription: updatedExpenseData.expenseDescription,
          expenseDate: updatedExpenseData.expenseDate,
        }),
      }
    );

    if (response.ok) {
      const updatedFinalData = await response.json();
      console.log("Api firebase response for update data", updatedFinalData);
      return updatedFinalData;
    }
  };
}

export const expenseApiService = ExpenseApiService.getInstance();
