import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { updateLopHoc } from "../../../../services/LopHocService";
import { toast } from "react-toastify";

const SuaLopHocModal = (props) => {
  let { show, handleClose, chuongTrinhList, selectedLop } = props;

  const lopDefault = {
    maLop: "",
    tenLop: "",
    hocPhi: 0,
    thoiLuong: 0,
    maCT: "",
  };

  //--Khai báo state--
  const [lopHoc, setLopHoc] = useState(lopDefault);
  const [selected, setSelected] = useState("");

  //--Khai báo state---

  //--Gọi API--
  useEffect(() => {
    //nếu modal mở (show = true)
    //thì set lopHoc = selectedLop của component cha-QuanLyLopHoc
    if (show) {
      setLopHoc(selectedLop);
      setSelected(selectedLop.maCT);
      // console.log(selectedLop.maCT);
    }
  }, [show, selectedLop]);
  //---Gọi API---

  //--Định nghĩa hàm--
  const handleChange = (e) => {
    setLopHoc((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    // const index = e.target.selectedIndex;
    // const tenCT = e.target[index].text;
    // const maCT = e.target.value;
    setSelected(e.target.value);
  };

  const clearLopHoc = () => {
    setLopHoc(lopDefault);
    // const selectedDefault =
    //   chuongTrinhList && chuongTrinhList.length > 0
    //     ? { maCT: chuongTrinhList[0].maCT, tenCT: chuongTrinhList[0].tenCT }
    //     : { maCT: "", tenCT: "" };
    setSelected("");
  };

  //hàm lưu
  const handleSave = async () => {
    try {
      const res = await updateLopHoc(selectedLop.maLop, {
        ...lopHoc,
        maCT: selected,
      });
      if (res && res.data.EC === 0) {
        toast.success(res.data.MS);
        clearLopHoc();
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
          <Modal.Title>Sửa thông tin lớp học</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-12 form-group mb-3">
              <label className="form-label">Mã lớp:</label>
              <input
                className="form-control"
                name="maLop"
                value={lopHoc.maLop}
                disabled
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Tên lớp:</label>
              <input
                className="form-control"
                name="tenLop"
                value={lopHoc.tenLop}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Thuộc chương trình:</label>
              <select
                className="form-select"
                value={selected}
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
                value={lopHoc.thoiLuong}
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
                value={lopHoc.hocPhi}
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

export default SuaLopHocModal;
