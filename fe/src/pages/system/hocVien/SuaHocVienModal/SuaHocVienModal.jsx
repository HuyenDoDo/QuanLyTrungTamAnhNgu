import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { updateChuongTrinh } from "../../../../services/ChuongTrinhService";
import { toast } from "react-toastify";
import { updateHocVien } from "../../../../services/HocVienService";
import DatePicker from "react-datepicker";

const SuaHocVienModal = (props) => {
  //lấy ra các prop trong props
  let { show, handleClose, selectedHV } = props;
  const hocVienDefault = {
    maHV: "",
    hoTenLot: "",
    ten: "",
    ngaySinh: "",
    email: "",
    sdt: "",
    diaChi: "",
  };

  const [hocVien, setHocVien] = useState(hocVienDefault);
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState("female");

  //tham số thứ 2: mảng chứa biến (ở đây là selectedCT)
  //-> sau mỗi lần selectedCT thay đổi sẽ thực hiện các dòng lệnh trong useEffect
  //=>trường hợp này là tự động gọi API duy nhất 1 lần
  useEffect(() => {
    if (show) {
      setHocVien(selectedHV);
      selectedHV.ngaySinh && setBirthday(new Date(selectedHV.ngaySinh));
      selectedHV.gioiTinh ? setGender("male") : setGender("female");
    }
  }, [show, selectedHV]);

  const handleChange = (e) => {
    setHocVien((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(hocVien);
  };

  const clearHocVien = () => {
    setHocVien(hocVienDefault);
    setBirthday(new Date());
    setGender("female");
  };

  //hàm lưu
  const handleSave = async () => {
    try {
      const newHocVien = { ...hocVien, ngaySinh: birthday, gioiTinh: gender };

      const res = await updateHocVien(selectedHV._id, newHocVien);
      if (res && res.data.EC === 0) {
        toast.success(res.data.MS);
        clearHocVien();
        handleClose(res.data);
      } else if (res.data.EC > 0) {
        toast.error(res.data.MS);
      } else if (res.data.EC < 0) {
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
          <Modal.Title>Sửa thông tin học viên</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="form-label">Họ tên lót:</label>
              <input
                className="form-control"
                name="hoTenLot"
                value={hocVien.hoTenLot}
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
                value={hocVien.ten}
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
                value={hocVien.email}
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
                value={hocVien.sdt}
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
                value={hocVien.diaChi ? hocVien.diaChi : ""}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
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

export default SuaHocVienModal;
