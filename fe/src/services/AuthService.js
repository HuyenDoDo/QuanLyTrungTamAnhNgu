import axios from "../axios";

const hocVienLogin = async (data) => {
  return await axios.post("/hocvien/login", data);
};

const getHocVienLogin = async () => {
  return await axios.get("/hocvien/login");
};

const hocVienLogout = async () => {
  return await axios.post("/hocvien/logout");
};

const hocVienRegist = async (data) => {
  return await axios.post("/hocvien/regist", data);
};

export { hocVienLogin, hocVienLogout, hocVienRegist, getHocVienLogin };
