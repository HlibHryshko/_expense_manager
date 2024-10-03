import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "../requestToken";

interface Category {
  _id: string;
  name: string;
  icon: string;
}

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

// Thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(`http://localhost:5000/api/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create a new category";
      });
  },
});

export default categoriesSlice.reducer;
