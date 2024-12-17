import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../lib/apiRequest";

// Async Thunk to fetch all employees' salaries based on month and year
export const getAllEmployeesSalary = createAsyncThunk(
  "salary/getAllEmployeesSalary",
  async (filters = {}, { rejectWithValue }) => {
    try {
      // Construct query string from filters
      const params = new URLSearchParams(filters).toString();
      console.log("🚀 ~ params:", params);

      // Send GET request with query parameters
      const response = await apiRequest().get(
        `/salary/salary-all-emp?${params}`
      );

      console.log("🚀 ~ response ~ response:", response.data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching all emp salary."
      );
    }
  }
);

const salarySlice = createSlice({
  name: "salary",
  initialState: {
    allSalary: {
      data: {},
      loading: false,
      error: null,
    },
    salaryOfEmployee: {
      data: null,
      loading: false,
      error: null,
    },
  },
  reducers: {
    // Reducer to clear errors
    clearErrors: (state) => {
      state.allSalary.error = null;
      state.salaryOfEmployee.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling the getAllEmployeesSalary thunk actions
      .addCase(getAllEmployeesSalary.pending, (state) => {
        state.allSalary.loading = true;
        state.allSalary.error = null;
      })
      .addCase(getAllEmployeesSalary.fulfilled, (state, action) => {
        state.allSalary.loading = false;
        console.log("🚀 ~ .addCase ~ action.payload:", action.payload);
        state.allSalary.data = action.payload;
      })
      .addCase(getAllEmployeesSalary.rejected, (state, action) => {
        state.allSalary.loading = false;
        state.allSalary.error = action.error.message;
      });
  },
});

export const { clearErrors } = salarySlice.actions;

export const selectAllSalary = (state) => state.salary.allSalary;

export default salarySlice.reducer;
