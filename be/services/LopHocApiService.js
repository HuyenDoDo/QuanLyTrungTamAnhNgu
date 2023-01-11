const LopHoc = require("../models/LopHoc");
const LopKhoa = require("../models/LopKhoa");

//arrow function
const createLopHoc = async (data) => {
  try {
    let lopHoc = await LopHoc.findOne({ maLop: data.maLop });
    if (lopHoc) {
      return {
        EC: 1,
        MS: "Mã lớp đã tồn tại...",
        DT: "",
      };
    }
    let findByName = await LopHoc.findOne({ tenLop: data.tenLop });
    if (findByName) {
      return {
        EC: 2,
        MS: "Tên lớp đã tồn tại...",
        DT: "",
      };
    }
    const newLopHoc = new LopHoc(data);
    const savedLopHoc = await newLopHoc.save();
    // console.log(savedLopHoc);
    // nếu mà lưu xuống csdl thất bại thì kq trả về có thể là null/""/undefined
    // nếu là null/""/undefined ở trong if đều tính là false
    // mảng rỗng [] ở trong if được tính là true, object rỗng {key:value} thì cx là true
    if (!savedLopHoc)
      return {
        EC: 3,
        MS: "Them moi lop hoc khong thanh cong",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã thêm mới lớp học thành công",
      DT: savedLopHoc,
    };
  } catch (error) {
    console.log(error);
    return { EC: -1, MS: "Something wrong", DT: "" };
  }
};

const deleteLopHoc = async (maLop) => {
  try {
    const lopKhoa = await LopKhoa.findOne({ maLop: maLop });
    if (lopKhoa) {
      return {
        EC: 1,
        MS: "Lớp học chứa lớp khóa, không thể xóa...",
        DT: "",
      };
    }

    const filter = { maLop: maLop };
    const deletedLopHoc = await LopHoc.findOneAndDelete(filter);
    // console.log(deletedLopHoc);
    if (!deletedLopHoc)
      return {
        EC: 2,
        MS: "Không tìm thấy lớp học",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã xóa lớp học",
      DT: deletedLopHoc,
    };
  } catch (error) {
    console.log(error);
    return { EC: -1, MS: "Something wrong", DT: "" };
  }
};

const updateLopHoc = async (maLop, data) => {
  try {
    const maLop_param = maLop;
    const maLop_req = data.maCT;
    //Kiểm tra maLop trong param có tồn tại trên CSDL ko
    const lopHoc_param = await LopHoc.findOne({ maLop: maLop_param });
    if (!lopHoc_param) {
      return {
        EC: 1,
        MS: "Không tìm thấy lớp học...",
        DT: "",
      };
    }

    //Nếu giữ nguyên tên lớp rồi cập nhật thì không cần kiểm tra trùng tên
    //ngược lại thì kiểm tra trùng tên
    if (lopHoc_param.tenLop !== data.tenLop) {
      const findByName = await LopHoc.findOne({ tenLop: data.tenLop });
      //Hai lớp học có mã lớp khác nhau mà trùng tên thì ko cho phép
      if (findByName && findByName.maLop !== maLop_req) {
        return {
          EC: 2,
          MS: "Trùng tên lớp khác...",
          DT: "",
        };
      }
    }

    const filter = { maLop: maLop_param };
    const update = { $set: data };
    const updatedLopHoc = await LopHoc.findOneAndUpdate(filter, update, {
      new: true,
    });
    return {
      EC: 0,
      MS: "Đã cập nhật lớp học",
      DT: updatedLopHoc,
    };
  } catch (error) {
    console.log(error);
    return { EC: -1, MS: "Something wrong", DT: "" };
  }
};

//lấy danh sách lớp học
const getLopHoc = async (query) => {
  try {
    // const limit = query.soluong ? +query.soluong : 0;
    // const lopHocList = await LopHoc.find().limit(limit);
    const mact = query.mact ? query.mact : "";
    let lopHocList = [];
    if (mact) {
      lopHocList = await LopHoc.aggregate([
        {
          $lookup: {
            from: "chuongtrinhs",
            localField: "maCT",
            foreignField: "maCT",
            as: "chuongTrinh",
          },
        },
        {
          $unwind: "$chuongTrinh",
        },
        {
          $project: {
            maLop: 1,
            tenLop: 1,
            hocPhi: 1,
            thoiLuong: 1,
            maCT: 1,
            "chuongTrinh.maCT": true,
            "chuongTrinh.tenCT": true,
          },
        },
        {
          $match: {
            maCT: mact,
          },
        },
      ]);
    } else {
      lopHocList = await LopHoc.aggregate([
        {
          $lookup: {
            from: "chuongtrinhs",
            localField: "maCT",
            foreignField: "maCT",
            as: "chuongTrinh",
          },
        },
        {
          $unwind: "$chuongTrinh",
        },
        {
          $project: {
            maLop: 1,
            tenLop: 1,
            hocPhi: 1,
            thoiLuong: 1,
            maCT: 1,
            "chuongTrinh.maCT": true,
            "chuongTrinh.tenCT": true,
          },
        },
      ]);
    }
    if (lopHocList && lopHocList.length > 0) {
      return {
        EC: 0,
        MS: "lấy thành công danh sách lớp học",
        DT: lopHocList,
      };
    }
    return {
      EC: 1,
      MS: "Không tìm thấy danh sách lớp học",
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return { EC: -1, MS: "Something wrong", DT: "" };
  }
};

//tìm 1 lớp học
const findLopHoc = async (maLop) => {
  try {
    const filter = { maLop: maLop };
    const findLopHoc = await LopHoc.findOne(filter);
    if (!findLopHoc)
      return {
        EC: 1,
        MS: `Không tìm thấy lớp học ${maLop}`,
        DT: "",
      };
    return {
      EC: 0,
      MS: "Tìm thấy lớp học",
      DT: findLopHoc,
    };
  } catch (error) {
    console.log(error);
    return { EC: -1, MS: "Something wrong", DT: "" };
  }
};

module.exports = {
  createLopHoc,
  deleteLopHoc,
  updateLopHoc,
  getLopHoc,
  findLopHoc,
};
