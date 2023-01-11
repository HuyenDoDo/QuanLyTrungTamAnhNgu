import axios from "../axios";

const createNhomThuHoc = async (data) => {
  return await axios.post("/nhomthuhoc/create", data);
};

const updateNhomThuHoc = async (maNTH, data) => {
  return await axios.put(`/nhomthuhoc/update/${maNTH}`, data);
};

const deleteNhomThuHoc = async (id) => {
  return await axios.delete(`/nhomthuhoc/delete/${id}`);
};

const getNhomThuHoc = async () => {
  return await axios.get("/nhomthuhoc/get");
};

export { getNhomThuHoc, createNhomThuHoc, deleteNhomThuHoc, updateNhomThuHoc };
