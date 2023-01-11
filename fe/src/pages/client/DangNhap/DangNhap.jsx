import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hocVienLogin } from "../../../services/AuthService";
import { getHocVienLoginRedux } from "../../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { checkEmail } from "../../../Utils/check";

const Login = () => {
  const { loggedIn } = useSelector((state) => state.hocVien);
  const navigate = useNavigate();
  //--khai báo state--
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  //---khai báo state---

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  //--Định nghĩa hàm--
  const handleClick = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.warning("Bạn chưa nhập Email");
      return;
    }
    if (!password) {
      toast.warning("Bạn chưa nhập mật khẩu");
      return;
    }
    if (!checkEmail(email)) {
      toast.warning("Email không hợp lệ");
      return;
    }

    try {
      const res = await hocVienLogin({ email: email, password: password });
      if (res.data.EC === 0) {
        getHocVienLoginRedux(dispatch);
        navigate("/");
        toast.success(res.data.MS);
      } else if (res.data.EC > 0) {
        toast.error(res.data.MS);
      } else {
        toast.warning(res.data.MS);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //---Định nghĩa hàm---

  return (
    <div className="login-container">
      <div className="login-wrapper my-5 bg-white rounded-3">
        <h1>ĐĂNG NHẬP</h1>
        <form>
          <div className="row">
            <div className="col-12 form-group mb-3">
              <label className="form-label">Email:</label>
              <input
                type={"email"}
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Mật khẩu:</label>
              <input
                type={"password"}
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <span className="mb-1">
              <Link className="text-decoration-none" to={"/regist"}>
                Bạn chưa có tài khoản?
              </Link>
            </span>
            <span className="mb-3">
              <Link className="text-decoration-none" to={"/"}>
                Quên mật khẩu?
              </Link>
            </span>
          </div>
          <button
            type="button"
            className="btn btn-primary text-white col-12"
            onClick={(e) => handleClick(e)}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
