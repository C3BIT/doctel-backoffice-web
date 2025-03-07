import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicPost } from '../../services/apiCaller';
export const verifyOtp = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/patient/login", data); // Replace with your API endpoint
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    user: {},
    error: false,
    errorMessage: "",
    phone: "", 
  },
  reducers: {
    savePhone: (state, action) => {
      state.phone = action.payload;
      localStorage.setItem("phone", action.payload); 
    },
    clearPhone: (state) => {
      state.phone = "";
      localStorage.removeItem("phone");
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = {};
      state.token = "";
      state.error = false;
      state.errorMessage = "";
      localStorage.removeItem("phone"); // Clear phone on logout
    },
    errorClean: (state) => {
      state.error = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyOtp.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.errorMessage = "";
      state.token = action.payload.token;
      localStorage.removeItem("phone");
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload?.data?.message || "OTP verification failed";
    });
  },
});

export const { savePhone, clearPhone, login, logout, errorClean } = authSlice.actions;
export default authSlice.reducer;