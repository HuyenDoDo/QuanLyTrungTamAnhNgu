import axios from "../axios";

const updateHocVienPsw = async (data) => {
  return await axios.put(`/hocvien/update-psw`, data);
};

const updateHocVienAcc = async (data) => {
  return await axios.put(`/hocvien/update-acc`, data);
};

const getRegistedHistory = async () => {
  return await axios.get(`/hocvien/registed-history`);
};

const createHocVien = async (data) => {
  return await axios.post("/hocvien/create", data);
};

const updateHocVien = async (maHV, data) => {
  return await axios.put(`/hocvien/update/${maHV}`, data);
};

const deleteHocVien = async (id) => {
  return await axios.delete(`/hocvien/delete/${id}`);
};

const getHocVien = async () => {
  return await axios.get("/hocvien/get");
};
export {
  updateHocVienPsw,
  updateHocVienAcc,
  getRegistedHistory,
  createHocVien,
  updateHocVien,
  deleteHocVien,
  getHocVien,
};
