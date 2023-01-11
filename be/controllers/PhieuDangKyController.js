const PhieuDangKyApiService = require("../services/PhieuDangKyApiService");

const createFunc = async (req, res) => {
  try {
    const result = await PhieuDangKyApiService.createPhieuDangKy(
      req.session.hocVien._id,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      MS: "something wrong",
      DT: "",
    });
  }
};

const getFunc = async (req, res) => {
  let query = req.query;
  try {
    const result = await PhieuDangKyApiService.getPhieuDangKy(query);
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

module.exports = { createFunc, getFunc };
