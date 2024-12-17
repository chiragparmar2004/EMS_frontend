import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../lib/apiRequest";

const initialState = {
  leaves: {
    data: {},
    error: null,
    loading: false,
    monthlyStats: {
      totalLeaves: 0,
      approvedLeaves: 0,
    },
  },
  leaveActions: {
    fetchAll: {
      data: [],
      error: null,
      loading: false,
    },
    fetchByEmployee: {
      data: [],
      error: null,
      loading: false,
    },
    fetchById: {
      data: null,
      error: null,
      loading: false,
    },
    fetchMonthlyStats: {
      data: null,
      error: null,
      loading: false,
    },

    fetchPendingLeaves: {
      data: null,
      error: null,
      loading: false,
    },
    fetchLeaveByStatus: {
      data: null,
      error: null,
      loading: false,
    },
    create: {
      data: null,
      error: null,
      loading: false,
    },
    add: {
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
    updateStatus: {
      data: null,
      error: null,
      loading: false,
    },
  },
};

// Thunks
export const fetchAllLeaves = createAsyncThunk(
  "leave/fetchAll",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await apiRequest().get(
        `/leave/admin/all?page=${page}&limit=${limit}`
      );
      console.log("🚀 ~ response:", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching all leaves failed."
      );
    }
  }
);

export const updateLeaveStatus = createAsyncThunk(
  "leave/updateStatus",
  async ({ leaveId, status }, { rejectWithValue }) => {
    try {
      const response = await apiRequest().patch(
        `/leave/admin/status/${leaveId}`,
        {
          status,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Updating leave status failed."
      );
    }
  }
);

export const fetchLeavesByEmployee = createAsyncThunk(
  "leave/fetchByEmployee",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest().get(`/leave`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching leaves by employee failed."
      );
    }
  }
);

export const fetchLeaveById = createAsyncThunk(
  "leave/fetchById",
  async (leaveId, { rejectWithValue }) => {
    console.log("🚀 ~ leaveId:", leaveId);
    try {
      const response = await apiRequest().get(`/leave/${leaveId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching leave by ID failed."
      );
    }
  }
);

export const createLeave = createAsyncThunk(
  "leave/create",
  async (leaveData, { rejectWithValue }) => {
    try {
      const response = await apiRequest().post(`/leave/add`, leaveData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Creating leave failed."
      );
    }
  }
);

export const addLeaveAsAdmin = createAsyncThunk(
  "leave/add",
  async (leaveData, { rejectWithValue }) => {
    try {
      const response = await apiRequest().post(`/leave/admin/add`, leaveData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "adding  leave to employee failed  for failed."
      );
    }
  }
);

export const updateLeave = createAsyncThunk(
  "leave/update",
  async ({ leaveId, leaveData }, { rejectWithValue }) => {
    try {
      const response = await apiRequest().put(`/leave/${leaveId}`, leaveData);
      console.log("🚀 ~ response leave/update:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Updating leave failed."
      );
    }
  }
);

export const deleteLeave = createAsyncThunk(
  "leave/delete",
  async (leaveId, { rejectWithValue }) => {
    try {
      const response = await apiRequest().delete(`/leave/${leaveId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Deleting leave failed."
      );
    }
  }
);

export const fetchMonthlyStats = createAsyncThunk(
  "leave/fetchMonthlyStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest().get(`/leave/stats/monthly`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching monthly stats failed."
      );
    }
  }
);

