import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../lib/apiRequest";

const initialState = {
  employees: {
    data: [],
    employee: null,
    error: null,
    loading: false,
  },
  employeesActions: {
    fetchAll: {
      data: [],
      error: null,
      loading: false,
    },
    fetchById: {
      data: null,
      error: null,
      loading: false,
    },
    create: {
      data: null,
      error: null,
      loading: false,
    },
    update: {
      data: null,
      error: null,
      loading: false,
    },
    delete: {
      data: null,
      error: null,
      loading: false,
    },
  },
};

// Fetch all employees
export const fetchEmployees = createAsyncThunk(
  "employee/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      console.log("first");
      const response = await apiRequest().get(`/employee`);
      console.log("🚀 ~ response:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Fetching employees failed. Please try again."
      );
    }
  }
);

// Fetch an employee by ID
export const fetchEmployeeById = createAsyncThunk(
  "employee/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiRequest().get(`/employee/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Fetching employee by ID failed. Please try again."
      );
    }
  }
);

// Create an employee
export const addEmployee = createAsyncThunk(
  "employee/create",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await apiRequest().post(
        `/employee/addEmployee`,
        employeeData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Adding employee failed. Please try again."
      );
    }
  }
);

// Update an employee
export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, ...employeeData }, { rejectWithValue }) => {
    try {
      console.log("first here");
      const response = await apiRequest().put(`/employee/${id}`, employeeData);
      console.log("🚀 ~ response:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Updating employee failed. Please try again."
      );
    }
  }
);

// Delete an employee
export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest().delete(`/employee/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Deleting employee failed. Please try again."
      );
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    clearErrors(state) {
      state.employees.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.employeesActions.fetchAll.loading = true;
        state.employeesActions.fetchAll.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employeesActions.fetchAll.loading = false;
        state.employeesActions.fetchAll.data = action.payload;
        state.employees.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.employeesActions.fetchAll.loading = false;
        state.employeesActions.fetchAll.error = action.payload;
      })
      // Fetch Employee by ID
      .addCase(fetchEmployeeById.pending, (state) => {
        state.employeesActions.fetchById.loading = true;
        state.employeesActions.fetchById.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.employeesActions.fetchById.loading = false;
        state.employeesActions.fetchById.data = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.employeesActions.fetchById.loading = false;
        state.employeesActions.fetchById.error = action.payload;
      })
      // Create Employee
      .addCase(addEmployee.pending, (state) => {
        state.employeesActions.create.loading = true;
        state.employeesActions.create.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employeesActions.create.loading = false;
        state.employeesActions.create.data = action.payload;
        state.employees.data.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.employeesActions.create.loading = false;
        state.employeesActions.create.error = action.payload;
      })
      // Update Employee
      .addCase(updateEmployee.pending, (state) => {
        state.employeesActions.update.loading = true;
        state.employeesActions.update.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.employeesActions.update.loading = false;
        console.log("🚀 ~ updateEmployee.fulfilled ~ action", action);
        console.log(
          "🚀 ~ updateEmployee.fulfilled ~ action",
          state.employees.data
        );

        const index = state.employees.data.findIndex(
          (employee) => employee._id === action.payload._id
        );
        if (index !== -1) {
          state.employees.data[index] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.employeesActions.update.loading = false;
        state.employeesActions.update.error = action.payload;
      })
      // Delete Employee
      .addCase(deleteEmployee.pending, (state) => {
        state.employeesActions.delete.loading = true;
        state.employeesActions.delete.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employeesActions.delete.loading = false;
        state.employees.data = state.employees.data.filter(
          (employee) => employee._id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.employeesActions.delete.loading = false;
        state.employeesActions.delete.error = action.payload;
      });
  },
});

export const { clearErrors } = employeeSlice.actions;
export default employeeSlice.reducer;
