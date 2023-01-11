import { getHocVienLogin } from "../services/AuthService";
import { loginStatus } from "./hocVienRedux";

export const getHocVienLoginRedux = async (dispatch) => {
  try {
    const res = await getHocVienLogin();
    dispatch(loginStatus(res.data));
  } catch (error) {
    console.log(error);
  }
};
