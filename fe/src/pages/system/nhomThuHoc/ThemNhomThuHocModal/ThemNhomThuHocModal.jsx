import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import { createChuongTrinh } from "../../../../services/ChuongTrinhService";
import { toast } from "react-toastify";
import { createNhomThuHoc } from "../../../../services/NhomThuHocService";

const ThemNhomThuHocModal = (props) => {
  let { show, handleClose } = props;
  const nhomThuHocDefault = {  maNTH:0,nhomThu: "" };
  const [nhomThuHoc, setNhomThuHoc] = useState(nhomThuHocDefault);

  const handleChange = (e) => {
    // const { value, name } = e.target;
    setNhomThuHoc((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(nhomThuHoc);
  };

  const clearNhomThuHoc = () => {
    setNhomThuHoc(nhomThuHocDefault);
  };

  const handleSave = async () => {
    try {
      // console.log(chuongTrinh);
      const res = await createNhomThuHoc(nhomThuHoc);
      if (res && res.data.EC === 0) {
        toast.success(res.data.MS);
        clearNhomThuHoc();
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
          <Modal.Title>Thêm mới nhóm thứ học</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="form-label">Mã nhóm thứ học:</label>
              <input
                className="form-control"
                name="maNTH"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Nhóm thứ:</label>
              <input
                className="form-control"
                name="nhomThu"
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
export default ThemNhomThuHocModal;
