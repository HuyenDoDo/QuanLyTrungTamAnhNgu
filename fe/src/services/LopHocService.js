import axios from "../axios";

const createLopHoc = async (data) => {
  return await axios.post("/lophoc/create", data);
};

const updateLopHoc = async (maLop, data) => {
  return await axios.put(`/lophoc/update/${maLop}`, data);
};

const deleteLopHoc = async (id) => {
  return await axios.delete(`/lophoc/delete/${id}`);
};

const getLopHoc = async (maCT) => {
  if (maCT) {
    return await axios.get(`/lophoc/get?mact=${maCT}`);
  }
  return await axios.get(`/lophoc/get`);
};

export { getLopHoc, createLopHoc, deleteLopHoc, updateLopHoc };
