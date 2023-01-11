import { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { createKhoaHoc } from "../../../../services/KhoaHocService";
const ThemKhoaHocModal = (props) => {
  const { show, handleClose } = props;

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
  const [khoahoc, setKhoaHoc] = useState(khoaHocDefault);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(nextMonth);
  const [registedExp, setregistedExp] = useState(new Date());
  //---Khai báo state---

  //--Gọi API--
  useEffect(() => {
    // const now = new Date(startDate);
    const nextMonthFromNow = new Date(startDate).setMonth(
      startDate.getMonth() + 1
    );
    const yesterdayFromNow = new Date(startDate).setDate(
      startDate.getDate() - 1
    );
    setEndDate(nextMonthFromNow);
    setregistedExp(yesterdayFromNow);
  }, [startDate]);
  //---Gọi API---

  //--Định nghĩa hàm--
  const handleChange = (e) => {
    // console.log([e.target.name],e.target.value)
    setKhoaHoc((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
    // console.log(khoahoc)
  };

  const handleClear = () => {
    setKhoaHoc(khoaHocDefault);
    setStartDate(new Date());
    setEndDate(nextMonth);
    setregistedExp(new Date());
  };

  const handleSave = async () => {
    try {
      const tmp = {
        ...khoahoc,
        ngayBatDau: startDate,
        ngayKetThuc: endDate,
        hanDangKy: registedExp,
      };
      // console.log(tmp);
      let res = await createKhoaHoc(tmp);
      if (res.data.EC === 0) {
        handleClear();
        handleClose(res.data.DT);
        toast.success(res.data.MS);
      } else if (res.data.EC > 0) {
        toast.error(res.data.MS);
      } else {
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
          <Modal.Title>Thêm mới khóa học</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-12 form-group mb-3">
              <label className="form-label">Mã khóa học:</label>
              <input
                className="form-control"
                name="maKH"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Tên khóa học:</label>
              <input
                className="form-control"
                name="tenKH"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-4 form-group mb-3">
              <label className="form-label">Ngày bắt đầu:</label>
              <DatePicker
                className="form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="col-4 form-group mb-3">
              <label className="form-label">Ngày kết thúc:</label>
              <DatePicker
                className="form-control"
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                }}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="col-4 form-group mb-3">
              <label className="form-label">Hạn đăng ký:</label>
              <DatePicker
                className="form-control"
                selected={registedExp}
                onChange={(date) => {
                  setregistedExp(date);
                }}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
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
export default ThemKhoaHocModal;
