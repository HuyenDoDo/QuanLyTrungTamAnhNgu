import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { getLopHoc } from "../../../../services/LopHocService";
import { createLopKhoa } from "../../../../services/LopKhoaService";
import {
  convertDate,
  convertMonetaryUnit,
  convertStatusCode,
} from "../../../../Utils/convert";

const ThemLopKhoaModal = (props) => {
  let { show, handleClose, khoaHoc, chuongTrinhList, caList, ngayHocList } =
    props;
  const lopKhoaDefault = {
    maLK: "",
    hocPhi: 0,
    soLuongDuKien: 10,
    thoiLuong: 0,
    maLop: "",
    maKH: "",
    maCa: 0,
    maNTH: 0,
  };

  //--khai báo state--
  const [lopKhoa, setLopKhoa] = useState(lopKhoaDefault);
  const [lopList, setLopList] = useState([]);

  const [selectedChuongTrinh, setSelectedChuongTrinh] = useState({});
  const [selectedLopHoc, setSelectedLopHoc] = useState({});
  const [selectedCaHoc, setSelectedCaHoc] = useState({});
  const [selectedNgayHoc, setSelectedNgayHoc] = useState({});

  //---khai báo state---

  //--Gọi API--
  //mặc định là lấy các giá trị đầu tiên
  useEffect(() => {
    if (show) {
      if (chuongTrinhList && chuongTrinhList.length > 0) {
        setSelectedChuongTrinh((prev) => ({
          ...prev,
          ...chuongTrinhList[0],
        }));
      }
      if (ngayHocList && ngayHocList.length > 0) {
        setSelectedNgayHoc((prev) => ({
          ...prev,
          ...ngayHocList[0],
        }));
      }
      if (caList && caList.length > 0) {
        setSelectedCaHoc((prev) => ({
          ...prev,
          ...caList[0],
        }));
      }
    }
  }, [show, chuongTrinhList, ngayHocList, caList]);

  useEffect(() => {
    if (show) {
      const getDsLop = async () => {
        const res = await getLopHoc(selectedChuongTrinh.maCT);
        setLopList(res.data.DT);
      };
      getDsLop();
    }
  }, [show, selectedChuongTrinh]);

  useEffect(() => {
    if (show) {
      if (lopList && lopList.length > 0) {
        setSelectedLopHoc((prev) => ({
          ...prev,
          ...lopList[0],
        }));
      } else {
        setSelectedLopHoc((prev) => ({}));
      }
    }
  }, [show, lopList]);
  //---Gọi API---

  //--Định nghĩa hàm--
  const handleChange = (e) => {
    setLopKhoa((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    // const index = e.target.selectedIndex;
    // const ten = e.target[index].text;
    let res = {};
    switch (key) {
      case "chuongTrinh":
        res = chuongTrinhList.find((item) => item.maCT === value);
        setSelectedChuongTrinh((prev) => ({ ...prev, ...res }));
        // console.log(selectedChuongTrinh);
        break;
      case "lopHoc":
        res = lopList.find((item) => item.maLop === value);
        setSelectedLopHoc(res);
        // console.log(selectedLopHoc);
        break;
      case "caHoc":
        res = caList.find((item) => item.maCa === +value);
        setSelectedCaHoc((prev) => ({ ...prev, ...res }));
        // console.log(selectedCaHoc);
        break;
      case "ngayHoc":
        res = ngayHocList.find((item) => item.maNTH === +value);
        setSelectedNgayHoc((prev) => ({ ...prev, ...res }));
        // console.log(selectedNgayHoc);
        break;
      default:
        break;
    }
  };

  const clearLopKhoa = () => {
    setLopKhoa(lopKhoaDefault);
    setSelectedChuongTrinh({});
    setSelectedLopHoc({});
    setSelectedNgayHoc({});
    setSelectedCaHoc({});
  };

  const handleSave = async () => {
    const newLopKhoa = {
      ...lopKhoa,
      maLop: selectedLopHoc.maLop,
      maKH: khoaHoc.maKH,
      maCa: selectedCaHoc.maCa,
      maNTH: selectedNgayHoc.maNTH,
      thoiLuong: selectedLopHoc.thoiLuong,
      hocPhi: selectedLopHoc.hocPhi,
    };
    try {
      const res = await createLopKhoa(newLopKhoa);
      if (res && res.data.EC === 0) {
        toast.success(res.data.MS);
        clearLopKhoa();
        handleClose(res.data.DT);
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
          <Modal.Title>Thêm mới lớp khóa</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-12 form-group mb-3">
              <label className="form-label">Mã lớp khóa:</label>
              <input
                className="form-control"
                name="maLK"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Khóa học:</label>
              <input
                className="form-control"
                type={"text"}
                value={khoaHoc.tenKH}
                readOnly
              />
            </div>
            <div className="col-4 form-group mb-3">
              <label className="form-label">Ngày bắt đầu:</label>
              <input
                className="form-control"
                value={
                  khoaHoc && khoaHoc.ngayBatDau
                    ? convertDate(khoaHoc.ngayBatDau)
                    : ""
                }
                readOnly
              />
            </div>
            <div className="col-4 form-group mb-3">
              <label className="form-label">Ngày kết thúc:</label>
              <input
                className="form-control"
                value={
                  khoaHoc && khoaHoc.ngayKetThuc
                    ? convertDate(khoaHoc.ngayKetThuc)
                    : ""
                }
                readOnly
              />
            </div>
            <div className="col-4 form-group mb-3">
              <label className="form-label">Trạng thái:</label>
              <input
                className="form-control"
                type={"text"}
                value={convertStatusCode(khoaHoc.tinhTrang)}
                readOnly
              />
            </div>

            <div className="col-12 form-group mb-3">
              <label className="form-label">Chương trình:</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="chuongTrinh"
                value={selectedChuongTrinh.maCT}
                onChange={(e) => {
                  handleSelect(e);
                }}
              >
                {chuongTrinhList &&
                  chuongTrinhList.length > 0 &&
                  chuongTrinhList.map((value, index) => {
                    return (
                      <option key={index} value={value.maCT}>
                        {value.tenCT}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Lớp học:</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="lopHoc"
                value={selectedLopHoc.maLop}
                onChange={(e) => {
                  handleSelect(e);
                }}
              >
                {!lopList && (
                  <option value={""}>Chương trình chưa có lớp học</option>
                )}
                {lopList &&
                  lopList.length > 0 &&
                  lopList.map((value, index) => {
                    return (
                      <option key={index} value={value.maLop}>
                        {value.tenLop}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-3 form-group mb-3">
              <label className="form-label">Thời lượng (giờ/khóa):</label>
              <input
                className="form-control"
                value={
                  selectedLopHoc && selectedLopHoc.thoiLuong
                    ? selectedLopHoc.thoiLuong
                    : 0
                }
                readOnly
              />
            </div>
            <div className="col-3 form-group mb-3">
              <label className="form-label">Học phí (VNĐ):</label>
              <input
                className="form-control"
                value={
                  selectedLopHoc && selectedLopHoc.hocPhi
                    ? convertMonetaryUnit(selectedLopHoc.hocPhi)
                    : 0
                }
                readOnly
              />
            </div>
            <div className="col-3 form-group mb-3">
              <label className="form-label">Ngày học:</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="ngayHoc"
                value={
                  selectedNgayHoc && selectedNgayHoc.maNTH
                    ? selectedNgayHoc.maNTH
                    : ""
                }
                onChange={(e) => {
                  handleSelect(e);
                }}
              >
                {ngayHocList &&
                  ngayHocList.length > 0 &&
                  ngayHocList.map((value, index) => {
                    return (
                      <option key={index} value={value.maNTH}>
                        {value.nhomThu}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-3 form-group mb-3">
              <label className="form-label">Ca học:</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="caHoc"
                value={
                  selectedCaHoc && selectedCaHoc.maCa ? selectedCaHoc.maCa : ""
                }
                onChange={(e) => {
                  handleSelect(e);
                }}
              >
                {caList &&
                  caList.length > 0 &&
                  caList.map((value, index) => {
                    return (
                      <option key={index} value={value.maCa}>
                        {value.thoiGian}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Số lượng học viên dự kiến:</label>
              <input
                className="form-control"
                name="soLuongDuKien"
                value={lopKhoa.soLuongDuKien}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
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
export default ThemLopKhoaModal;
