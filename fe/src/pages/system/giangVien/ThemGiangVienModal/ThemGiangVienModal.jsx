import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import { createChuongTrinh } from "../../../../services/ChuongTrinhService";
import { toast } from "react-toastify";
import { createGiangVien } from "../../../../services/GiangVienService";

const ThemGiangVienModal = (props) => {
  let { show, handleClose } = props;
  const giangVienDefault = { maGV:0,hoTenLot:"", ten:"", ngaySinh:"", email:"", sdt:"", diaChi:"" };
  const [giangVien, setGiangVien] = useState(giangVienDefault);

  const handleChange = (e) => {
    // const { value, name } = e.target;
    setGiangVien((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(giangVien);
  };

  const clearGiangVien = () => {
    setGiangVien(giangVienDefault);
  };

  const handleSave = async () => {
    try {
      // console.log(chuongTrinh);
      const res = await createGiangVien(giangVien);
      if (res && res.data.EC === 0) {
        toast.success(res.data.MS);
        clearGiangVien();
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
          <Modal.Title>Thêm mới giảng viên</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="form-label">Mã giảng viên:</label>
              <input
                className="form-control"
                name="maGV"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
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
              <input
                className="form-control"
                name="ngaySinh"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
			<div className="col-6 form-group mb-3">
              <label className="form-label">Email:</label>
              <input
                className="form-control"
                name="email"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
			<div className="col-6 form-group mb-3">
              <label className="form-label">Số điện thoại:</label>
              <input
                className="form-control"
                name="sdt"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
			<div className="col-6 form-group mb-3">
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
export default ThemGiangVienModal;
