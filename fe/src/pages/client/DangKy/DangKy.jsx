import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DangKy.scss";
import { toast } from "react-toastify";
import {
  checkEmail,
  checkEmptyInput,
  checkName,
  checkNumeric,
} from "../../../Utils/check";
import { hocVienRegist } from "../../../services/AuthService";
import { useSelector } from "react-redux";
import { switchKeytoWords } from "../../../Utils/convert";

const DangKy = () => {
  const { loggedIn } = useSelector((state) => state.hocVien);
  const navigate = useNavigate();

  const hocVienDefault = {
    hoTenLot: "",
    ten: "",
    email: "",
    sdt: "",
    password: "",
  };
  //--khai báo state--
  const [hocVien, setHocVien] = useState(hocVienDefault);
  const [confirmPass, setConfirmPass] = useState("");
  //---khai báo state---

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  //--định nghĩa hàm--

  const handleChange = (e) => {
    setHocVien((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkValid = (hocVien) => {
    if (!checkName(hocVien.hoTenLot)) {
      toast.warning("Tên không chứa số và ký tự đặc biệt");
      return false;
    }
    if (!checkName(hocVien.ten)) {
      toast.warning("Tên không chứa số và ký tự đặc biệt");
      return false;
    }
    if (!checkEmail(hocVien.email)) {
      toast.warning("Email không phù hợp");
      return false;
    }
    if (!checkNumeric(hocVien.sdt)) {
      toast.warning("Số điện thoại không phù hợp");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // console.log(hocVien);
    // e.preventDefault();
    const emptyInput = checkEmptyInput(hocVien);
    if (emptyInput) {
      let mes = switchKeytoWords(emptyInput);
      toast.warning(`Bạn chưa nhập ${mes}`);
      return;
    }

    if (!confirmPass) {
      toast.warning("Bạn chưa nhập xác nhận mật khẩu");
      return;
    }

    if (!checkValid(hocVien)) {
      return;
    }

    if (confirmPass !== hocVien.password) {
      toast.warning("Xác nhận mật khẩu không đúng");
      return;
    }

    try {
      const res = await hocVienRegist(hocVien);
      // console.log(res.data.DT);
      if (res && res.data.EC === 0) {
        toast.success(res.data.MS);
        navigate("/login");
      } else if (res.data.EC > 0) {
        toast.error(res.data.MS);
      } else {
        toast.warning(res.data.DT.MS);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(hocVien);
  };
  //---định nghĩa hàm---

  return (
    <div className="register-container">
      <div className="register-wrapper my-5 bg-white rounded-3">
        <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
        <div className="row">
          <div className="col-12 form-group mb-3">
            <label className="form-label">Họ:</label>
            <input
              className="form-control"
              name="hoTenLot"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 form-group mb-3">
            <label className="form-label">Tên:</label>
            <input
              className="form-control"
              name="ten"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 form-group mb-3">
            <label className="form-label">Email:</label>
            <input
              type={"email"}
              className="form-control"
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 form-group mb-3">
            <label className="form-label">Số điện thoại:</label>
            <input
              className="form-control"
              name="sdt"
              maxLength={10}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 form-group mb-3">
            <label className="form-label">Mật khẩu:</label>
            <input
              type={"password"}
              className="form-control"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 form-group mb-3">
            <label className="form-label">Xác nhận mật khẩu:</label>
            <input
              type={"password"}
              className="form-control"
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mb-3">
          <Link className="text-decoration-none" to={"/login"}>
            Bạn đã có tài khoản?
          </Link>
        </div>
        <button
          className="btn btn-primary text-white col-12"
          onClick={() => handleSubmit()}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default DangKy;
