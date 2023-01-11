const KhoaHoc = require("../models/KhoaHoc");
const LopKhoa = require("../models/LopKhoa");

const createKhoaHoc = async (data) => {
  try {
    let khoaHoc = await KhoaHoc.findOne({ maKH: data.maKH });
    if (khoaHoc) {
      return {
        EC: 1,
        MS: "Mã khóa học đã tồn tại",
        DT: "",
      };
    }
    // let findByName = await KhoaHoc.findOne({ tenKH: data.tenKH });
    // if (findByName) {
    //   return {
    //     EC: 2,
    //     MS: "Tên khóa học đã tồn tại",
    //     DT: "",
    //   };
    // }
    const newKhoaHoc = new KhoaHoc(data);
    const savedKhoaHoc = await newKhoaHoc.save();
    if (!savedKhoaHoc)
      return {
        EC: 2,
        MS: "Thêm mới khóa học không thành công...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã thêm mới khóa học!",
      DT: savedKhoaHoc,
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

const getKhoaHoc = async (query) => {
  try {
    const limit = query.limit ? +query.limit : 0;
    const KhoaHocList = await KhoaHoc.find().limit(limit);
    // console.log(KhoaHocList);
    return {
      EC: 0,
      MS: "Lấy thành công danh sách khóa học!",
      DT: KhoaHocList,
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

const updateKhoaHoc = async (maKH, data) => {
  try {
    const filter = { maKH: maKH };
    const update = { $set: data };
    const updatedKhoaHoc = await KhoaHoc.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (!updatedKhoaHoc)
      return {
        EC: 1,
        MS: "Không tìm thấy khóa học...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã cập nhật thông tin khóa học!",
      DT: updatedKhoaHoc,
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

const deleteKhoaHoc = async (maKH) => {
  try {
    const findLopKhoa = await LopKhoa.findOne({ maKH: maKH });
    if (findLopKhoa) {
      return {
        EC: 1,
        MS: "Khóa học chứa lớp khóa, không thể xóa",
        DT: "",
      };
    }
    const filter = { maKH: maKH };
    const deletedKhoaHoc = await KhoaHoc.findOneAndDelete(filter);
    console.log(deletedKhoaHoc);
    if (!deletedKhoaHoc)
      return {
        EC: 2,
        MS: "Không tìm thấy khóa học ...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã xóa khóa học!",
      DT: deletedKhoaHoc,
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

const findKhoaHoc = async (maKH) => {
  try {
    const filter = { maKH: maKH };
    const khoaHoc = await KhoaHoc.findOne(filter);
    if (!khoaHoc) {
      return {
        EC: 1,
        MS: `Không tìm thấy khóa học ${maKH}...`,
        DT: "",
      };
    }
    return {
      EC: 0,
      MS: "Tìm thấy khóa học!",
      DT: khoaHoc,
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

const getKhoaHocWithLopKhoa = async () => {
  try {
    const list = await KhoaHoc.aggregate([
      {
        $lookup: {
          let: { maKH: "$maKH" },
          from: "lopkhoas",
          as: "lopKhoa",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$maKH", "$$maKH"] },
                    { $gt: ["$soLuongDuKien", "$soLuongHienTai"] },
                  ],
                },
              },
            },
            {
              $lookup: {
                let: { maLop: "$maLop" },
                from: "lophocs",
                as: "lopHoc",
                pipeline: [
                  {
                    $match: {
                      $expr: { $and: [{ $eq: ["$maLop", "$$maLop"] }] },
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                let: { maCa: "$maCa" },
                from: "cahocs",
                as: "caHoc",
                pipeline: [
                  {
                    $match: {
                      $expr: { $and: [{ $eq: ["$maCa", "$$maCa"] }] },
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                let: { maNTH: "$maNTH" },
                from: "nhomthuhocs",
                as: "ngayHoc",
                pipeline: [
                  {
                    $match: {
                      $expr: { $and: [{ $eq: ["$maNTH", "$$maNTH"] }] },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ]);
    return {
      EC: 0,
      MS: "Lấy thành công danh sách khóa học",
      DT: list,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: -1,
      MS: "something wrong",
      DT: "",
    };
  }
};

module.exports = {
  createKhoaHoc,
  updateKhoaHoc,
  deleteKhoaHoc,
  getKhoaHoc,
  findKhoaHoc,
  getKhoaHocWithLopKhoa,
};
