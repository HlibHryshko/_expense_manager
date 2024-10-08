import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Expense {
  name: string;
  totalAmount: number;
}

interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
  expenses: [],
  loading: false,
  error: null,
};

// Thunk to fetch categories and their expenses for a given time frame
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (timeFrame: { startDate: string; endDate: string }) => {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(
      `http://localhost:5000/api/categories/expenses`,
      {
        params: timeFrame,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);

    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch expenses";
      });
  },
});

export default categoriesSlice.reducer;