export const fetchLeaveByStatus = createAsyncThunk(
  "leave/fetchLeaveByStatus",
  async ({ status, page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiRequest().get("/leave/leaveByStatus", {
        params: { status, page, limit },
      });
      console.log("🚀 ~ response ~ response:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching leaves by status failed."
      );
    }
  }
);
// Slice
const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    clearErrors(state) {
      state.leaves.error = null;
      Object.keys(state.leaveActions).forEach((actionKey) => {
        state.leaveActions[actionKey].error = null;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Leaves
      .addCase(fetchAllLeaves.pending, (state) => {
        state.leaveActions.fetchAll.loading = true;
      })
      .addCase(fetchAllLeaves.fulfilled, (state, action) => {
        state.leaveActions.fetchAll.loading = false;
        state.leaveActions.fetchAll.data = action.payload;
        state.leaveActions.fetchAll.error = null;

        // Add the new leave to the leaves data
        state.leaves.data.push(action.payload);
      })
      .addCase(fetchAllLeaves.rejected, (state, action) => {
        state.leaveActions.fetchAll.loading = false;
        state.leaveActions.fetchAll.error = action.payload;
      })

      // Fetch Leaves by Employee
      .addCase(fetchLeavesByEmployee.pending, (state) => {
        state.leaveActions.fetchByEmployee.loading = true;
      })
      .addCase(fetchLeavesByEmployee.fulfilled, (state, action) => {
        state.leaveActions.fetchByEmployee.loading = false;
        state.leaveActions.fetchByEmployee.data = action.payload;
        state.leaveActions.fetchByEmployee.error = null;

        console.log("🚀 ~ .chirag addCase ~ action.payload:", action.payload);
        // Add the new leave to the leaves data
        state.leaves.data = action.payload;
      })
      .addCase(fetchLeavesByEmployee.rejected, (state, action) => {
        state.leaveActions.fetchByEmployee.loading = false;
        state.leaveActions.fetchByEmployee.error = action.payload;
      })

      // Fetch Leave by ID
      .addCase(fetchLeaveById.pending, (state) => {
        state.leaveActions.fetchById.loading = true;
      })
      .addCase(fetchLeaveById.fulfilled, (state, action) => {
        state.leaveActions.fetchById.loading = false;
        state.leaveActions.fetchById.data = action.payload;
        state.leaveActions.fetchById.error = null;
      })
      .addCase(fetchLeaveById.rejected, (state, action) => {
        state.leaveActions.fetchById.loading = false;
        state.leaveActions.fetchById.error = action.payload;
      })

      // Create Leave
      .addCase(createLeave.pending, (state) => {
        state.leaveActions.create.loading = true;
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.leaveActions.create.loading = false;
        state.leaveActions.create.data = action.payload;
        state.leaveActions.create.error = null;
      })

      .addCase(createLeave.rejected, (state, action) => {
        state.leaveActions.create.loading = false;
        state.leaveActions.create.error = action.payload;
      })

      // add Leave as Admin
      .addCase(addLeaveAsAdmin.pending, (state) => {
        state.leaveActions.add.loading = true;
      })
      .addCase(addLeaveAsAdmin.fulfilled, (state, action) => {
        state.leaveActions.add.loading = false;
        state.leaveActions.add.data = action.payload;
        state.leaveActions.add.error = null;
      })
      .addCase(addLeaveAsAdmin.rejected, (state, action) => {
        state.leaveActions.add.loading = false;
        state.leaveActions.add.error = action.payload;
      })

      // Update Leave
      .addCase(updateLeave.pending, (state) => {
        state.leaveActions.update.loading = true;
      })

      .addCase(updateLeave.fulfilled, (state, action) => {
        state.leaveActions.update.loading = false;
        state.leaveActions.update.data = action.payload;
        state.leaveActions.update.error = null;
        // Update the specific leave in the leaves data
        if (state.leaves.data && state.leaves.data.leaves) {
          const index = state.leaves.data.leaves.findIndex(
            (leave) => leave._id === action.payload.leave._id
          );
          if (index !== -1) {
            state.leaves.data.leaves[index] = action.payload.leave;
          }
        } else if (state.leaves.data) {
          const index = state.leaves.data.findIndex(
            (leave) => leave._id === action.payload.leave._id
          );
          if (index !== -1) {
            state.leaves.data[index] = action.payload.leave;
          }
        }
      })

      .addCase(updateLeave.rejected, (state, action) => {
        state.leaveActions.update.loading = false;
        state.leaveActions.update.error = action.payload;
      })

      // Delete Leave
      .addCase(deleteLeave.pending, (state) => {
        state.leaveActions.delete.loading = true;
      })
      // Delete Leave
      .addCase(deleteLeave.fulfilled, (state, action) => {
        state.leaveActions.delete.loading = false;
        state.leaveActions.delete.data = action.payload;
        state.leaveActions.delete.error = null;

        // Remove the leave from the leaves data
        state.leaves.data = state.leaves.data.filter(
          (leave) => leave.id !== action.meta.arg
        );
      })
      .addCase(deleteLeave.rejected, (state, action) => {
        state.leaveActions.delete.loading = false;
        state.leaveActions.delete.error = action.payload;
      })

      // Fetch Monthly Stats
      .addCase(fetchMonthlyStats.pending, (state) => {
        state.leaveActions.fetchMonthlyStats.loading = true;
      })
      .addCase(fetchMonthlyStats.fulfilled, (state, action) => {
        state.leaveActions.fetchMonthlyStats.loading = false;
        state.leaveActions.fetchMonthlyStats.data = action.payload;
        state.leaveActions.fetchMonthlyStats.error = null;
      })
      .addCase(fetchMonthlyStats.rejected, (state, action) => {
        state.leaveActions.fetchMonthlyStats.loading = false;
        state.leaveActions.fetchMonthlyStats.error = action.payload;
      })

      // Update Leave Status
      .addCase(updateLeaveStatus.pending, (state) => {
        state.leaveActions.updateStatus.loading = true;
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.leaveActions.updateStatus.loading = false;
        state.leaveActions.updateStatus.data = action.payload;
        state.leaveActions.updateStatus.error = null;
        console.log(
          "🚀 ~ .addCase ~ action.payload:",
          action.payload.leave._id
        );
        //for main data
        const index = state.leaves.data.leaves.findIndex(
          (leave) => leave._id === action.payload.leave._id
        );
        console.log("🚀 ~ .addCase ~ index:", index);
        if (index !== -1) {
          state.leaves.data.leaves[index].status = action.payload.status;
        }
        console.log("tts", state.leaveActions.fetchPendingLeaves);
        const pendingDataIndex =
          state.leaveActions.fetchPendingLeaves.data.leaves.findIndex(
            (leave) => leave._id === action.payload.leave._id
          );
        if (pendingDataIndex !== -1) {
          state.leaveActions.fetchPendingLeaves.data.leaves.splice(
            pendingDataIndex,
            1
          );
        }
      })

      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.leaveActions.updateStatus.loading = false;
        state.leaveActions.updateStatus.error = action.payload;
      })

      //fetch leave by status
      .addCase(fetchLeaveByStatus.pending, (state) => {
        state.leaveActions.fetchLeaveByStatus.loading = true;
      })
      .addCase(fetchLeaveByStatus.fulfilled, (state, action) => {
        state.leaveActions.fetchLeaveByStatus.loading = false;
        state.leaveActions.fetchLeaveByStatus.data = action.payload;
        state.leaveActions.fetchLeaveByStatus.error = null;
        console.log("🚀 ~ .addCase ~ action.payload:", action.payload);
        //add to the leaves data
        state.leaves.data = action.payload;

        //add to particular pending leaves data
        if (action.payload.status === "Pending") {
          state.leaveActions.fetchPendingLeaves.data = action.payload;
        }
      })
      .addCase(fetchLeaveByStatus.rejected, (state, action) => {
        state.leaveActions.fetchLeaveByStatus.loading = false;
        state.leaveActions.fetchLeaveByStatus.error = action.payload;
      });
  },
});

export const { clearErrors } = leaveSlice.actions;
export default leaveSlice.reducer;
