// Import redux-persist and necessary parts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice.js";
import employeeReducer from "./slices/employee.slice.js";
import leaveReducer from "./slices/leave.slice.js";

import snackbarReducer from "./slices/snackbar.slice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define the persist configuration
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "employee"], // Only persist the user slice
};

// Wrap your userReducer with persistReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Wrap your userReducer with persistReducer
const persistedEmployeeReducer = persistReducer(persistConfig, employeeReducer);
const persistedLeaveReducer = persistReducer(persistConfig, leaveReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    snackbar: snackbarReducer,
    employee: persistedEmployeeReducer,
    leave: persistedLeaveReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid serialization errors for persist actions
    }),
});

// Create a persistor object
export const persistor = persistStore(store);
