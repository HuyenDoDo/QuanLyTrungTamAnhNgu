import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import { createChuongTrinh } from "../../../../services/ChuongTrinhService";
import { toast } from "react-toastify";
import { createCaHoc } from "../../../../services/CaHocService";

const ThemCaHocModal = (props) => {
  let { show, handleClose } = props;
  const caHocDefault = {  maCa:0,thoiGian: "" };
  const [caHoc, setCaHoc] = useState(caHocDefault);

  const handleChange = (e) => {
    // const { value, name } = e.target;
    setCaHoc((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(caHoc);
  };

  const clearCaHoc = () => {
    setCaHoc(caHocDefault);
  };

  const handleSave = async () => {
    try {
      // console.log(chuongTrinh);
      const res = await createCaHoc(caHoc);
      if (res && res.data.EC === 0) {
        toast.success(res.data.MS);
        clearCaHoc();
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
          <Modal.Title>Thêm mới ca học</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="form-label">Mã ca học:</label>
              <input
                className="form-control"
                name="maCa"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Thời gian:</label>
              <input
                className="form-control"
                name="thoiGian"
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
export default ThemCaHocModal;
