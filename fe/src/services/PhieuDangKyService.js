import axios from "../axios";

const createPhieuDangKy = async (data) => {
  return await axios.post("/phieudangky/create", data);
};

const getPhieuDangKy = async (query) => {
  return await axios.get(`/phieudangky?limit=${query ? query : 0}`);
};

export { createPhieuDangKy, getPhieuDangKy };
