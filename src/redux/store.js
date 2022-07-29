import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice"
import loginSlice from "./loginSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    employee: employeeSlice,
  },
});