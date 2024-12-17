import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../lib/apiRequest";

const initialState = {
  employees: {
    data: [],
    employee: null,
    error: null,
    loading: false,
  },
  absentEmployees: {
    data: [],
    error: null,
    loading: false,
  },
  employeeStats: {
    data: null,
    error: null,
    loading: false,
  },
  absentEmployeesLast7Days: {
    data: null,
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
  async ({ page, limit, ...filterQuery }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filterQuery,
      }).toString();

      console.log("🚀 ~ queryParams:", queryParams);

      const response = await apiRequest().get(`/employee?${queryParams}`);
      console.log("🚀 ~ response:", response);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Fetching employees failed. Please try again."
      );
    }
  }
);

// export const fetchEmployees = createAsyncThunk(
//   "employee/fetchAll",
//   async ({ page, limit, ...filterQuery }, { rejectWithValue }) => {
//     try {
//       // Ensure all filterQuery values are correctly stringified (arrays, objects, etc.)
//       const sanitizedFilterQuery = Object.fromEntries(
//         Object.entries(filterQuery).map(([key, value]) => {
//           if (Array.isArray(value)) {
//             return [key, JSON.stringify(value)]; // If it's an array, stringify it
//           }
//           return [key, value]; // Otherwise, use the value as is
//         })
//       );

//       const queryParams = new URLSearchParams({
//         page,
//         limit,
//         ...sanitizedFilterQuery,
//       }).toString();

//       console.log("🚀 ~ queryParams:", queryParams);

//       const response = await apiRequest().get(`/employee?${queryParams}`);
//       console.log("🚀 ~ response:", response);

//       return response.data;
//     } catch (error) {
//       console.error("🚀 ~ error:", error);

//       // Provide a fallback error message in case of missing response or server error
//       return rejectWithValue(
//         error.response?.data?.message ||
//           error.message ||
//           "Fetching employees failed. Please try again."
//       );
//     }
//   }
// );

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
      const response = await apiRequest().delete(`/employee/${id}`);
      console.log("🚀 ~ response:", response);
      return response;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Deleting employee failed. Please try again."
      );
    }
  }
);

//fetch absent employees
export const fetchAbsentEmployees = createAsyncThunk(
  "employee/AbsentEmployees",
  async ({ page, limit }, { rejectWithValue }) => {
    console.log("🚀 ~ page, limit:", page, limit);
    try {
      const response = await apiRequest().get(
        `/employee/getAbsentEmployees?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "getting absent employees failed. Please try again."
      );
    }
  }
);

//fetch employee stats
export const fetchEmployeeStats = createAsyncThunk(
  "employee/EmployeeStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest().get(`/employee/getEmployeeStats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "getting employee stats failed. Please try again."
      );
    }
  }
);

//fetch absent employees last 7 days
export const fetchAbsentEmployeesLast7Days = createAsyncThunk(
  "employee/AbsentEmployeesLast7Days",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest().get(
        `/employee/getAbsentEmployeesLast7Days`
      );
      console.log("🚀 ~response:", response);

      return response.data.absentData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "getting absent employee of last 7 days failed. Please try again."
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
        //state.employees.data.push(action.payload);
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
      .addCase(updateEmployee.fulfilled, (state) => {
        state.employeesActions.update.loading = false;
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
        // state.employees.data = state.employees.data.filter(
        //   (employee) => employee._id !== action.payload
        // );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.employeesActions.delete.loading = false;
        state.employeesActions.delete.error = action.payload;
      })

      //get absent employees
      .addCase(fetchAbsentEmployees.pending, (state) => {
        state.absentEmployees.loading = true;
        state.absentEmployees.error = null;
      })
      .addCase(fetchAbsentEmployees.fulfilled, (state, action) => {
        state.absentEmployees.loading = false;
        state.absentEmployees.data = action.payload;
      })
      .addCase(fetchAbsentEmployees.rejected, (state, action) => {
        state.absentEmployees.loading = false;
        state.absentEmployees.error = action.payload;
      })

      //get employee stats
      .addCase(fetchEmployeeStats.pending, (state) => {
        state.employeeStats.loading = true;
        state.employeeStats.error = null;
      })
      .addCase(fetchEmployeeStats.fulfilled, (state, action) => {
        state.employeeStats.loading = false;
        state.employeeStats.data = action.payload;
      })
      .addCase(fetchEmployeeStats.rejected, (state, action) => {
        state.employeeStats.loading = false;
        state.employeeStats.error = action.payload;
      })
      //get absent employees last 7 days
      .addCase(fetchAbsentEmployeesLast7Days.pending, (state) => {
        state.absentEmployeesLast7Days.loading = true;
        state.absentEmployeesLast7Days.error = null;
      })
      .addCase(fetchAbsentEmployeesLast7Days.fulfilled, (state, action) => {
        state.absentEmployeesLast7Days.loading = false;
        state.absentEmployeesLast7Days.data = action.payload;
      })
      .addCase(fetchAbsentEmployeesLast7Days.rejected, (state, action) => {
        state.absentEmployeesLast7Days.loading = false;
        state.absentEmployeesLast7Days.error = action.payload;
      });
  },
});

export const { clearErrors } = employeeSlice.actions;
export default employeeSlice.reducer;
