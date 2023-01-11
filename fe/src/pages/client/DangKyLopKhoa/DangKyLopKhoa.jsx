import "./DangKyLopKhoa.scss";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import {
  // getKhoaHoc,
  getKhoaHocWithLopKhoa,
} from "../../../services/KhoaHocService";
import { toast } from "react-toastify";
// import { getLopKhoa } from "../../../services/LopKhoaService";
import { convertDate, convertMonetaryUnit } from "../../../Utils/convert";
import { useSelector } from "react-redux";
import RegisterModal from "../../../components/client/KhoaHocRegister/RegisterModal";
import { createPhieuDangKy } from "../../../services/PhieuDangKyService";

function DangKyLopKhoa() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const { loggedIn } = useSelector((state) => state.hocVien);

  //--khai báo state--
  const [showModal, setShowModal] = useState(false);

  const [khoaHocList, setKhoaHocList] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [lopKhoaList, setLopKhoaList] = useState([]);

  const [arrSelected, setArrSelected] = useState([]);
  const [tongHocPhi, setTongHocPhi] = useState(0);

  const [registedExp, setRegistedExp] = useState(false);
  //---khai báo state---

  //--Gọi API--
  useEffect(() => {
    const fetchData = async () => {
      const res = await getKhoaHocWithLopKhoa();
      if (res.data.EC === 0) {
        setKhoaHocList(res.data.DT);
        setSelectedCard(res.data.DT[0]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (khoaHocList && khoaHocList.length > 0) {
      if (selectedCard) {
        const now = new Date();
        const exp = new Date(selectedCard.hanDangKy);
        if (exp.getTime() > now.getTime()) {
          setRegistedExp(true);
        } else {
          setRegistedExp(false);
        }
        const foundKhoaHoc = khoaHocList.find(
          (item) => item.maKH === selectedCard.maKH
        );
        setLopKhoaList(foundKhoaHoc.lopKhoa);
      }
    }
  }, [selectedCard, khoaHocList]);
  //---Gọi API---

  //--Định nghĩa hàm--
  const handleCloseModal = async () => {
    setShowModal(false); //đóng modal
  };
  const handleShowModal = () => setShowModal(true);

  const handleSelect = (khoaHoc) => {
    setSelectedCard(khoaHoc);
  };

  const handleAdd = (value) => {
    // console.log(value);
    let arr = [...arrSelected];
    let existedMaLK = false;
    for (let i = 0; i < arr.length; i++) {
      if (
        value.maLK === arr[i].maLK ||
        value.lopHoc[0].maLop === arr[i].lopHoc[0].maLop
      ) {
        existedMaLK = true;
        toast.warning("Bạn đã chọn lớp này rồi");
        break;
      }
    }

    if (!existedMaLK) {
      arr.push(value);
      setArrSelected(arr);
      setTongHocPhi((prev) => prev + value.hocPhi);
      //   console.log(arrSelected);
    }
  };

  const handleRemove = (value) => {
    let arr = [...arrSelected];
    const findIndex = arr.findIndex(
      (item) => item.lopHoc[0].maLK === value.lopHoc[0].maLK
    );
    findIndex !== -1 && arr.splice(findIndex, 1);
    setArrSelected(arr);
    setTongHocPhi((prev) => prev - value.hocPhi);
  };

  const arrToStr = (mess, arr) => {
    if (arr && arr.length > 0) {
      for (const item of arr) {
        toast.warning(
          mess + " " + item.tenLop + " thuộc khóa " + item.tenKhoa + " trước đó"
        );
      }
    }
  };

  const handleRegist = async () => {
    if (loggedIn) {
      if (arrSelected && arrSelected.length < 1) {
        toast.warning("Vui lòng chọn lớp để đăng ký");
        return;
      }

      //gửi tổng học phí và danh sách lớp khóa
      const res = await createPhieuDangKy({
        tongHocPhi: tongHocPhi,
        dsDangKy: arrSelected,
      });
      if (res.data.EC === 0) {
        console.log(res.data.DT);
        toast.success(res.data.MS);
      } else if (res.data.EC > 0) {
        arrToStr(res.data.MS, res.data.DT);
      }
    } else {
      handleShowModal();
    }
  };
  //---Định nghĩa hàm---

  return (
    <div className="dang-ky-lop-khoa">
      <div className="top">
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Khóa học
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="wrapper">
              <div className="container">
                <div className="slider row mb-3">
                  <Slider {...settings}>
                    {khoaHocList &&
                      khoaHocList.length > 0 &&
                      khoaHocList.map((value, index) => {
                        return (
                          <div
                            key={index}
                            className="col-md-4 p-3 d-flex justify-content-center"
                          >
                            <div
                              className={
                                selectedCard.maKH === value.maKH
                                  ? "khoahoc-card card text-start selected"
                                  : "khoahoc-card card text-start"
                              }
                              style={{ width: "18rem" }}
                              onClick={() => {
                                handleSelect(value);
                              }}
                            >
                              <div className="card-body">
                                <h5 className="card-title">{value.tenKH}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                  Thời hạn đăng ký:{" "}
                                  {convertDate(value.hanDangKy)}
                                </h6>
                                <div className="card-text">
                                  <div>
                                    Ngày bắt đầu:{" "}
                                    {convertDate(value.ngayBatDau)}
                                  </div>
                                  <div>
                                    Ngày kết thúc:{" "}
                                    {convertDate(value.ngayKetThuc)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </Slider>
                </div>
                <div className="table-lopkhoa row mb-3 px-3 py-4 bg-white rounded-1">
                  <div className="col-12">
                    <h5>Danh sách lớp</h5>
                  </div>
                  <div className="col-12">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Lớp học</th>
                          <th scope="col">Thời gian học</th>
                          <th scope="col">Ca học</th>
                          <th scope="col">Thời lượng</th>
                          <th scope="col">Học phí</th>
                          <th scope="col">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lopKhoaList &&
                          lopKhoaList.length > 0 &&
                          lopKhoaList.map((value, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{value.lopHoc[0].tenLop}</td>
                                <td>{value.ngayHoc[0].nhomThu}</td>
                                <td>{value.caHoc[0].thoiGian}</td>
                                <td>{value.thoiLuong}</td>
                                <td>{convertMonetaryUnit(value.hocPhi)} VNĐ</td>
                                <td>
                                  {registedExp ? (
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => {
                                        handleAdd(value);
                                      }}
                                    >
                                      Chọn
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-primary"
                                      disabled
                                    >
                                      Hết hạn
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="table-selected row mb-3 px-3 py-4 bg-white rounded-1">
                  <div className="col-12">
                    <h5>Các lớp đã chọn</h5>
                  </div>
                  <div className="col-12">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Lớp học</th>
                          <th scope="col">Thời gian học</th>
                          <th scope="col">Ca học</th>
                          <th scope="col">Thời lượng</th>
                          <th scope="col">Học phí</th>
                          <th scope="col">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {arrSelected &&
                          arrSelected.length > 0 &&
                          arrSelected.map((value, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{value.lopHoc[0].tenLop}</td>
                                <td>{value.ngayHoc[0].nhomThu}</td>
                                <td>{value.caHoc[0].thoiGian}</td>
                                <td>{value.thoiLuong}</td>
                                <td>{convertMonetaryUnit(value.hocPhi)} VNĐ</td>
                                <td>
                                  <button
                                    className="btn btn-warning"
                                    onClick={() => {
                                      handleRemove(value);
                                    }}
                                  >
                                    Xóa
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-12 text-end">
                    <div className="total my-3">
                      Tổng học phí: {convertMonetaryUnit(tongHocPhi)} VNĐ
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleRegist();
                      }}
                    >
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterModal show={showModal} handleCloseModal={handleCloseModal} />
    </div>
  );
}

export default DangKyLopKhoa;
