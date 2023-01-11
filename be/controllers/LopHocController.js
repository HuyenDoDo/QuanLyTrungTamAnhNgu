const LopHocApiService = require("../services/LopHocApiService");
const Utils = require("../utils/Utils");
const createFunc = async (req, res) => {
  try {
    let data = req.body;
    let emptyInput = Utils.checkEmptyInput(data);
    if (emptyInput && emptyInput.length > 0) {
      return res.status(200).json({
        EC: -2,
        MS: `Bạn chưa nhập ${emptyInput}...`,
        DT: "",
      });
    }
    const result = await LopHocApiService.createLopHoc(data);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
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

    let maLop = req.params.id;
    if (!maLop)
      return res.status(200).json({
        EC: -3,
        MS: "Thiếu params...",
        DT: "",
      });
    const result = await LopHocApiService.updateLopHoc(maLop, data);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let maLop = req.params.id;
    let data = req.body;
    const result = await LopHocApiService.deleteLopHoc(maLop, data);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

const getFunc = async (req, res) => {
  try {
    let query = req.query;
    const result = await LopHocApiService.getLopHoc(query);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

const findFunc = async (req, res) => {
  let maLop = req.params.id;
  if (!maLop)
    return res.status(400).json({
      EC: -2,
      MS: "Thiếu params...",
      DT: "",
    });
  try {
    const result = await LopHocApiService.findLopHoc(maLop);
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
