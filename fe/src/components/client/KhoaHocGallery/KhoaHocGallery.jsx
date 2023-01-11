import "./KhoaHocGallery.scss";
import Slider from "react-slick";
import { useState } from "react";
import { useEffect } from "react";
import {
  // getKhoaHoc,
  getKhoaHocWithLopKhoa,
} from "../../../services/KhoaHocService";
// import { toast } from "react-toastify";
import { convertDate, convertMonetaryUnit } from "../../../Utils/convert";
// import { getLopKhoa } from "../../../services/LopKhoaService";

const KhoaHocGallery = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  //--khai báo state--
  const [khoaHocList, setKhoaHocList] = useState([]);
  const [lopKhoaList, setLopKhoaList] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");

  //---khai báo state---

  //--Gọi API--
  useEffect(() => {
    const fetchData = async () => {
      const res = await getKhoaHocWithLopKhoa();
      if (res.data.EC === 0) {
        setKhoaHocList(res.data.DT);
        setSelectedCard(res.data.DT[0].maKH);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (khoaHocList && khoaHocList.length > 0) {
      if (selectedCard) {
        const foundKhoaHoc = khoaHocList.find(
          (item) => item.maKH === selectedCard
        );
        setLopKhoaList(foundKhoaHoc.lopKhoa);
      }
    }
  }, [selectedCard, khoaHocList]);

  // useEffect(() => {
  //   const getkhoaHocList = async () => {
  //     await fetchkhoaHocList();
  //   };
  //   getkhoaHocList();
  // }, []);

  // useEffect(() => {
  //   const getLopkhoaList = async () => {
  //     await fetchLopKhoaList(selectedCard);
  //   };
  //   getLopkhoaList();
  // }, [selectedCard]);
  //---Gọi API---

  //--Định nghĩa hàm--
  // const fetchkhoaHocList = async () => {
  //   try {
  //     const res = await getKhoaHoc();
  //     if (res && res.data.EC === 0) {
  //       setKhoaHocList(res.data.DT);
  //       setSelectedCard(res.data.DT[0].maKH);
  //       // console.log(res.data.DT);
  //     } else {
  //       toast.error(res.data.MS);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Lỗi server...");
  //   }
  // };

  // const fetchLopKhoaList = async (maKH) => {
  //   try {
  //     const res = await getLopKhoa(maKH);
  //     if (res && res.data.EC === 0) {
  //       setLopKhoaList(res.data.DT);
  //     } else {
  //       toast.error(res.data.MS);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Lỗi server...");
  //   }
  // };

  const handleSelect = (maKH) => {
    setSelectedCard(maKH);
  };
  //---Định nghĩa hàm---

  return (
    <div className="khoahoc-gallery">
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
        <path fill="#fff" fillOpacity="1" d="M0,96L1440,96L1440,0L0,0Z"></path>
      </svg> */}
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="title">Khoá Học</h1>
          </div>
        </div>
        <div className="khoahoc-container row mb-3">
          <div className="m-auto">
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
                          selectedCard === value.maKH
                            ? "khoahoc-card card text-start selected"
                            : "khoahoc-card card text-start"
                        }
                        style={{ width: "18rem" }}
                        onClick={() => {
                          handleSelect(value.maKH);
                        }}
                      >
                        <div className="card-body">
                          <h5 className="card-title">{value.tenKH}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">
                            Thời hạn đăng ký: {convertDate(value.hanDangKy)}
                          </h6>
                          <div className="card-text">
                            <div>
                              Ngày bắt đầu: {convertDate(value.ngayBatDau)}
                            </div>
                            <div>
                              Ngày kết thúc: {convertDate(value.ngayKetThuc)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
        <div className="lopkhoa-container row mb-3 px-3 py-4 bg-white rounded-1">
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
                  {/* <th scope="col">Số lượng dự kiến</th> */}
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
                        {/* <td>{value.soLuong}</td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,96L1440,96L1440,320L0,320Z"
        ></path>
      </svg> */}
    </div>
  );
};

export default KhoaHocGallery;
