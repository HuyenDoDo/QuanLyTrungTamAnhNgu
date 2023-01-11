import axios from "../axios";

const createChuongTrinh = async (data) => {
  return await axios.post("/chuongtrinh/create", data);
};

const updateChuongTrinh = async (maCT, data) => {
  return await axios.put(`/chuongtrinh/update/${maCT}`, data);
};

const deleteChuongTrinh = async (id) => {
  return await axios.delete(`/chuongtrinh/delete/${id}`);
};

const getChuongTrinh = async (query) => {
  return await axios.get(`/chuongtrinh?limit=${query ? query : 0}`);
};

const findChuongTrinh = async (id) => {
  return await axios.get(`/chuongtrinh/${id}`);
};

export {
  findChuongTrinh,
  getChuongTrinh,
  createChuongTrinh,
  deleteChuongTrinh,
  updateChuongTrinh,
};
