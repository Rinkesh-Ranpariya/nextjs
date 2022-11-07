import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import toastReducer from "./toastSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    toast: toastReducer,
  },
});
