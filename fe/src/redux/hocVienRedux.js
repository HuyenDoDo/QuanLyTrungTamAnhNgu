import { createSlice } from "@reduxjs/toolkit";

const hocVienSlice = createSlice({
  name: "hocVien",
  initialState: {
    currentHocVien: null,
    loggedIn: false,
  },
  reducers: {
    loginStatus: (state, action) => {
      state.currentHocVien = action.payload.hocVien
        ? action.payload.hocVien
        : null;
      state.loggedIn = action.payload.loggedIn;
    },
  },
});

export const { loginStatus } = hocVienSlice.actions;
export default hocVienSlice.reducer;
