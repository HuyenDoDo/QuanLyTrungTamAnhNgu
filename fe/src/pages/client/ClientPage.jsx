import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/client/Navbar/Navbar";
import "./ClientPage.scss";
import { useState, useEffect } from "react";
import { getChuongTrinh } from "../../services/ChuongTrinhService";
import { useDispatch, useSelector } from "react-redux";
import { getHocVienLoginRedux } from "../../redux/apiCalls";
import { hocVienLogout } from "../../services/AuthService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ClientPage = () => {
  const navigate = useNavigate();
  //--Khai báo state--
  const [chuongTrinhList, setChuongTrinhList] = useState([]);
  const { loggedIn } = useSelector((state) => state.hocVien);
  //---Khai báo state---

  //--Gọi API--
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      getHocVienLoginRedux(dispatch);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getChuongTrinh();
        setChuongTrinhList(res.data.DT);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  //---Gọi API---

  //--Định nghĩa hàm--
  const handleLogout = async () => {
    try {
      await hocVienLogout();
      getHocVienLoginRedux(dispatch);
      toast.success("Logged out");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  //---Định nghĩa hàm---

  return (
    <div className="client-page-container bg-light min-vh-100">
      <div className="auth-block bg-white">
        {loggedIn ? (
          <>
            <span>
              <Link
                className="custom-link"
                style={{ color: "#7e7f7a" }}
                to={"/account"}
              >
                Tài khoản
              </Link>
            </span>
            <span
              style={{ cursor: "pointer", color: "#7e7f7a", fontWeight: "600" }}
              onClick={() => handleLogout()}
            >
              Đăng xuất
            </span>
          </>
        ) : (
          <>
            <span>
              <Link className="custom-link" to={"/regist"}>
                Đăng ký
              </Link>
            </span>
            <span>
              <Link className="custom-link" to={"/login"}>
                Đăng nhập
              </Link>
            </span>
          </>
        )}
      </div>
      <Navbar chuongTrinhList={chuongTrinhList} />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default ClientPage;
