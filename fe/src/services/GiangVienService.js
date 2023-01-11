import axios from "../axios";

const createGiangVien = async (data) => {
  return await axios.post("/giangvien/create", data);
};

const updateGiangVien = async (maGV, data) => {
  return await axios.put(`/giangvien/update/${maGV}`, data);
};

const deleteGiangVien = async (id) => {
  return await axios.delete(`/giangvien/delete/${id}`);
};

const getGiangVien = async () => {
  return await axios.get("/giangvien/get");
};

export { getGiangVien, createGiangVien, deleteGiangVien, updateGiangVien };
