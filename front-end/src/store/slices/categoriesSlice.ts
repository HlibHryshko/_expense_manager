import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = "";

type Category = {
  _id: string;
  name: string;
  totalAmount: number;
};

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

// Thunk to create a new category
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData: { name: string; icon: string }) => {
    const response = await axios.post(
      "http://localhost:5000/api/categories", // Your API endpoint for creating categories
      categoryData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add authorization token
        },
      }
    );

    return response.data;
  }
);

// Thunk to fetch categories and their expenses for a given time frame
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (timeFrame: { startDate: string; endDate: string }) => {
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
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

export default categoriesSlice.reducer;
