const Utils = require("../utils/Utils");
const LopKhoaApiService = require("../services/LopKhoaApiService");

const createFunc = async (req, res) => {
  //dữ liệu được gửi đi nằm trong request body
  let data = req.body;
  let emptyInput = Utils.checkEmptyInput(data);
  if (emptyInput && emptyInput.length > 0) {
    return res.status(200).json({
      EC: -2,
      MS: `Thiếu tham số ${emptyInput}...`,
      DT: "",
    });
  }
  try {
    const result = await LopKhoaApiService.createLopKhoa(data);
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
  const maKH = req.query.makh;
  try {
    let result = [];
    if (maKH) {
      result = await LopKhoaApiService.getLopKhoaByKhoaHoc(query, maKH);
    } else {
      result = await LopKhoaApiService.getLopKhoa(query);
    }
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
  try {
    let data = req.body;
    let emptyInput = Utils.checkEmptyInput(data);
    if (emptyInput) {
      return res.status(200).json({
        EC: -2,
        MS: `Bạn chưa nhập ${emptyInput}...`,
        DT: "",
      });
    }
    let maLK = req.params.id;
    if (!maLK)
      return res.status(400).json({
        EC: -3,
        MS: "Thiếu params...",
        DT: "",
      });
    const result = await LopKhoaApiService.updateLopKhoa(maLK, data);
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
  let maLK = req.params.id;
  if (!maLK)
    return res.status(400).json({
      EC: -2,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await LopKhoaApiService.deleteLopKhoa(maLK);
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
  let maLK = req.params.id;
  if (!maLK)
    return res.status(400).json({
      EC: -2,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await LopKhoaApiService.findLopKhoa(maLK);
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
  createFunc,
  updateFunc,
  deleteFunc,
  getFunc,
  findFunc,
};
