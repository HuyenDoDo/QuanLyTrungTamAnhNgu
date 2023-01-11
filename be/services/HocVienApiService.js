const HocVien = require("../models/HocVien");
const PhieuDangKy = require("../models/PhieuDangKy");
const bCrypt = require("bcryptjs");

const updatePassword = async (maHV, data) => {
  try {
    let { newPsw, oldPsw } = data;
    console.log(oldPsw);
    let hocVien = await HocVien.findById(maHV);

    let isMatch = await bCrypt.compare(oldPsw, hocVien.password);

    if (!isMatch) {
      return {
        EC: 1,
        MS: "Sai mật khẩu cũ...",
        DT: "",
      };
    }

    let hashedPsw = await bCrypt.hash(newPsw, 12);

    const filter = { maHV: maHV };
    const update = { password: hashedPsw };
    const updatedPsw = await HocVien.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (!updatedPsw) {
      return {
        EC: 2,
        MS: "Cập nhật mật khẩu thất bại...",
        DT: "",
      };
    }
    return {
      EC: 0,
      MS: "Cập nhật mật khẩu thành công!",
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    };
  }
};

const updateAccHocVien = async (hocVien, data) => {
  try {
    console.log(hocVien._id);

    const existedPhone = await HocVien.findOne({ sdt: data.sdt });
    if (existedPhone && existedPhone.sdt !== hocVien.sdt) {
      return {
        EC: 1,
        MS: "Trùng số điện thoại...",
        DT: "",
      };
    }

    const existedEmail = await HocVien.findOne({ email: data.email });
    if (existedEmail && existedEmail.email !== hocVien.email) {
      return {
        EC: 2,
        MS: "Trùng email...",
        DT: "",
      };
    }

    //cập nhật chương trình
    const filter = { _id: hocVien._id };
    if (data.gioiTinh === "female") {
      data.gioiTinh = false;
    } else {
      data.gioiTinh = true;
    }
    const update = { ...data };
    const updatedHocVien = await HocVien.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!updatedHocVien) {
      return {
        EC: 3,
        MS: "Cập nhật thông tin thất bại!",
        DT: "",
      };
    }

    return {
      EC: 0,
      MS: "Cập nhật thông tin thành công!",
      DT: updatedHocVien,
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

const getRegistedLopKhoa = async (maHV) => {
  try {
    const res = await PhieuDangKy.aggregate([
      {
        $match: { maHV: maHV },
      },
      {
        $lookup: {
          let: { maPDK: "$_id" }, //_id from PhieuDangKy table
          from: "chitietpdks",
          as: "chiTiet",
          pipeline: [
            {
              $match: {
                $expr: [{ $and: [{ $eq: ["$maPDK", "$$maPDK"] }] }],
              },
            },
            {
              $lookup: {
                from: "lopkhoas",
                as: "lopKhoa",
                let: { maLK: "$maLK" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $and: [{ $eq: ["$maLK", "$$maLK"] }] },
                    },
                  },
                  {
                    $lookup: {
                      let: { maKH: "$maKH" },
                      from: "khoahocs",
                      as: "khoaHoc",
                      pipeline: [
                        {
                          $match: {
                            $expr: { $and: [{ $eq: ["$maKH", "$$maKH"] }] },
                          },
                        },
                      ],
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
                        {
                          $lookup: {
                            let: { maCT: "$maCT" },
                            from: "chuongtrinhs",
                            as: "chuongTrinh",
                            pipeline: [
                              {
                                $match: {
                                  $expr: {
                                    $and: [{ $eq: ["$maCT", "$$maCT"] }],
                                  },
                                },
                              },
                            ],
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
          ],
        },
      },
    ]);
    return {
      EC: 0,
      MS: "Lấy danh sách thành công",
      DT: res,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: -1,
      MS: "Something wrong...",
      DT: "",
    };
  }
};

// B1: kiểm tra rỗng bên controller
// B2: kiểm tra trùng mà
// B3: kiểm tra trùng tên
// B4: save lại
const createHocVien = async (data) => {
  try {
    const existEmail = await HocVien.findOne({ email: data.email });
    if (existEmail) {
      return {
        EC: 1,
        MS: "Trùng Email...",
        DT: "",
      };
    }

    const existPhone = await HocVien.findOne({ sdt: data.sdt });
    if (existPhone) {
      return {
        EC: 2,
        MS: "Trùng số điện thoại...",
        DT: "",
      };
    }

    const hashedPsw = await bCrypt.hash("123", 12);

    const newHocVien = new HocVien({
      ...data,
      password: hashedPsw,
      gioiTinh: data.gioiTinh === "male" ? true : false,
    });
    const savedHocVien = await newHocVien.save();
    if (!savedHocVien)
      return {
        EC: 3,
        MS: "Thêm mới học viên không thành công...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã thêm mới học viên!",
      DT: savedHocVien,
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

const getHocVien = async (query) => {
  try {
    const limit = query.limit ? +query.limit : 0;
    const hocVienList = await HocVien.find().limit(limit);
    // console.log(chuongTrinhList);
    return {
      EC: 0,
      MS: "Lấy thành công danh sách học vien!",
      DT: hocVienList,
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

const updateHocVien = async (maHV, data) => {
  try {
    const existEmail = await HocVien.findOne({ email: data.email });
    console.log(existEmail._id.toString());
    if (existEmail && existEmail._id.toString() !== maHV) {
      return {
        EC: 1,
        MS: "Trùng Email...",
        DT: "",
      };
    }

    const existPhone = await HocVien.findOne({ sdt: data.sdt });
    if (existPhone && existPhone._id.toString() !== maHV) {
      return {
        EC: 2,
        MS: "Trùng số điện thoại...",
        DT: "",
      };
    }

    // //Kiểm tra maCT trong param có tồn tại trên CSDL ko
    // const hocVien_param = await HocVien.findOne({ maHV: maHV_param });
    // if (!hocVien_param) {
    //   return {
    //     EC: 1,
    //     MS: "Không tìm thấy học vien...",
    //     DT: "",
    //   };
    // }

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
    const filter = { _id: maHV };
    const update = {
      ...data,
      gioiTinh: data.gioiTinh === "male" ? true : false,
    };
    const updatedHocVien = await HocVien.findOneAndUpdate(filter, update, {
      new: true,
    });
    return {
      EC: 0,
      MS: "Đã cập nhật thông tin học vien!",
      DT: updatedHocVien,
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

const deleteHocVien = async (maHV) => {
  try {
    // const lopHoc = await LopHoc.findOne({ maCT: maCT });
    // if (lopHoc) {
    //   return {
    //     EC: 1,
    //     MS: "Chương trình chứa lớp học, không thể xóa...",
    //     DT: "",
    //   };
    // }
    const filter = { _id: maHV };
    const deletedHocVien = await HocVien.findOneAndDelete(filter);
    if (!deletedHocVien)
      return {
        EC: 2,
        MS: "Không tìm thấy học vien...",
        DT: "",
      };
    return {
      EC: 0,
      MS: "Đã xóa học vien!",
      DT: deletedHocVien,
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

const findHocVien = async (maHV) => {
  try {
    const filter = { maHV: maHV };
    const hocVien = await HocVien.findOne(filter);
    if (!hocVien) {
      return {
        EC: 1,
        MS: `Không tìm thấy học vien ${maHV}...`,
        DT: "",
      };
    }
    return {
      EC: 0,
      MS: "Tìm thấy học vien!",
      DT: hocVien,
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
  updateAccHocVien,
  updatePassword,
  getRegistedLopKhoa,
  createHocVien,
  updateHocVien,
  deleteHocVien,
  getHocVien,
  findHocVien,
};
