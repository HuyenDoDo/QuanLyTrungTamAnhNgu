import axios from "../axios";

const createLopKhoa = async (data) => {
  return await axios.post("/lopkhoa/create", data);
};

const updateLopKhoa = async (maLK, data) => {
  return await axios.put(`/lopkhoa/update/${maLK}`, data);
};

const deleteLopKhoa = async (id) => {
  return await axios.delete(`/lopkhoa/delete/${id}`);
};

const getLopKhoa = async (maKH) => {
  if (maKH) {
    return await axios.get(`/lopkhoa?makh=${maKH}`);
  }
  return await axios.get(`/lopkhoa`);
};

const findLopKhoa = async (id) => {
  return await axios.get(`/lopkhoa/${id}`);
};

export { findLopKhoa, getLopKhoa, createLopKhoa, deleteLopKhoa, updateLopKhoa };
