import { configureStore } from "@reduxjs/toolkit";
import hocVienReducer from "./hocVienRedux";
export default configureStore({
  reducer: {
    hocVien: hocVienReducer,
  },
});
