import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import {
  updateHocVienAcc,
  updateHocVienPsw,
} from "../../../services/HocVienService";
import { getHocVienLoginRedux } from "../../../redux/apiCalls";
import {
  checkEmail,
  checkEmptyInput,
  checkName,
  checkNumeric,
} from "../../../Utils/check";
import { switchKeytoWords } from "../../../Utils/convert";

const HocVienAcc = () => {
  const hocVienDefault = {
    hoTenLot: "",
    ten: "",
    email: "",
    sdt: "",
    diaChi: "",
  };
  const dispatch = useDispatch();
  const { loggedIn, currentHocVien } = useSelector((state) => state.hocVien);
  const navigate = useNavigate();

  //--Khai bao state--
  const [hocVien, setHocVien] = useState(hocVienDefault);
  const [oldPsw, setOldPsw] = useState("");
  const [confirmPsw, setConfirmPsw] = useState("");
  const [newPsw, setNewPsw] = useState("");
  const [gender, setGender] = useState("female");
  const [birthday, setBirthday] = useState(new Date());

  const [updateMode, setUpdateMode] = useState(false);
  const [updatePswMode, setUpdatePswMode] = useState(false);
  //---Khai bao state---

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      setHocVien({
        hoTenLot: currentHocVien.hoTenLot ? currentHocVien.hoTenLot : "",
        ten: currentHocVien.ten ? currentHocVien.ten : "",
        email: currentHocVien.email ? currentHocVien.email : "",
        sdt: currentHocVien.sdt ? currentHocVien.sdt : "",
        diaChi: currentHocVien.diaChi ? currentHocVien.diaChi : "",
      });
      setBirthday(
        currentHocVien.ngaySinh ? currentHocVien.ngaySinh : new Date()
      );
      setGender(currentHocVien.gioiTinh ? "male" : "female");
    }
  }, [loggedIn, navigate, currentHocVien]);

  const handleChange = (e) => {
    setHocVien((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseUpdateMode = () => {
    setUpdateMode(false);
    resetHocVien();
  };

  const resetHocVien = () => {
    setHocVien({
      hoTenLot: currentHocVien.hoTenLot ? currentHocVien.hoTenLot : "",
      ten: currentHocVien.ten ? currentHocVien.ten : "",
      email: currentHocVien.email ? currentHocVien.email : "",
      sdt: currentHocVien.sdt ? currentHocVien.sdt : "",
      diaChi: currentHocVien.diaChi ? currentHocVien.diaChi : "",
    });
    setBirthday(currentHocVien.ngaySinh ? currentHocVien.ngaySinh : new Date());
    setGender(currentHocVien.gioiTinh ? "male" : "female");
  };

  const handleCloseUpdatePsw = () => {
    setUpdatePswMode(false);
    resetPsw();
  };

  const resetPsw = () => {
    setNewPsw("");
    setConfirmPsw("");
    setOldPsw("");
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

  const handleUpdateAcc = async () => {
    const updateAcc = { ...hocVien, ngaySinh: birthday, gioiTinh: gender };

    const emptyInput = checkEmptyInput(updateAcc);
    if (emptyInput) {
      let mes = switchKeytoWords(emptyInput);
      toast.warning(`Bạn chưa nhập ${mes}`);
      return;
    }

    if (!checkValid(updateAcc)) {
      return;
    }

    try {
      const res = await updateHocVienAcc(updateAcc);
      if (res.data.EC === 0) {
        toast.success(res.data.MS);
        handleCloseUpdateMode();
        getHocVienLoginRedux(dispatch);
      } else if (res.data.EC > 0) {
        toast.warning(res.data.MS);
      } else {
        toast.error(res.data.MS);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePsw = async () => {
    if (!newPsw) {
      toast.warning("Bạn chưa nhập mật khẩu mới");
      return;
    }
    if (!confirmPsw) {
      toast.warning("Bạn chưa xác nhận mật khẩu mới");
      return;
    }
    if (!oldPsw) {
      toast.warning("Bạn chưa nhập mật khẩu cũ");
      return;
    }

    if (confirmPsw !== newPsw) {
      toast.warning("Bạn xác nhận mật khẩu sai");
      return;
    }

    try {
      const res = await updateHocVienPsw({ newPsw: newPsw, oldPsw: oldPsw });
      if (res.data.EC === 0) {
        toast.success(res.data.MS);
        handleCloseUpdatePsw();
      } else if (res.data.EC > 0) {
        toast.warning(res.data.MS);
      } else {
        toast.error(res.data.MS);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="account-container py-5">
      <div className="container">
        <div className="row">
          <div className="left col-3 shadow bg-white rounded-1 me-1 text-center">
            <div className="row border-bottom shadow-sm p-3">
              <div className="col-12">
                <Link
                  className="text-primary"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                  to="/lich-su-dang-ky"
                >
                  Khóa học đã đăng ký
                </Link>
              </div>
            </div>
          </div>
          <div className="right col-8">
            <div className="right-top row shadow bg-white rounded-1 p-3">
              <div className="row g-2 mb-3">
                <div className="col-3 text-end">
                  <label className="col-form-label">Họ:</label>
                </div>
                <div className="col-6">
                  <input
                    className="form-control"
                    type={"text"}
                    name="hoTenLot"
                    value={hocVien.hoTenLot}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    readOnly={!updateMode}
                  />
                </div>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-3 text-end">
                  <label className="col-form-label">Tên:</label>
                </div>
                <div className="col-6">
                  <input
                    className="form-control"
                    name="ten"
                    type={"text"}
                    value={hocVien.ten}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    readOnly={!updateMode}
                  />
                </div>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-3 text-end">
                  <label className="col-form-label">Ngày sinh:</label>
                </div>
                <div className="col-6">
                  <DatePicker
                    className="form-control"
                    selected={new Date(birthday)}
                    onChange={(date) => setBirthday(date)}
                    dateFormat="dd/MM/yyyy"
                    showTimeSelect
                    readOnly={!updateMode}
                  />
                </div>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-3"></div>
                <div className="col-9 d-flex">
                  <div className="form-check mx-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="male"
                      onChange={() => {
                        setGender("male");
                      }}
                      checked={gender === "male"}
                      disabled={!updateMode}
                    />
                    <label className="form-check-label" htmlFor="maleRadio">
                      Nam
                    </label>
                  </div>
                  <div className="form-check mx-1">
                    <input
                      className="form-check-input"
                      name="female"
                      type="radio"
                      onChange={() => {
                        setGender("female");
                      }}
                      checked={gender === "female"}
                      disabled={!updateMode}
                    />
                    <label className="form-check-label" htmlFor="femaleRadio">
                      Nữ
                    </label>
                  </div>
                </div>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-3 text-end">
                  <label className="col-form-label">Email:</label>
                </div>
                <div className="col-6">
                  <input
                    className="form-control"
                    type={"text"}
                    name="email"
                    value={hocVien.email}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    readOnly={!updateMode}
                  />
                </div>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-3 text-end">
                  <label className="col-form-label">Số điện thoại:</label>
                </div>
                <div className="col-6">
                  <input
                    className="form-control"
                    type={"text"}
                    name="sdt"
                    value={hocVien.sdt}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    readOnly={!updateMode}
                  />
                </div>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-3 text-end">
                  <label className="col-form-label">Địa chỉ:</label>
                </div>
                <div className="col-6">
                  <input
                    className="form-control"
                    name="diaChi"
                    type={"text"}
                    value={hocVien.diaChi ? hocVien.diaChi : ""}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    readOnly={!updateMode}
                  />
                </div>
              </div>
              <div className="row">
                {updateMode ? (
                  <>
                    <div className="col-9 text-end">
                      <button
                        className="btn btn-secondary me-3"
                        onClick={() => {
                          handleCloseUpdateMode();
                        }}
                      >
                        Hủy
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleUpdateAcc();
                        }}
                      >
                        Lưu
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="col-12 text-center">
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setUpdateMode(true)}
                    >
                      Cập nhật tài khoản
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="right-bottom row shadow bg-white rounded-1 p-3 mt-1">
              {updatePswMode ? (
                <>
                  <div className="row g-2 mb-3">
                    <div className="col-3 text-end">
                      <label className="col-form-label">Mật khẩu mới:</label>
                    </div>
                    <div className="col-6">
                      <input
                        className="form-control"
                        type={"password"}
                        name="newPsw"
                        value={newPsw}
                        onChange={(e) => {
                          setNewPsw(e.target.value);
                        }}
                        // readOnly={!updateMode}
                      />
                    </div>
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-3 text-end">
                      <label className="col-form-label">
                        Xác nhận mật khẩu:
                      </label>
                    </div>
                    <div className="col-6">
                      <input
                        className="form-control"
                        type={"password"}
                        name="confirmPsw"
                        value={confirmPsw}
                        onChange={(e) => {
                          setConfirmPsw(e.target.value);
                        }}
                        // readOnly={!updateMode}
                      />
                    </div>
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-3 text-end">
                      <label className="col-form-label">Mật khẩu cũ:</label>
                    </div>
                    <div className="col-6">
                      <input
                        className="form-control"
                        type={"password"}
                        name="oldPsw"
                        value={oldPsw}
                        onChange={(e) => {
                          setOldPsw(e.target.value);
                        }}
                        // readOnly={!updateMode}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-9 text-end">
                      <button
                        className="btn btn-secondary me-3"
                        onClick={() => {
                          handleCloseUpdatePsw();
                        }}
                      >
                        Hủy
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleUpdatePsw();
                        }}
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-12 text-center">
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => setUpdatePswMode(true)}
                  >
                    Đổi mật khẩu
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HocVienAcc;
