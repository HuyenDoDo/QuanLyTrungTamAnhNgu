import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createLopHoc } from "../../../../services/LopHocService";
import { toast } from "react-toastify";

export const ThemLopHocModal = (props) => {
  let { show, handleClose, chuongTrinhList } = props;

  const lopDefault = {
    maLop: "",
    tenLop: "",
    hocPhi: 0,
    thoiLuong: 0,
    maCT: "",
  };

  //--khai báo state--
  const [lopHoc, setLopHoc] = useState(lopDefault);
  //lấy item đầu tiên trong chuongTrinhList làm mặc định
  const [selected, setSelected] = useState("");
  //---khai báo state---

  //--gọi api--
  useEffect(() => {
    if (show) {
      if (chuongTrinhList && chuongTrinhList.length > 0) {
        setSelected(chuongTrinhList[0].maCT);
      }
    }
  }, [show, chuongTrinhList]);
  //---gọi api---

  //--Định nghĩa hàm--

  const handleChange = (e) => {
    setLopHoc((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (e) => {
    // const index = e.target.selectedIndex;
    // const tenCT = e.target[index].text;
    // const maCT = e.target.value;
    setSelected(e.target.value);
  };

  const clearLopHoc = () => {
    setLopHoc(lopDefault);
    setSelected("");
  };

  const handleSave = async () => {
    try {
      const clone = { ...lopHoc, maCT: selected };
      const res = await createLopHoc(clone);
      if (res && res.data.EC === 0) {
        toast.success(res.data.MS);
        clearLopHoc();
        //do get lớp học trả về kèm thêm thuộc tính chuongTrinh
        //nên cần thêm thuộc tính chuongTrinh vào dữ liệu cần trả về cho component cha
        // const returnedLopHoc = { ...res.data.DT, chuongTrinh: { ...selected } };
        handleClose(res.data.DT);
      } else if (res.data.EC > 0) {
        toast.error(res.data.MS);
      } else if (res.data.EC < 0) {
        toast.warning(res.data.MS);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //---Định nghĩa hàm---
  return (
    <>
      <Modal size="lg" show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới lớp học</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-12 form-group mb-3">
              <label className="form-label">Mã lớp:</label>
              <input
                className="form-control"
                name="maLop"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Tên lớp:</label>
              <input
                className="form-control"
                name="tenLop"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Thuộc chương trình:</label>
              <select
                className="form-select"
                value={selected.maCT}
                onChange={(e) => {
                  handleSelect(e);
                }}
                aria-label="Default select example"
              >
                {chuongTrinhList &&
                  chuongTrinhList.length > 0 &&
                  chuongTrinhList.map((item, index) => {
                    return (
                      <option key={index} value={item.maCT}>
                        {item.tenCT}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Thời lượng:</label>
              <input
                className="form-control"
                name="thoiLuong"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Học phí:</label>
              <input
                className="form-control"
                name="hocPhi"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
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
