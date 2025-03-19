import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicPost, privatePutFile } from '../../services/apiCaller';

// Async thunk for sending OTP
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (phone, { rejectWithValue }) => {
    try {
      console.log("phone", phone);
      const response = await publicPost("/otp/send", { phone });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      console.log("token",token);
      console.log("data",data);
      const response = await privatePutFile("/doctors/profile/update", token, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// Async thunk for patient login
export const createPatientLogin = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/doctors/login", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    user: {},
    error: false,
    errorMessage: "",
    phone: "",
    success: false,
    updatedUser: false,
    token: "",
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
      state.phone = "";
      state.success = false;
      localStorage.removeItem("phone");
    },
    errorClean: (state) => {
      state.error = false;
      state.errorMessage = "";
      state.updatedUser = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPatientLogin.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(createPatientLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.errorMessage = "";
      state.token = action.payload.token;
      localStorage.removeItem("phone");
    });
    builder.addCase(createPatientLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload?.data?.message || "OTP verification failed";
    });

    // sendOtp cases
    builder.addCase(sendOtp.pending, (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = false;
      state.errorMessage = "";
    });
    builder.addCase(sendOtp.fulfilled, (state) => {
      state.isLoading = false;
      state.success = true;
      state.error = false;
      state.errorMessage = "";
    });
    builder.addCase(sendOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = true;
      state.errorMessage = action.payload?.data?.message || "Failed to send OTP";
    });

    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.updatedUser = true;
      state.user = {
        ...state.user, // Keep existing user data
        ...action.payload.user, // Merge updated user data
      };
      state.errorMessage = "";
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload?.data?.message || "Failed to update profile";
    });
  },
});

export const { savePhone, clearPhone, login, logout, errorClean } = authSlice.actions;
export default authSlice.reducer;