const Utils = require("../utils/Utils");
const ChuongTrinhApiService = require("../services/ChuongTrinhApiService");

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
    const result = await ChuongTrinhApiService.createChuongTrinh(data);
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
    const result = await ChuongTrinhApiService.getChuongTrinh(query);
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
  let maCT = req.params.id;
  if (!maCT)
    return res.status(200).json({
      EC: -3,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await ChuongTrinhApiService.updateChuongTrinh(maCT, data);
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
  let maCT = req.params.id;
  if (!maCT)
    return res.status(200).json({
      EC: -2,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await ChuongTrinhApiService.deleteChuongTrinh(maCT);
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
  let maCT = req.params.id;
  if (!maCT)
    return res.status(400).json({
      EC: -2,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await ChuongTrinhApiService.findChuongTrinh(maCT);
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

module.exports = { createFunc, updateFunc, deleteFunc, getFunc, findFunc };
