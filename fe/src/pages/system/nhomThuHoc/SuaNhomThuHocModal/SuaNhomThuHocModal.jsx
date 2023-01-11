import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { updateChuongTrinh } from "../../../../services/ChuongTrinhService";
import { toast } from "react-toastify";
import { updateNhomThuHoc } from "../../../../services/NhomThuHocService";

const SuaNhomThuHocModal = (props) => {
  //lấy ra các prop trong props
  let { show, handleClose, selectedNTH} = props;
  const nhomThuHocDefault = { maNTH: 0,nhomThu:"" };
  const [nhomThuHoc, setNhomThuHoc] = useState(nhomThuHocDefault);

  //tham số thứ 2: mảng chứa biến (ở đây là selectedCT)
  //-> sau mỗi lần selectedCT thay đổi sẽ thực hiện các dòng lệnh trong useEffect
  //=>trường hợp này là tự động gọi API duy nhất 1 lần
  useEffect(() => {
    if (show) {
      setNhomThuHoc(selectedNTH);
    }
  }, [show, selectedNTH]);

  const handleChange = (e) => {
    setNhomThuHoc((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(nhomThuHoc);
  };

  //hàm lưu
  const handleSave = async () => {
    try {
      const res = await updateNhomThuHoc(selectedNTH.maNTH, nhomThuHoc);
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
          <Modal.Title>Sửa thông tin nhóm thứ học</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="form-label">Mã nhóm thứ học:</label>
              <input
                className="form-control"
                name="maNTH"
                value={nhomThuHoc.maNTH}
                disabled
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Nhóm thứ:</label>
              <input
                className="form-control"
                name="nhomThu"
                value={nhomThuHoc.nhomThu}
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

export default SuaNhomThuHocModal;
