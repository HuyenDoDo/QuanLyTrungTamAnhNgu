const ChuongTrinh = require("../models/ChuongTrinh");
const LopHoc = require("../models/LopHoc");

const NhomThuHoc = require("../models/NhomThuHoc");
// B1: kiểm tra rỗng bên controller
// B2: kiểm tra trùng mà
// B3: kiểm tra trùng tên
// B4: save lại
const createNhomThuHoc = async (data) => {
  try {
    let nhomThuHoc = await NhomThuHoc.findOne({ maNTH: data.maNTH });
    if (nhomThuHoc) {
      return {
        EC: 1,
        MS: "Mã nhóm thứ học đã tồn tại...",
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
    const newNhomThuHoc = new NhomThuHoc(data);
    const savedNhomThuHoc = await newNhomThuHoc.save();
    if (!savedNhomThuHoc)
      return {
        EC: 3,
        MS: "Thêm mới nhóm thứ học không thành công...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã thêm mới nhóm thứ học!",
      DT: savedNhomThuHoc,
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

const getNhomThuHoc = async (query) => {
  try {
    const limit = query.limit ? +query.limit : 0;
    const nhomThuHocList = await NhomThuHoc.find().limit(limit);
    // console.log(chuongTrinhList);
    return {
      EC: 0,
      MS: "Lấy thành công danh sách nhóm thứ học!",
      DT: nhomThuHocList,
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

const updateNhomThuHoc = async (maNTH, data) => {
  try {
    const maNTH_param = maNTH;
    const maNTH_req = data.maNTH;
    //Kiểm tra maCT trong param có tồn tại trên CSDL ko
    const nhomThuHoc_param = await NhomThuHoc.findOne({ maNTH: maNTH_param });
    if (!nhomThuHoc_param) {
      return {
        EC: 1,
        MS: "Không tìm thấy nhóm thứ học...",
        DT: "",
      };
    }

    //kiểm tra trùng tên
    // const findByName = await ChuongTrinh.findOne({ tenCT: data.tenCT });
    // if (findByName && findByName.maCT !== maCT_req) {
    //   return {
    //     EC: 2,
    //     MS: "Trùng tên chương trình...",
    //     DT: "",
    //   };
    // }

    //cập nhật chương trình
    const filter = { maNTH: maNTH_param };
    const update = { $set: data };
    const updatedNhomThuHoc = await NhomThuHoc.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );
    return {
      EC: 0,
      MS: "Đã cập nhật thông tin nhóm thứ học!",
      DT: updatedNhomThuHoc,
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

const deleteNhomThuHoc = async (maNTH) => {
  try {
    // const lopHoc = await LopHoc.findOne({ maCT: maCT });
    // if (lopHoc) {
    //   return {
    //     EC: 1,
    //     MS: "Chương trình chứa lớp học, không thể xóa...",
    //     DT: "",
    //   };
    // }
    const filter = { maNTH: maNTH };
    const deletedNhomThuHoc = await NhomThuHoc.findOneAndDelete(filter);
    if (!deletedNhomThuHoc)
      return {
        EC: 2,
        MS: "Không tìm thấy nhóm thứ học...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã xóa nhóm thứ học!",
      DT: deletedNhomThuHoc,
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

const findNhomThuHoc = async (maNTH) => {
  try {
    const filter = { maNTH: maNTH };
    const nhomThuHoc = await NhomThuHoc.findOne(filter);
    if (!nhomThuHoc) {
      return {
        EC: 1,
        MS: `Không tìm thấy nhóm thứ học ${maNTH}...`,
        DT: "",
      };
    }
    return {
      EC: 0,
      MS: "Tìm thấy nhóm thứ học!",
      DT: nhomThuHoc,
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
  createNhomThuHoc,
  updateNhomThuHoc,
  deleteNhomThuHoc,
  getNhomThuHoc,
  findNhomThuHoc,
};
