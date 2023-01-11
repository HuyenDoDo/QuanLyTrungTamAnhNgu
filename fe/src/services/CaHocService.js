import axios from "../axios";

const createCaHoc = async (data) => {
  return await axios.post("/cahoc/create", data);
};

const updateCaHoc = async (maCa, data) => {
  return await axios.put(`/cahoc/update/${maCa}`, data);
};

const deleteCaHoc = async (id) => {
  return await axios.delete(`/cahoc/delete/${id}`);
};

const getCaHoc = async () => {
  return await axios.get("/cahoc/get");
};

export { getCaHoc, createCaHoc, deleteCaHoc, updateCaHoc };
