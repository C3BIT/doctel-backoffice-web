import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {privatePostFile } from "../../services/apiCaller";

export const createPrescription = createAsyncThunk(
    "prescriptions/createPrescription",
    async ({ token, formData }, { rejectWithValue }) => {
      try {
        const response = await privatePostFile("/doctors/upload/prescription", token, formData);
        return response.data;
      } catch (err) {
        return rejectWithValue(
          err.response?.data || { message: "An unexpected error occurred" }
        );
      }
    }
  );

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  message: "",
  prescriptionsCreated: false,
  data: null,
};

export const prescriptionsSlice = createSlice({
  name: "prescriptions",
  initialState,
  reducers: {
    resetPrescriptionsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPrescription.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.message = "";
      })
      .addCase(createPrescription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.prescriptionsCreated = true;
        state.success = true;
        state.message =
          action.payload.message || "Prescription created successfully";
        state.data = action.payload;
      })
      .addCase(createPrescription.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
        state.message =
          action.payload?.message || "Failed to create prescription";
      });
  },
});

export const { resetPrescriptionsState } = prescriptionsSlice.actions;
export default prescriptionsSlice.reducer;
