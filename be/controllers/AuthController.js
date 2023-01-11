const Utils = require("../utils/Utils");
const AuthApiService = require("../services/AuthApiService");

const hocVienRegistFunc = async (req, res) => {
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

    const result = await AuthApiService.hocVienRegist(data);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Controller: ", error);
    return res.status(500).json({
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    });
  }
};

const hocVienLoginFunc = async (req, res) => {
  try {
    const data = req.body;
    const emptyInput = Utils.checkEmptyInput(data);
    if (emptyInput) {
      return res.status(200).json({
        EC: "-2",
        MS: `Bạn chưa nhập ${emptyInput}...`,
        DT: "",
      });
    }
    const result = await AuthApiService.hocVienLogin(data);

    if (result.EC === 0) {
      req.session.hocVien = result.DT;
    }

    return res.status(200).json({ EC: result.EC, MS: result.MS });
  } catch (error) {
    console.log("Controller: ", error);
    return res.status(500).json({
      EC: "-1",
      MS: "Controller: something wrong...",
      DT: "",
    });
  }
};

module.exports = { hocVienRegistFunc, hocVienLoginFunc };
