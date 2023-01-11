const Utils = require("../utils/Utils");
const KhoaHocApiService = require("../services/KhoaHocApiService");

const createFunc = async (req, res) => {
  //dữ liệu được gửi đi nằm trong request body
  let data = req.body;
  let emptyInput = Utils.checkEmptyInput(data);
  if (emptyInput && emptyInput.length > 0) {
    return res.status(200).json({
      EC: -2,
      MS: `Bạn chưa nhập ${emptyInput}...`,
      DT: "",
    });
  }
  try {
    const result = await KhoaHocApiService.createKhoaHoc(data);
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
    const result = await KhoaHocApiService.getKhoaHoc(query);
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
  let maKH = req.params.id;
  if (!maKH)
    return res.status(400).json({
      EC: -2,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await KhoaHocApiService.updateKhoaHoc(maKH, data);
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
  let maKH = req.params.id;
  if (!maKH)
    return res.status(400).json({
      EC: -2,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await KhoaHocApiService.deleteKhoaHoc(maKH);
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
  let maKH = req.params.id;
  if (!maKH)
    return res.status(400).json({
      EC: -2,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await KhoaHocApiService.findKhoaHoc(maKH);
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

const getWithFunc = async (req, res) => {
  try {
    const result = await KhoaHocApiService.getKhoaHocWithLopKhoa();
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
  getWithFunc,
};
