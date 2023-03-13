import { createAsyncThunk } from "@reduxjs/toolkit";
import { expenseApiService } from "../services/expenseApiServices";


export const addExpenseDataAction = createAsyncThunk(
    "addExpenseDataAction",
    async (data) => {
        const response = await expenseApiService.addExpenseData(data);
        return response;
    }
);

export const getExpenseDataAction = createAsyncThunk(
    "getExpenseDataAction",
    async(localId) => {
        console.log("localId at 2",localId)
        const response = await expenseApiService.getExpenseData(localId);
        console.log("response in getexpensedataAction",response)
        return response;
    }
)

export const deleteExepnseDataAction = createAsyncThunk(
    "deleteExepnseDataAction",
    async(data) => {
        console.log(" 2 key at delete expense action",data)
        const response = await expenseApiService.deleteExepnseData(data);
        return response;
    }
)

export const updateExpenseDataAction = createAsyncThunk(
    "updateExpenseDataAction",
    async(updatedData) => {
        const response = await expenseApiService.updateExpenseData(updatedData);
        console.log("5, updated Data in async reducer", response)
        return response;
    }
)