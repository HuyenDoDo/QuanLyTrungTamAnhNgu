const Utils = require("../utils/Utils");
const HocVienApiService = require("../services/HocVienApiService");

const updateAccFunc = async (req, res) => {
  let data = req.body;
  let emptyInput = Utils.checkEmptyInput(data);
  if (emptyInput) {
    return res.status(200).json({
      EC: -2,
      MS: `Bạn chưa nhập ${emptyInput}...`,
      DT: "",
    });
  }
  let hocVien = req.session.hocVien;

  if (!hocVien)
    return res.status(200).json({
      EC: -3,
      MS: "Lỗi session...",
      DT: "",
    });
  try {
    const result = await HocVienApiService.updateAccHocVien(hocVien, data);

    if (result.EC === 0) {
      req.session.hocVien = result.DT;
    }

    return res.status(200).json({ EC: result.EC, MS: result.MS });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

const updatePswFunc = async (req, res) => {
  let data = req.body;
  let emptyInput = Utils.checkEmptyInput(data);
  if (emptyInput) {
    return res.status(200).json({
      EC: -2,
      MS: `Bạn chưa nhập ${emptyInput}...`,
      DT: "",
    });
  }
  let maHV = req.session.hocVien._id;
  if (!maHV)
    return res.status(200).json({
      EC: -3,
      MS: "Lỗi session...",
      DT: "",
    });
  try {
    const result = await HocVienApiService.updatePassword(maHV, data);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

const getRegistedLopKhoaFunc = async (req, res) => {
  try {
    let hocVien = req.session.hocVien;
    if (!hocVien)
      return res.status(200).json({
        EC: -2,
        MS: "Lỗi session...",
        DT: "",
      });
    const result = await HocVienApiService.getRegistedLopKhoa(hocVien._id);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

const createFunc = async (req, res) => {
  //dữ liệu được gửi đi nằm trong request body
  let data = req.body;
  let emptyInput = Utils.checkEmptyInput(data);
  if (emptyInput) {
    return res.status(200).json({
      EC: -2,
      MS: `Bạn chưa nhập ${emptyInput}...`,
      DT: "",
    });
  }
  try {
    const result = await HocVienApiService.createHocVien(data);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

const getFunc = async (req, res) => {
  let query = req.query;
  try {
    const result = await HocVienApiService.getHocVien(query);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

const updateFunc = async (req, res) => {
  let data = req.body;
  let emptyInput = Utils.checkEmptyInput(data);
  if (emptyInput) {
    return res.status(200).json({
      EC: -2,
      MS: `Bạn chưa nhập ${emptyInput}...`,
      DT: "",
    });
  }
  let maHV = req.params.id;
  console.log(maHV);
  if (!maHV)
    return res.status(200).json({
      EC: -3,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await HocVienApiService.updateHocVien(maHV, data);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

const deleteFunc = async (req, res) => {
  let maHV = req.params.id;
  if (!maHV)
    return res.status(200).json({
      EC: -2,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await HocVienApiService.deleteHocVien(maHV);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

const findFunc = async (req, res) => {
  let maHV = req.params.id;
  if (!maHV)
    return res.status(400).json({
      EC: -2,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await HocVienApiService.findHocVien(maHV);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

module.exports = {
  updateAccFunc,
  updatePswFunc,
  getRegistedLopKhoaFunc,
  createFunc,
  deleteFunc,
  findFunc,
  updateFunc,
  getFunc,
};
