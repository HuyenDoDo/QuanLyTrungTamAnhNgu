import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { updateChuongTrinh } from "../../../../services/ChuongTrinhService";
import { toast } from "react-toastify";
import { updateCaHoc } from "../../../../services/CaHocService";

const SuaCaHocModal = (props) => {
  //lấy ra các prop trong props
  let { show, handleClose, selectedCH} = props;
  const caHocDefault = { maCa: "",thoiGian:"" };
  const [caHoc, setCaHoc] = useState(caHocDefault);

  //tham số thứ 2: mảng chứa biến (ở đây là selectedCT)
  //-> sau mỗi lần selectedCT thay đổi sẽ thực hiện các dòng lệnh trong useEffect
  //=>trường hợp này là tự động gọi API duy nhất 1 lần
  useEffect(() => {
    if (show) {
      setCaHoc(selectedCH);
    }
  }, [show, selectedCH]);

  const handleChange = (e) => {
    setCaHoc((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(caHoc);
  };

  //hàm lưu
  const handleSave = async () => {
    try {
      const res = await updateCaHoc(selectedCH.maCa, caHoc);
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
          <Modal.Title>Sửa thông tin ca học</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="form-label">Mã ca học:</label>
              <input
                className="form-control"
                name="maCa"
                value={caHoc.maCa}
                disabled
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Thời gian:</label>
              <input
                className="form-control"
                name="thoiGian"
                value={caHoc.thoiGian}
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

export default SuaCaHocModal;
