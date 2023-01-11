const express = require("express");
const router = express.Router();
//import controller here
const ChuongTrinhController = require("../controllers/ChuongTrinhController");
const LopHocController = require("../controllers/LopHocController");
const KhoaHocController = require("../controllers/KhoaHocController");
const LopKhoaController = require("../controllers/LopKhoaController");
const CaHocController = require("../controllers/CaHocController");
const NhomThuHocController = require("../controllers//NhomThuHocController");
const AuthController = require("../controllers/AuthController");
const PhieuDangKyController = require("../controllers/PhieuDangKyController");
const HocVienController = require("../controllers/HocVienController");
const GiangVienController = require("../controllers/GiangVienController");
const isAuth = require("../middlewares/isAuth");

initApiRoutes = (app, upload) => {
  //call controller here

  //Giảng viên route
  router.post("/giangvien/create", GiangVienController.createFunc);
  router.get("/giangvien/get", GiangVienController.getFunc);
  router.put("/giangvien/update/:id", GiangVienController.updateFunc);
  router.delete("/giangvien/delete/:id", GiangVienController.deleteFunc);
  router.get("/giangvien/find/:id", GiangVienController.findFunc);

  //hocVien Authenticate
  router.post("/hocvien/login", AuthController.hocVienLoginFunc);
  router.get("/hocvien/login", (req, res) => {
    if (req.session.hocVien) {
      let { _id, password, ...others } = req.session.hocVien;
      res.status(200).json({
        loggedIn: true,
        hocVien: others,
      });
    } else {
      res.status(200).json({ loggedIn: false });
    }
  });
  router.post("/hocvien/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
      res.status(200).json({ loggedIn: false });
    });
  });
  router.post("/hocvien/regist", AuthController.hocVienRegistFunc);

  //Học viên
  router.post("/hocvien/create", HocVienController.createFunc);
  router.get("/hocvien/get", HocVienController.getFunc);
  router.put("/hocvien/update/:id", HocVienController.updateFunc);
  router.delete("/hocvien/delete/:id", HocVienController.deleteFunc);
  router.get("/hocvien/find/:id", HocVienController.findFunc);

  router.put("/hocvien/update-acc", isAuth, HocVienController.updateAccFunc);
  router.put("/hocvien/update-psw", isAuth, HocVienController.updatePswFunc);
  router.get(
    "/hocvien/registed-history",
    isAuth,
    HocVienController.getRegistedLopKhoaFunc
  );

  //phiếu đăng ký
  router.post("/phieudangky/create", PhieuDangKyController.createFunc);
  router.get("/phieudangky", PhieuDangKyController.getFunc);

  //upload file
  router.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.body);
    res.status(200).json("File has been uploaded");
  });

  //chuong trinh routes
  router.post("/chuongtrinh/create", ChuongTrinhController.createFunc);
  router.get("/chuongtrinh", ChuongTrinhController.getFunc);
  router.get("/chuongtrinh/:id", ChuongTrinhController.findFunc);
  router.put("/chuongtrinh/update/:id", ChuongTrinhController.updateFunc);
  router.delete("/chuongtrinh/delete/:id", ChuongTrinhController.deleteFunc);

  //Khoa hoc routes
  router.post("/khoahoc/create", KhoaHocController.createFunc);
  router.get("/khoahoc", KhoaHocController.getFunc);
  router.get("/khoahoc/:id", KhoaHocController.findFunc);
  router.put("/khoahoc/update/:id", KhoaHocController.updateFunc);
  router.delete("/khoahoc/delete/:id", KhoaHocController.deleteFunc);
  router.get("/khoahoc/get/lopkhoa", KhoaHocController.getWithFunc);

  //Lop Khoa routes
  router.post("/lopkhoa/create", LopKhoaController.createFunc);
  router.get("/lopkhoa", LopKhoaController.getFunc);
  router.get("/lopkhoa/:id", LopKhoaController.findFunc);
  router.put("/lopkhoa/update/:id", LopKhoaController.updateFunc);
  router.delete("/lopkhoa/delete/:id", LopKhoaController.deleteFunc);

  //Lớp học route
  router.post("/lophoc/create", LopHocController.createFunc);
  router.get("/lophoc/get", LopHocController.getFunc);
  router.put("/lophoc/update/:id", LopHocController.updateFunc);
  router.delete("/lophoc/delete/:id", LopHocController.deleteFunc);
  router.get("/lophoc/find/:id", LopHocController.findFunc);

  //Ca học route
  router.post("/cahoc/create", CaHocController.createFunc);
  router.get("/cahoc/get", CaHocController.getFunc);
  router.put("/cahoc/update/:id", CaHocController.updateFunc);
  router.delete("/cahoc/delete/:id", CaHocController.deleteFunc);
  router.get("/cahoc/find/:id", CaHocController.findFunc);

  //Nhóm thứ học route
  router.post("/nhomthuhoc/create", NhomThuHocController.createFunc);
  router.get("/nhomthuhoc/get", NhomThuHocController.getFunc);
  router.put("/nhomthuhoc/update/:id", NhomThuHocController.updateFunc);
  router.delete("/nhomthuhoc/delete/:id", NhomThuHocController.deleteFunc);
  router.get("/nhomthuhoc/find/:id", NhomThuHocController.findFunc);

  return app.use("/api", router);
};

module.exports = { initApiRoutes };
