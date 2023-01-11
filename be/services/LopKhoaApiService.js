const LopKhoa = require("../models/LopKhoa");

const createLopKhoa = async (data) => {
  try {
    let lopKhoa = await LopKhoa.findOne({ maLK: data.maLK });
    if (lopKhoa) {
      return {
        EC: 1,
        MS: "Mã lớp khóa đã tồn tại...",
        DT: "",
      };
    }

    if (data.soLuongDuKien <= 0) {
      return {
        EC: 2,
        MS: "Số lượng học viên dự kiến không hợp lệ...",
        DT: "",
      };
    }

    const newLopKhoa = new LopKhoa({ ...data, soLuongHienTai: 0 });
    const savedLopKhoa = await newLopKhoa.save();
    if (!savedLopKhoa)
      return {
        EC: 3,
        MS: "Thêm mới lớp khóa không thành công...",
        DT: "",
      };
    const { _id, __v, createdAt, updatedAt, ...others } = savedLopKhoa._doc;
    // console.log(others);
    return {
      EC: 0,
      MS: "Đã thêm mới lớp khóa!",
      DT: others,
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

const getLopKhoa = async (query) => {
  try {
    // const limit = query.limit ? +query.limit : 0;
    // const LopKhoaList = await LopKhoa.find().limit(limit);
    // console.log(LopKhoaList);
    const lopKhoaList = await LopKhoa.aggregate([
      {
        $lookup: {
          from: "khoahocs",
          localField: "maKH",
          foreignField: "maKH",
          as: "khoaHoc",
        },
      },
      {
        $unwind: "$khoaHoc",
      },
      {
        $lookup: {
          from: "lophocs",
          localField: "maLop",
          foreignField: "maLop",
          as: "lopHoc",
        },
      },
      {
        $unwind: "$lopHoc",
      },
      // {
      //   $lookup: {
      //     from: "chuongtrinhs",
      //     localField: "chuongtrinhs.maCT",
      //     foreignField: "lopHoc.maCT",
      //     as: "chuongTrinh",
      //   },
      // },
      // {
      //   $unwind: "$chuongTrinh",
      // },
      {
        $lookup: {
          from: "cahocs",
          localField: "maCa",
          foreignField: "maCa",
          as: "ca",
        },
      },
      {
        $unwind: "$ca",
      },
      {
        $lookup: {
          from: "nhomthuhocs",
          localField: "maNTH",
          foreignField: "maNTH",
          as: "ngayHoc",
        },
      },
      {
        $unwind: "$ngayHoc",
      },
      {
        $project: {
          _id: 0,
          maLK: 1,
          maKH: 1,
          maLop: 1,
          maNTH: 1,
          maCa: 1,
          soLuongDuKien: 1,
          soLuongHienTai: 1,
          "khoaHoc.tenKH": 1,
          "lopHoc.tenLop": 1,
          "lopHoc.maCT": 1,
          "ca.thoiGian": 1,
          "ngayHoc.nhomThu": 1,
        },
      },
    ]);
    return {
      EC: 0,
      MS: "Lấy thành công danh sách lớp khóa!",
      DT: lopKhoaList,
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

const getLopKhoaByKhoaHoc = async (query, maKH) => {
  try {
    // const limit = query.limit ? +query.limit : 0;
    // const LopKhoaList = await LopKhoa.find().limit(limit);
    const lopKhoaList = await LopKhoa.aggregate([
      {
        $match: {
          maKH: maKH,
        },
      },
      {
        $lookup: {
          from: "khoahocs",
          localField: "maKH",
          foreignField: "maKH",
          as: "khoaHoc",
        },
      },
      {
        $unwind: "$khoaHoc",
      },
      {
        $lookup: {
          from: "lophocs",
          localField: "maLop",
          foreignField: "maLop",
          as: "lopHoc",
        },
      },
      {
        $unwind: "$lopHoc",
      },
      {
        $lookup: {
          from: "cahocs",
          localField: "maCa",
          foreignField: "maCa",
          as: "ca",
        },
      },
      {
        $unwind: "$ca",
      },
      {
        $lookup: {
          from: "nhomthuhocs",
          localField: "maNTH",
          foreignField: "maNTH",
          as: "ngayHoc",
        },
      },
      {
        $unwind: "$ngayHoc",
      },
      {
        $project: {
          _id: 1,
          maLK: 1,
          maKH: 1,
          maLop: 1,
          maNTH: 1,
          maCa: 1,
          soLuongDuKien: 1,
          soLuongHienTai: 1,
          thoiLuong: 1,
          hocPhi: 1,
          "khoaHoc.tenKH": 1,
          "lopHoc.tenLop": 1,
          "lopHoc.maCT": 1,
          "ca.thoiGian": 1,
          "ngayHoc.nhomThu": 1,
        },
      },
    ]);

    return {
      EC: 0,
      MS: "Lấy thành công danh sách lớp khóa!",
      DT: lopKhoaList,
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

const updateLopKhoa = async (maLK, data) => {
  try {
    const filter = { maLK: maLK };
    const update = { $set: data };
    // console.log("filter", filter);

    const lopKhoa = await LopKhoa.findOne(filter);
    if (update.soLuongDuKien <= 0) {
      return {
        EC: 1,
        MS: `Số lượng học viên không phù hợp...`,
        DT: "",
      };
    } else if (lopKhoa.soLuongHienTai > update.soLuongDuKien) {
      return {
        EC: 2,
        MS: `Số lượng học viên hiện tại là ${lopKhoa.soLuongHienTai}. Hãy nhập số lượng lớn hơn`,
        DT: "",
      };
    }

    const updatedLopKhoa = await LopKhoa.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (!updatedLopKhoa)
      return {
        EC: 3,
        MS: "Không tìm thấy lớp khóa...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã cập nhật thông tin lớp khóa!",
      DT: updatedLopKhoa,
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

const deleteLopKhoa = async (maLK) => {
  try {
    const filter = { maLK: maLK };

    const lopKhoa = await LopKhoa.findOne(filter);

    if (lopKhoa.soLuongHienTai > 0) {
      return {
        EC: 1,
        MS: "Lớp khóa đã có người đăng ký. Không thể xóa",
        DT: "",
      };
    }

    const deletedLopKhoa = await LopKhoa.findOneAndDelete(filter);
    // console.log(deletedLopKhoa);
    if (!deletedLopKhoa)
      return {
        EC: 2,
        MS: "Không tìm thấy lớp khóa...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã xóa lớp khóa!",
      DT: deletedLopKhoa,
    };
  } catch (err) {
    console.log(err);
    return {
      EC: -1,
      MS: "Somefthing wrong...",
      DT: "",
    };
  }
};

const findLopKhoa = async (maLK) => {
  try {
    const filter = { maLK: maLK };
    const lopKhoa = await LopKhoa.find(filter);
    if (!lopKhoa) {
      return {
        EC: 1,
        MS: `Không tìm thấy lớp khóa ${maLK}...`,
        DT: "",
      };
    }
    return {
      EC: 0,
      MS: "Tìm thấy lớp khóa!",
      DT: lopKhoa,
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
  createLopKhoa,
  updateLopKhoa,
  deleteLopKhoa,
  getLopKhoa,
  getLopKhoaByKhoaHoc,
  findLopKhoa,
};
