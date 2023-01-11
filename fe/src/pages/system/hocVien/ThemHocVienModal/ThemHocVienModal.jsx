import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import { createChuongTrinh } from "../../../../services/ChuongTrinhService";
import { toast } from "react-toastify";
import { createHocVien } from "../../../../services/HocVienService";
import DatePicker from "react-datepicker";

const ThemHocVienModal = (props) => {
  let { show, handleClose } = props;
  const hocVienDefault = {
    hoTenLot: "",
    ten: "",
    ngaySinh: "",
    email: "",
    sdt: "",
    diaChi: "",
  };

  const [birthday, setBirthday] = useState(new Date());
  const [hocVien, setHocVien] = useState(hocVienDefault);
  const [gender, setGender] = useState("female");

  const handleChange = (e) => {
    // const { value, name } = e.target;
    setHocVien((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(hocVien);
  };

  const clearHocVien = () => {
    setHocVien(hocVienDefault);
    setBirthday(new Date());
    setGender("female");
  };

  const handleSave = async () => {
    try {
      // console.log(chuongTrinh);
      const newHocVien = {
        ...hocVien,
        ngaySinh: birthday,
        gioiTinh: gender,
      };
      const res = await createHocVien(newHocVien);
      if (res && res.data.EC === 0) {
        toast.success(res.data.MS);
        clearHocVien();
        handleClose(res.data);
      } else if (res.data.EC > 0) {
        toast.error(res.data.MS);
      } else {
        toast.warning(res.data.MS);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal size="lg" show={show} onHide={() => handleClose("")} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới học vien</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="form-label">Họ tên lót:</label>
              <input
                className="form-control"
                name="hoTenLot"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Tên:</label>
              <input
                className="form-control"
                name="ten"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Ngày sinh:</label>
              <DatePicker
                className="form-control"
                selected={birthday}
                onChange={(date) => setBirthday(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Giới tính:</label>
              <div className="d-flex">
                <div className="form-check mx-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="male"
                    onChange={() => {
                      setGender("male");
                    }}
                    checked={gender === "male"}
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
                  />
                  <label className="form-check-label" htmlFor="femaleRadio">
                    Nữ
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Email:</label>
              <input
                className="form-control"
                name="email"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Số điện thoại:</label>
              <input
                className="form-control"
                name="sdt"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Địa chỉ:</label>
              <input
                className="form-control"
                name="diaChi"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          {/* <div className="col-12 form-group mb-3">
            <label className="form-label">Mô tả:</label>
            <textarea
              className="form-control form-control-lg"
              name="moTa"
              onChange={(e) => {
                handleChange(e);
              }}
            ></textarea>
          </div> */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose("")}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ThemHocVienModal;
