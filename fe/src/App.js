import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import SystemPage from "./pages/system/SystemPage";
import QuanLyChuongTrinh from "./pages/system/chuongTrinh/QuanLyChuongTrinh";
import QuanLyKhoaHoc from "./pages/system/khoaHoc/QuanLyKhoaHoc";
import QuanLyLopHoc from "./pages/system/lopHoc/QuanLyLopHoc";
import QuanLyLopKhoa from "./pages/system/lopKhoa/QuanLyLopKhoa";
import ClientPage from "./pages/client/ClientPage";
import Home from "./pages/client/Home/Home";
import QuanLyCaHoc from "./pages/system/caHoc/QuanLyCaHoc";
import QuanLyNhomThuHoc from "./pages/system/nhomThuHoc/QuanLyNhomThuHoc";
import ChuongTrinhContainer from "./pages/client/ChuongTrinhContainer/ChuongTrinhContainer";
import DangKy from "./pages/client/DangKy/DangKy";
import DangNhap from "./pages/client/DangNhap/DangNhap";
import DangKyLopKhoa from "./pages/client/DangKyLopKhoa/DangKyLopKhoa";
import QuanLyPhieuDangKy from "./pages/system/phieuDangKy/QuanLyPhieuDangKy";
import HocVienAcc from "./pages/client/HocVienAcc/HocVienAcc";
import RegistedHistory from "./pages/client/HocVienAcc/RegistedHistory/RegistedHistory";
import QuanLyHocVien from "./pages/system/hocVien/QuanLyHocVien";
import QuanLyGiangVien from "./pages/system/giangVien/QuanLyGiangVien";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClientPage />}>
          <Route index element={<Home />} />
          <Route path="chuongtrinh/:maCT" element={<ChuongTrinhContainer />} />
          <Route path="dang-ky-lop" element={<DangKyLopKhoa />} />
          <Route path="regist" element={<DangKy />} />
          <Route path="login" element={<DangNhap />} />
          <Route path="account" element={<HocVienAcc />} />
          <Route path="lich-su-dang-ky" element={<RegistedHistory />} />
        </Route>
        <Route path="system" element={<SystemPage />}>
          <Route path="chuongtrinh" element={<QuanLyChuongTrinh />} />
          <Route path="khoahoc" element={<QuanLyKhoaHoc />} />
          <Route path="phieudangky" element={<QuanLyPhieuDangKy />} />
          <Route path="khoahoc/:makh" element={<QuanLyLopKhoa />} />
          <Route path="lophoc" element={<QuanLyLopHoc />} />
          <Route path="cahoc" element={<QuanLyCaHoc />} />
          <Route path="nhomthuhoc" element={<QuanLyNhomThuHoc />} />
          <Route path="hocvien" element={<QuanLyHocVien />} />
          <Route path="giangvien" element={<QuanLyGiangVien />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
