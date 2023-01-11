const PhieuDangKy = require("../models/PhieuDangKy");
const ChiTietPDK = require("../models/ChiTietPDK");
const LopKhoa = require("../models/LopKhoa");

const createPhieuDangKyV3 = async (maHV, data) => {
  try {
    const { dsDangKy } = data;
    const maLKs = dsDangKy.map((item) => item.maLK);
    console.log(maLKs);
    const res = await LopKhoa.bulkWrite([
      {
        updateMany: {
          filter: { maLK: { $in: maLKs } },
          update: { $inc: { soLuongHienTai: 1 } },
        },
      },
    ]);
    return {
      EC: 0,
      MS: "",
      DT: res,
    };
  } catch (error) {
    console.log(error);
  }
};

const capNhatSoLuongHienTai = async (maLKs) => {
  try {
    const res = await LopKhoa.bulkWrite([
      {
        updateMany: {
          filter: { maLK: { $in: maLKs } },
          update: { $inc: { soLuongHienTai: 1 } },
        },
      },
    ]);
    return res.modifiedCount;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const createPhieuDangKyV2 = async (maHV, data) => {
  try {
    const { dsDangKy } = data;
    let nonFullLopKhoas = [];
    let fullLopKhoas = [];
    const maLKs = dsDangKy.map((item) => {
      return item.maLK;
    });
    const lopKhoas = await LopKhoa.find({ maLK: { $in: maLKs } });
    for (const lopKhoa of lopKhoas) {
      if (lopKhoa.soLuongDuKien > lopKhoa.soLuongHienTai) {
        nonFullLopKhoas.push(lopKhoa.maLK);
      } else {
        fullLopKhoas.push(lopKhoa.maLK);
      }
    }
    // console.log("full", fullLopKhoas);
    // console.log("not full", nonFullLopKhoas);

    if (nonFullLopKhoas && nonFullLopKhoas.length > 0) {
      for (const maLK of nonFullLopKhoas) {
        console.log(maLK + `_ex`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const createPhieuDangKy = async (maHV, data) => {
  try {
    // console.log(maHV);
    const { dsDangKy, tongHocPhi } = data;

    //Kiểm tra ds đăng ký lớp khóa của 1 học viên
    if (dsDangKy && dsDangKy.length > 0) {
      const chiTietList = await ChiTietPDK.aggregate([
        {
          $lookup: {
            from: "phieudangkies",
            localField: "maPDK",
            foreignField: "_id",
            as: "phieuDangKy",
          },
        },
        {
          $unwind: "$phieuDangKy",
        },
        {
          $match: {
            "phieuDangKy.maHV": maHV,
          },
        },
        {
          $lookup: {
            from: "lopkhoas",
            localField: "maLK",
            foreignField: "maLK",
            as: "lopKhoa",
          },
        },
        {
          $unwind: "$lopKhoa",
        },
        {
          $lookup: {
            from: "lophocs",
            localField: "lopKhoa.maLop",
            foreignField: "maLop",
            as: "lopHoc",
          },
        },
        {
          $unwind: "$lopHoc",
        },
        {
          $lookup: {
            from: "khoahocs",
            localField: "lopKhoa.maKH",
            foreignField: "maKH",
            as: "khoaHoc",
          },
        },
        {
          $unwind: "$khoaHoc",
        },
      ]);

      //check 1: Nếu cùng maLK thì ko cho đăng ký, ngược lại thì qua check2
      //check 2: nếu cùng khóa học mà cùng mã lớp thì ko cho đăng ký,
      //ngược lại, cùng khóa học mà khác mã lớp thì cho đăng ký
      let check1 = [];
      let check2 = [];
      for (const dk of dsDangKy) {
        for (const chiTiet of chiTietList) {
          if (chiTiet.maLK === dk.maLK) {
            check1.push({
              tenLop: chiTiet.lopHoc.tenLop,
              tenKhoa: chiTiet.khoaHoc.tenKH,
            });
          }
          if (
            chiTiet.khoaHoc.maKH === dk.maKH &&
            chiTiet.lopHoc.maLop === dk.maLop
          ) {
            check2.push({
              tenLop: chiTiet.lopHoc.tenLop,
              tenKhoa: chiTiet.khoaHoc.tenKH,
            });
          }
        }
      }

      if (check1 && check1.length > 0) {
        return {
          EC: 1,
          MS: `Bạn đã đăng ký lớp`,
          DT: check1,
        };
      }

      if (check2 && check2.length > 0) {
        return {
          EC: 2,
          MS: `Bạn đã đăng ký lớp`,
          DT: check2,
        };
      }

      const newPhieuDangKy = new PhieuDangKy({
        maHV: maHV,
        tongHocPhi: tongHocPhi,
      });

      //Lưu phiếu đăng ký mới vào CSDL
      const savedPhieuDangKy = await newPhieuDangKy.save();

      //kiểm tra số lượng học viên dự tính và số lượng học viên hiện có
      let nonFullLopKhoas = [];
      let fullLopKhoas = [];

      //lấy ra các maLK trong danh sách đăng ký
      const maLKs = dsDangKy.map((item) => {
        return item.maLK;
      });

      //lấy ra danh sách lớp khóa và kiểm tra số lượng còn hay hết
      const lopKhoas = await LopKhoa.find({ maLK: { $in: maLKs } });
      for (const lopKhoa of lopKhoas) {
        if (lopKhoa.soLuongDuKien > lopKhoa.soLuongHienTai) {
          nonFullLopKhoas.push(lopKhoa.maLK);
        } else {
          fullLopKhoas.push(lopKhoa);
        }
      }

      let savedChiTietPdksNonFull = [];
      //Dùng danh sách đăng ký còn chỗ để lưu vào csdl
      if (nonFullLopKhoas && nonFullLopKhoas.length > 0) {
        const newChiTietPdks = nonFullLopKhoas.map((value) => {
          return {
            maPDK: savedPhieuDangKy._id,
            maLK: value,
          };
        });
        savedChiTietPdksNonFull = await ChiTietPDK.insertMany(newChiTietPdks);

        const res = await capNhatSoLuongHienTai(nonFullLopKhoas);
        if (res < 0) {
          console.log(`Cập nhật thất bại`);
        } else {
          console.log(`Có ${res} cập nhật`);
        }
      }

      let savedChiTietPdksFull = [];
      //Dùng danh sách đăng ký hết chỗ để lưu vào csdl
      if (fullLopKhoas && fullLopKhoas.length > 0) {
        //clone các lớp khóa hết chỗ ra trước và tạo các lớp khóa này
        const cloneLopKhoas = fullLopKhoas.map((value) => {
          return {
            maLK: value.maLK + "_ex",
            hocPhi: value.hocPhi,
            soLuongDuKien: value.soLuongDuKien,
            soLuongHienTai: 0,
            thoiLuong: value.thoiLuong,
            maLop: value.maLop,
            maKH: value.maKH,
            maCa: value.maCa,
            maNTH: value.maNTH,
          };
        });

        // console.log("cloneLopKhoas", cloneLopKhoas);
        const newLopKhoas = await LopKhoa.insertMany(cloneLopKhoas);

        const newChiTietPdks = newLopKhoas.map((value) => {
          return {
            maPDK: savedPhieuDangKy._id,
            maLK: value.maLK,
          };
        });

        savedChiTietPdksFull = await ChiTietPDK.insertMany(newChiTietPdks);

        const maLKs = newLopKhoas.map((value) => value.maLK);

        const res = await capNhatSoLuongHienTai(maLKs);
        if (res < 0) {
          console.log(`Cập nhật thất bại`);
        } else {
          console.log(`Có ${res} cập nhật`);
        }
      }

      return {
        EC: 0,
        MS: "Đăng ký lớp thành công",
        DT: {
          phieuDangKy: savedPhieuDangKy._doc,
          chiTietPDK: [...savedChiTietPdksNonFull, ...savedChiTietPdksFull],
        },
      };
    } else {
      return {
        EC: 1,
        MS: "Bạn chưa chọn lớp",
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EC: -1,
      MS: "something wrong...",
      DT: "",
    };
  }
};

const getPhieuDangKy = async (query) => {
  try {
    const limit = query.limit ? +query.limit : 0;
    const pdkList = await PhieuDangKy.find().limit(limit);
    return {
      EC: 0,
      MS: "Lấy thành công danh sách phiếu đăng ký!",
      DT: pdkList,
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

const getChiTietPdk = async (query, maPDK) => {
  try {
    const limit = query.limit ? +query.limit : 0;
    const chiTietPdkList = await ChiTietPDK.find({ maPDK: maPDK }).limit(limit);
    return {
      EC: 0,
      MS: "Lấy thành công danh sách chi tiết phiếu đăng ký!",
      DT: chiTietPdkList,
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
  createPhieuDangKy,
  getPhieuDangKy,
  getChiTietPdk,
};
