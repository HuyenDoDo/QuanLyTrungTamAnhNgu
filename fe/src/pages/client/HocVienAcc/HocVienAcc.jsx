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
      toast.warning("T??n kh??ng ch???a s??? v?? k?? t??? ?????c bi???t");
      return false;
    }
    if (!checkName(hocVien.ten)) {
      toast.warning("T??n kh??ng ch???a s??? v?? k?? t??? ?????c bi???t");
      return false;
    }
    if (!checkEmail(hocVien.email)) {
      toast.warning("Email kh??ng ph?? h???p");
      return false;
    }
    if (!checkNumeric(hocVien.sdt)) {
      toast.warning("S??? ??i???n tho???i kh??ng ph?? h???p");
      return false;
    }
    return true;
  };

  const handleUpdateAcc = async () => {
    const updateAcc = { ...hocVien, ngaySinh: birthday, gioiTinh: gender };

    const emptyInput = checkEmptyInput(updateAcc);
    if (emptyInput) {
      let mes = switchKeytoWords(emptyInput);
      toast.warning(`B???n ch??a nh???p ${mes}`);
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
      toast.warning("B???n ch??a nh???p m???t kh???u m???i");
      return;
    }
    if (!confirmPsw) {
      toast.warning("B???n ch??a x??c nh???n m???t kh???u m???i");
      return;
    }
    if (!oldPsw) {
      toast.warning("B???n ch??a nh???p m???t kh???u c??");
      return;
    }

    if (confirmPsw !== newPsw) {
      toast.warning("B???n x??c nh???n m???t kh???u sai");
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
                  Kh??a h???c ???? ????ng k??
                </Link>
              </div>
            </div>
          </div>
          <div className="right col-8">
            <div className="right-top row shadow bg-white rounded-1 p-3">
              <div className="row g-2 mb-3">
                <div className="col-3 text-end">
                  <label className="col-form-label">H???:</label>
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
                  <label className="col-form-label">T??n:</label>
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
                  <label className="col-form-label">Ng??y sinh:</label>
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
                      N???
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
                  <label className="col-form-label">S??? ??i???n tho???i:</label>
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
                  <label className="col-form-label">?????a ch???:</label>
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
                        H???y
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleUpdateAcc();
                        }}
                      >
                        L??u
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
                      C???p nh???t t??i kho???n
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
                      <label className="col-form-label">M???t kh???u m???i:</label>
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
                        X??c nh???n m???t kh???u:
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
                      <label className="col-form-label">M???t kh???u c??:</label>
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
                        H???y
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleUpdatePsw();
                        }}
                      >
                        L??u
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
                    ?????i m???t kh???u
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
