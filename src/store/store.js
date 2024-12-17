// Import redux-persist and necessary parts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice.js";
import employeeReducer from "./slices/employee.slice.js";
import leaveReducer from "./slices/leave.slice.js";
import salaryReducer from "./slices/salary.slice.js";
import snackbarReducer from "./slices/snackbar.slice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define the persist configuration
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "auth"], // Only persist the user data (e.g., token)
};

const employeePersistConfig = {
  key: "employee",
  storage,
  whitelist: ["employee"], // Persist employee data
};

const leavePersistConfig = {
  key: "leave",
  storage,
  whitelist: ["leave", "leaveActions"], // Persist leave data
};

const salaryPersistConfig = {
  key: "salary",
  storage,
  whitelist: ["allsalary"], // Persist salary data
};
// Wrap your userReducer with persistReducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Wrap your userReducer with persistReducer
const persistedEmployeeReducer = persistReducer(
  employeePersistConfig,
  employeeReducer
);
const persistedLeaveReducer = persistReducer(leavePersistConfig, leaveReducer);

const persistedSalaryReducer = persistReducer(
  salaryPersistConfig,
  salaryReducer
);
// Configure the store
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    snackbar: snackbarReducer,
    employee: persistedEmployeeReducer,
    leave: persistedLeaveReducer,
    salary: persistedSalaryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid serialization errors for persist actions
    }),
});

// Create a persistor object
export const persistor = persistStore(store);
