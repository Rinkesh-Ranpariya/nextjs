import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    isShow: false,
    data: {
      message: "",
      type: "",
    },
  },
  reducers: {
    openToast: (state, action) => {
      state.isShow = true;
      state.data = action.payload;
    },
    closeToast: (state) => {
      state.isShow = false;
      state.data = {
        message: "",
        type: "",
      };
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;
