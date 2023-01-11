// const ChuongTrinh = require("../models/ChuongTrinh");
// const LopHoc = require("../models/LopHoc");
const CaHoc = require("../models/CaHoc");
// B1: kiểm tra rỗng bên controller
// B2: kiểm tra trùng mà
// B3: kiểm tra trùng tên
// B4: save lại
const createCaHoc = async (data) => {
  try {
    let caHoc = await CaHoc.findOne({ maCa: data.maCa });
    if (caHoc) {
      return {
        EC: 1,
        MS: "Mã ca học đã tồn tại...",
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
    const newCaHoc = new CaHoc(data);
    const savedCaHoc = await newCaHoc.save();
    if (!savedCaHoc)
      return {
        EC: 3,
        MS: "Thêm mới ca học không thành công...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã thêm mới ca học!",
      DT: savedCaHoc,
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

const getCaHoc = async (query) => {
  try {
    const limit = query.limit ? +query.limit : 0;
    const caHocList = await CaHoc.find().limit(limit);
    // console.log(chuongTrinhList);
    return {
      EC: 0,
      MS: "Lấy thành công danh sách ca học!",
      DT: caHocList,
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

const updateCaHoc = async (maCa, data) => {
  try {
    const maCa_param = maCa;
    const maCa_req = data.maCa;
    //Kiểm tra maCT trong param có tồn tại trên CSDL ko
    const caHoc_param = await CaHoc.findOne({ maCa: maCa_param });
    if (!caHoc_param) {
      return {
        EC: 1,
        MS: "Không tìm thấy ca học...",
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
    const filter = { maCa: maCa_param };
    const update = { $set: data };
    const updatedCaHoc = await CaHoc.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );
    return {
      EC: 0,
      MS: "Đã cập nhật thông tin ca học!",
      DT: updatedCaHoc,
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

const deleteCaHoc = async (maCa) => {
  try {
    // const lopHoc = await LopHoc.findOne({ maCT: maCT });
    // if (lopHoc) {
    //   return {
    //     EC: 1,
    //     MS: "Chương trình chứa lớp học, không thể xóa...",
    //     DT: "",
    //   };
    // }
    const filter = { maCa: maCa };
    const deletedCaHoc = await CaHoc.findOneAndDelete(filter);
    if (!deletedCaHoc)
      return {
        EC: 2,
        MS: "Không tìm thấy ca học...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã xóa ca học!",
      DT: deletedCaHoc,
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

const findCaHoc = async (maCa) => {
  try {
    const filter = { maCa: maCa };
    const caHoc = await CaHoc.findOne(filter);
    if (!caHoc) {
      return {
        EC: 1,
        MS: `Không tìm thấy ca học ${maCa}...`,
        DT: "",
      };
    }
    return {
      EC: 0,
      MS: "Tìm thấy ca học!",
      DT: caHoc,
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
  createCaHoc,
  updateCaHoc,
  deleteCaHoc,
  getCaHoc,
  findCaHoc,
};
