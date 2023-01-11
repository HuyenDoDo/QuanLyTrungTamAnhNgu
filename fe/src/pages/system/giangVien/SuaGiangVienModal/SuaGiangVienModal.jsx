import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { updateChuongTrinh } from "../../../../services/ChuongTrinhService";
import { toast } from "react-toastify";
import { updateGiangVien } from "../../../../services/GiangVienService";

const SuaGiangVienModal = (props) => {
  //lấy ra các prop trong props
  let { show, handleClose, selectedGV} = props;
  const giangVienDefault = {maGV:0,hoTenLot:"", ten:"", ngaySinh:"", email:"", sdt:"", diaChi:"" };
  const [giangVien, setGiangVien] = useState(giangVienDefault);

  //tham số thứ 2: mảng chứa biến (ở đây là selectedCT)
  //-> sau mỗi lần selectedCT thay đổi sẽ thực hiện các dòng lệnh trong useEffect
  //=>trường hợp này là tự động gọi API duy nhất 1 lần
  useEffect(() => {
    if (show) {
      setGiangVien(selectedGV);
    }
  }, [show, selectedGV]);

  const handleChange = (e) => {
    setGiangVien((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(giangVien);
  };

  //hàm lưu
  const handleSave = async () => {
    try {
      const res = await updateGiangVien(selectedGV.maGV, giangVien);
      if (res && res.data.EC === 0) {
        toast.success(res.data.MS);
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
          <Modal.Title>Sửa thông tin giảng viên</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="form-label">Mã giảng viên:</label>
              <input
                className="form-control"
                name="maGV"
                value={giangVien.maGV}
                disabled
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Họ tên lót:</label>
              <input
                className="form-control"
                name="hoTenLot"
                value={giangVien.hoTenLot}
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
                value={giangVien.ten}
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
                value={giangVien.ngaySinh}
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
                value={giangVien.email}
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
                value={giangVien.sdt}
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
                value={giangVien.diaChi}
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
              value={chuongTrinh.moTa}
              onChange={(e) => {
                handleChange(e);
              }}
            ></textarea>
          </div>  */}
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

export default SuaGiangVienModal;
