import axios from "../axios";

const createKhoaHoc = async (data) => {
  return await axios.post("/khoahoc/create", data);
};

const updateKhoaHoc = async (maKH, data) => {
  return await axios.put(`/khoahoc/update/${maKH}`, data);
};

const deleteKhoaHoc = async (id) => {
  return await axios.delete(`/khoahoc/delete/${id}`);
};

const getKhoaHoc = async () => {
  return await axios.get("/khoahoc");
};

const findKhoaHoc = async (id) => {
  return await axios.get(`/khoahoc/${id}`);
};

const getKhoaHocWithLopKhoa = async () => {
  return await axios.get("/khoahoc/get/lopkhoa");
};

export {
  findKhoaHoc,
  getKhoaHoc,
  createKhoaHoc,
  deleteKhoaHoc,
  updateKhoaHoc,
  getKhoaHocWithLopKhoa,
};
