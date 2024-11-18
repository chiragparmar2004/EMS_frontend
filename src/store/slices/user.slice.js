import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../lib/apiRequest";

const initialState = {
  user: {
    data: null,
    isAuthenticated: false,
  },
  auth: {
    token: null,
    loading: false,
    error: null,
  },
};

// Thunks

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await apiRequest().post(`/auth/login`, {
        email,
        password,
        rememberMe,
      });
      console.log("🚀 ~ response ~ response:", response);

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }

      return { token, user };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(
        error.response?.data?.msg || "Login failed. Please try again."
      );
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (
    { firstName, lastName, email, password, gender, position, phoneNumber },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiRequest().post(`/auth/register`, {
        firstName,
        lastName,
        email,
        password,
        gender,
        position,
        phoneNumber,
      });
      return response.data.msg;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Registration failed. Please try again."
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await apiRequest().post(`/auth/reset-password`, {
        email,
      });
      return response.data.msg;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Reset password failed. Please try again."
      );
    }
  }
);

export const setPassword = createAsyncThunk(
  "user/setPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await apiRequest().post(`/auth/create-password`, {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Creation of password failed. Please try again."
      );
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("token");
});

export const checkResetToken = createAsyncThunk(
  "user/checkResetToken",
  async ({ token }, { rejectWithValue }) => {
    console.log("🚀 ~ token:", token);
    try {
      const res = await apiRequest().post(`/auth/check-password-reset-token`, {
        token,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Creation of password failed. Please try again."
      );
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "user/resendVerificationEmail",
  async ({ id }, { rejectWithValue }) => {
    console.log("🚀 ~ id:", id);
    try {
      console.log("here fjid");
      const response = await apiRequest().post(
        `/auth/send-verification-email/${id}`
      );
      console.log("🚀 ~ response:", response);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend email"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors(state) {
      state.auth.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.auth.loading = true;
        state.auth.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.auth.loading = false;
        state.user.isAuthenticated = true;
        state.user.data = action.payload.user;
        state.auth.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.auth.loading = false;
        state.user.isAuthenticated = false;
        state.auth.error = action.payload;
        state.auth.token = null;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.auth.loading = true;
        state.auth.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.auth.loading = false;
        state.user.isAuthenticated = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.auth.loading = false;
        state.auth.error = action.payload;
      })
      //set password
      .addCase(setPassword.pending, (state) => {
        state.auth.loading = true;
        state.auth.error = null;
      })
      .addCase(setPassword.fulfilled, (state) => {
        state.auth.loading = false;
      })
      .addCase(setPassword.rejected, (state, action) => {
        state.auth.loading = false;
        state.auth.error = action.payload;
      })
      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.auth.loading = true;
        state.auth.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.auth.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.auth.loading = false;
        state.auth.error = action.payload;
      })
      // Check reset token
      .addCase(checkResetToken.pending, (state) => {
        state.auth.loading = true;
        state.auth.error = null;
      })
      .addCase(checkResetToken.fulfilled, (state) => {
        state.auth.loading = false;
      })
      .addCase(checkResetToken.rejected, (state, action) => {
        state.auth.loading = true;
        state.auth.error = action.payload;
      })
      //resend verification email
      .addCase(resendVerificationEmail.pending, (state) => {
        state.auth.loading = true;
        state.auth.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.auth.loading = false;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.auth.loading = true;
        state.auth.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user.isAuthenticated = false;
        state.user.data = null;
        state.auth.token = null;
      });
  },
});

export const { clearErrors } = userSlice.actions;

export default userSlice.reducer;
