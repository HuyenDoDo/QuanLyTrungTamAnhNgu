const HocVien = require("../models/HocVien");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const hocVienRegist = async (rawHocVien) => {
  try {
    const existEmail = await HocVien.findOne({ email: rawHocVien.email });
    if (existEmail) {
      return {
        EC: 1,
        MS: "Trùng Email...",
        DT: "",
      };
    }

    const existPhone = await HocVien.findOne({ sdt: rawHocVien.sdt });
    if (existPhone) {
      return {
        EC: 2,
        MS: "Trùng số điện thoại...",
        DT: "",
      };
    }

    const hashedPsw = await bcrypt.hash(rawHocVien.password, 12);

    const newHocVien = new HocVien({
      ...rawHocVien,
      password: hashedPsw,
    });

    const savedHocVien = await newHocVien.save();

    if (!savedHocVien) {
      return {
        EC: 3,
        MS: "Đăng ký không thành công...",
        DT: "",
      };
    }

    return {
      EC: 0,
      MS: "Đăng ký thành công!!!",
      DT: "",
    };
  } catch (error) {
    console.log("Service: ", error);
    return {
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    };
  }
};

const hocVienLogin = async (data) => {
  try {
    const hocVien = await HocVien.findOne({
      email: data.email,
    });

    if (!hocVien) {
      return {
        EC: 1,
        MS: "Sai email!!!",
        DT: "",
      };
    }

    const isMatch = await bcrypt.compare(data.password, hocVien.password);
    if (!isMatch) {
      return {
        EC: 2,
        MS: "Sai mật khẩu!!!",
        DT: "",
      };
    }

    const { password, ...others } = hocVien._doc;

    return {
      EC: 0,
      MS: "Login successfull!!!",
      DT: others,
    };
  } catch (error) {
    console.log("Service: Something wrong...");
    return {
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    };
  }
};

module.exports = { hocVienRegist, hocVienLogin };
