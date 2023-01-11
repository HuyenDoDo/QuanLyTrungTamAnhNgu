import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { updateKhoaHoc } from "../../../../services/KhoaHocService";
import { toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";

const SuaKhoaHocModal = (props) => {
  //lấy ra các prop trong props
  let { show, handleClose, selectedKH } = props;
  const khoaHocDefault = {
    maKH: "",
    tenKH: "",
    tinhTrang: 0,
    ngayBatDau: "",
    ngayKetThuc: "",
    hanDangKy: "",
  };
  const month = new Date();
  const nextMonth = month.setMonth(month.getMonth() + 1);

  //--Khai báo state--
  const [khoaHoc, setKhoaHoc] = useState(khoaHocDefault);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(nextMonth);
  const [registedExp, setregistedExp] = useState(new Date());

  const [selectedStatus, setSelectedStatus] = useState(0);
  //---Khai báo state---

  //--gọi API--
  useEffect(() => {
    if (show && selectedKH) {
      setKhoaHoc(selectedKH);
      setStartDate(new Date(selectedKH.ngayBatDau));
      setEndDate(new Date(selectedKH.ngayKetThuc));
      setregistedExp(new Date(selectedKH.hanDangKy));
      setSelectedStatus(selectedKH.tinhTrang);
    }
  }, [show, selectedKH]);
  //---gọi API---

  //--Định nghĩa hàm--
  const handleChange = (e) => {
    setKhoaHoc((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(khoaHoc);
  };

  const handleSelect = (e) => {
    setSelectedStatus(e.target.value);
  };

  //hàm lưu
  const handleSave = async () => {
    try {
      const newKhoaHoc = {
        ...khoaHoc,
        ngayBatDau: startDate,
        ngayKetThuc: endDate,
        hanDangKy: registedExp,
        tinhTrang: selectedStatus,
      };
      const res = await updateKhoaHoc(selectedKH.maKH, newKhoaHoc);
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

  //--Định nghĩa hàm--

  return (
    <>
      <Modal size="lg" show={show} onHide={() => handleClose("")} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin khóa học</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-12 form-group mb-3">
              <label className="form-label">Mã khóa học:</label>
              <input
                className="form-control"
                name="maKH"
                value={khoaHoc.maKH}
                disabled
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Tên khóa học:</label>
              <input
                className="form-control"
                name="tenKH"
                value={khoaHoc.tenKH}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Ngày bắt đầu:</label>
              <ReactDatePicker
                className="form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Ngày kết thúc:</label>
              <ReactDatePicker
                className="form-control"
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                }}
                minDate={nextMonth}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Hạn đăng ký:</label>
              <ReactDatePicker
                className="form-control"
                selected={registedExp}
                onChange={(date) => setregistedExp(date)}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Tình trạng:</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={selectedStatus}
                onChange={(e) => {
                  handleSelect(e);
                }}
              >
                <option value={0}>Đang đóng</option>
                <option value={1}>Đang mở</option>
                <option value={2}>Đã đóng</option>
              </select>
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

export default SuaKhoaHocModal;
