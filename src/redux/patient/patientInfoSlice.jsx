import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privatePost } from "../../services/apiCaller";

export const getPatientInfo = createAsyncThunk(
  "patients/getPatientInfo",
  async ({ token, phone }, { rejectWithValue }) => {
    try {
      const response = await privatePost("/doctors/patient-info", token, {phone});
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "An unexpected error occurred" }
      );
    }
  }
);

const initialState = {
  patientInfo: null,
  isLoading: false,
  error: null,
  success: false,
  message: "",
};

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    resetPatientsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPatientInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.message = "";
      })
      .addCase(getPatientInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.patientInfo = action.payload.data || action.payload;
        state.success = true;
        state.message =
          action.payload.message || "Patient info retrieved successfully";
      })
      .addCase(getPatientInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
        state.message =
          action.payload?.message || "Failed to retrieve patient info";
        state.patientInfo = null;
      });
  },
});

export const { resetPatientsState } = patientsSlice.actions;
export default patientsSlice.reducer;