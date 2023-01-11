const ChuongTrinh = require("../models/ChuongTrinh");
const LopHoc = require("../models/LopHoc");

const createChuongTrinh = async (data) => {
  try {
    let chuongTrinh = await ChuongTrinh.findOne({ maCT: data.maCT });
    if (chuongTrinh) {
      return {
        EC: 1,
        MS: "Mã chương trình đã tồn tại...",
        DT: "",
      };
    }
    let findByName = await ChuongTrinh.findOne({ tenCT: data.tenCT });
    if (findByName) {
      return {
        EC: 2,
        MS: "Tên chương trình đã tồn tại...",
        DT: "",
      };
    }
    const newChuongTrinh = new ChuongTrinh(data);
    const savedChuongTrinh = await newChuongTrinh.save();
    if (!savedChuongTrinh)
      return {
        EC: 3,
        MS: "Thêm mới chương trình không thành công...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã thêm mới chương trình!",
      DT: savedChuongTrinh,
    };
  } catch (err) {
    console.log(err);
    return {
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    };
  }
};

const getChuongTrinh = async (query) => {
  try {
    const limit = query.limit ? +query.limit : 0;
    const chuongTrinhList = await ChuongTrinh.find().limit(limit);
    // console.log(chuongTrinhList);
    return {
      EC: 0,
      MS: "Lấy thành công danh sách chương trình!",
      DT: chuongTrinhList,
    };
  } catch (err) {
    console.log(err);
    return {
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    };
  }
};

const updateChuongTrinh = async (maCT, data) => {
  try {
    const maCT_param = maCT;
    const maCT_req = data.maCT;
    //Kiểm tra maCT trong param có tồn tại trên CSDL ko
    const chuongTrinh_param = await ChuongTrinh.findOne({ maCT: maCT_param });
    if (!chuongTrinh_param) {
      return {
        EC: 1,
        MS: "Không tìm thấy chương trình...",
        DT: "",
      };
    }

    //kiểm tra trùng tên
    const findByName = await ChuongTrinh.findOne({ tenCT: data.tenCT });
    if (findByName && findByName.maCT !== maCT_req) {
      return {
        EC: 2,
        MS: "Trùng tên chương trình...",
        DT: "",
      };
    }

    //cập nhật chương trình
    const filter = { maCT: maCT_param };
    const update = { $set: data };
    const updatedChuongTrinh = await ChuongTrinh.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );
    return {
      EC: 0,
      MS: "Đã cập nhật thông tin chương trình!",
      DT: updatedChuongTrinh,
    };
  } catch (err) {
    console.log(err);
    return {
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    };
  }
};

const deleteChuongTrinh = async (maCT) => {
  try {
    const lopHoc = await LopHoc.findOne({ maCT: maCT });
    if (lopHoc) {
      return {
        EC: 1,
        MS: "Chương trình chứa lớp học, không thể xóa...",
        DT: "",
      };
    }
    const filter = { maCT: maCT };
    const deletedChuongTrinh = await ChuongTrinh.findOneAndDelete(filter);
    if (!deletedChuongTrinh)
      return {
        EC: 2,
        MS: "Không tìm thấy chương trình...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã xóa chương trình!",
      DT: deletedChuongTrinh,
    };
  } catch (err) {
    console.log(err);
    return {
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    };
  }
};

const findChuongTrinh = async (maCT) => {
  try {
    const filter = { maCT: maCT };
    const chuongTrinh = await ChuongTrinh.findOne(filter);
    if (!chuongTrinh) {
      return {
        EC: 1,
        MS: `Không tìm thấy chương trình ${maCT}...`,
        DT: "",
      };
    }
    return {
      EC: 0,
      MS: "Tìm thấy chương trình!",
      DT: chuongTrinh,
    };
  } catch (err) {
    console.log(err);
    return {
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    };
  }
};

module.exports = {
  createChuongTrinh,
  updateChuongTrinh,
  deleteChuongTrinh,
  getChuongTrinh,
  findChuongTrinh,
};
