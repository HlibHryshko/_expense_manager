// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("authToken"), // Retrieve token if already logged in
  loading: false,
  error: null,
};

// Async thunk to handle user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      console.log(response);

      const { token }: { token: string } = response.data; // Assuming your backend returns a token
      localStorage.setItem("authToken", token); // Store token in localStorage
      return token;
    } catch (error) {
      return rejectWithValue(error || "Failed to login");
    }
  }
);

// Async thunk to handle user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { name, email, password }: RegisterCredentials,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      console.log(response);

      const { token }: { token: string } = response.data; // Assuming your backend returns a token
      localStorage.setItem("authToken", token); // Store token in localStorage
      return token;
    } catch (error) {
      return rejectWithValue(error || "Failed to register a user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("authToken"); // Remove token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Set the token on successful login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Set the token on successful login
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
