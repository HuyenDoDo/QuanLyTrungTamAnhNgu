// const ChuongTrinh = require("../models/ChuongTrinh");
// const LopHoc = require("../models/LopHoc");
const GiangVien = require("../models/GiangVien");
// B1: kiểm tra rỗng bên controller
// B2: kiểm tra trùng mà
// B3: kiểm tra trùng tên
// B4: save lại
const createGiangVien = async (data) => {
  try {
    let giangVien = await GiangVien.findOne({ maGV: data.maGV });
    if (giangVien) {
      return {
        EC: 1,
        MS: "Mã học vien đã tồn tại...",
        DT: "",
      };
    }
    // let findByName = await ChuongTrinh.findOne({ tenCT: data.tenCT });
    // if (findByName) {
    //   return {
    //     EC: 2,
    //     MS: "Tên chương trình đã tồn tại...",
    //     DT: "",
    //   };
    // }
    const newGiangVien = new GiangVien(data);
    const savedGiangVien = await newGiangVien.save();
    if (!savedGiangVien)
      return {
        EC: 3,
        MS: "Thêm mới giảng viên không thành công...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã thêm mới giảng viên!",
      DT: savedGiangVien,
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

const getGiangVien = async (query) => {
  try {
    const limit = query.limit ? +query.limit : 0;
    const giangVienList = await GiangVien.find().limit(limit);
    // console.log(chuongTrinhList);
    return {
      EC: 0,
      MS: "Lấy thành công danh sách giảng viên!",
      DT: giangVienList,
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

const updateGiangVien = async (maGV, data) => {
  try {
    const maGV_param = maGV;
    const maGV_req = data.maGV;
    //Kiểm tra maCT trong param có tồn tại trên CSDL ko
    const giangVien_param = await GiangVien.findOne({ maGV: maGV_param });
    if (!giangVien_param) {
      return {
        EC: 1,
        MS: "Không tìm thấy giảng viên...",
        DT: "",
      };
    }

    //kiểm tra trùng tên
    // const findByName = await CaHoc.findOne({ tenCT: data.tenCT });
    // if (findByName && findByName.maCT !== maCT_req) {
    //   return {
    //     EC: 2,
    //     MS: "Trùng tên chương trình...",
    //     DT: "",
    //   };
    // }

    //cập nhật ca học
    const filter = { maGV: maGV_param };
    const update = { $set: data };
    const updatedGiangVien = await GiangVien.findOneAndUpdate(filter, update, {
      new: true,
    });
    return {
      EC: 0,
      MS: "Đã cập nhật thông tin giảng viên!",
      DT: updatedGiangVien,
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

const deleteGiangVien = async (maGV) => {
  try {
    // const lopHoc = await LopHoc.findOne({ maCT: maCT });
    // if (lopHoc) {
    //   return {
    //     EC: 1,
    //     MS: "Chương trình chứa lớp học, không thể xóa...",
    //     DT: "",
    //   };
    // }
    const filter = { maGV: maGV };
    const deletedGiangVien = await GiangVien.findOneAndDelete(filter);
    if (!deletedGiangVien)
      return {
        EC: 2,
        MS: "Không tìm thấy giảng viên...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã xóa giảng viên!",
      DT: deletedGiangVien,
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

const findGiangVien = async (maHV) => {
  try {
    const filter = { maGV: maGV };
    const giangVien = await GiangVien.findOne(filter);
    if (!giangVien) {
      return {
        EC: 1,
        MS: `Không tìm thấy giảng viên ${maHV}...`,
        DT: "",
      };
    }
    return {
      EC: 0,
      MS: "Tìm thấy giảng viên!",
      DT: giangVien,
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
  createGiangVien,
  updateGiangVien,
  deleteGiangVien,
  getGiangVien,
  findGiangVien,
};
