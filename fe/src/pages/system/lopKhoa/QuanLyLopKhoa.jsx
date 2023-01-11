import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getChuongTrinh } from "../../../services/ChuongTrinhService";
import { deleteLopKhoa, getLopKhoa } from "../../../services/LopKhoaService";
import ThemLopKhoaModal from "./ThemLopKhoaModal/ThemLopKhoaModal";
import SuaLopKhoaModal from "./SuaLopKhoaModal/SuaLopKhoaModal";
import { findKhoaHoc } from "../../../services/KhoaHocService";
import { useLocation } from "react-router-dom";

const QuanLyLopKhoa = () => {
  let location = useLocation();
  const splitedPathname = location.pathname.split("/");
  const maKH = splitedPathname[splitedPathname.length - 1];

  const khoaHocDefault = {
    maKH: "",
    tenKH: "",
    tinhTrang: 0,
    ngayBatDau: "",
    ngayKetThuc: "",
  };

  const lopKhoaDefault = {
    maLK: "",
    maKH: "",
    maLop: "",
    maNTH: 0,
    maCa: 0,
    soLuongDuKien: 0,
    khoaHoc: {
      tenKH: "",
    },
    lopHoc: {
      tenLop: "",
      maCT: "",
    },
    ca: {
      thoiGian: "",
    },
    ngayHoc: {
      nhomThu: "",
    },
  };

  //--khai báo state--
  const [khoaHoc, setKhoaHoc] = useState(khoaHocDefault);

  const [lopKhoaList, setLopKhoaList] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false); //Modal thêm
  const [showUpdateModal, setShowUpdateModal] = useState(false); //Modal sửa

  const [chuongTrinhList, setChuongTrinhList] = useState([]);
  const [caList, setCaList] = useState([]);
  const [ngayHocList, setNgayHocList] = useState([]);

  const [selectedLopKhoa, setSelectedLopKhoa] = useState(lopKhoaDefault);
  //---khai báo state---

  //--Gọi API--

  //lấy ra khóa học bằng maKH
  useEffect(() => {
    const fetchData = async () => {
      if (maKH) {
        await fetchKhoaHoc(maKH);
        await fetchDsLopKhoa(maKH);
      }
    };
    fetchData();
  }, [maKH]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchDsChuongTrinh();
      await fetchDsNgayHoc();
      await fetchDsCaHoc();
      await fetchDsNgayHoc();
    };
    fetchData();
  }, []);
  //---Gọi API---

  //--Định nghĩa hàm--
  const fetchKhoaHoc = async (maKH) => {
    try {
      const res = await findKhoaHoc(maKH);
      if (res && res.data.EC === 0) {
        setKhoaHoc(res.data.DT);
      } else {
        toast.error(res.data.MS);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi server...");
    }
  };
  const fetchDsLopKhoa = async (maKH) => {
    try {
      const res = await getLopKhoa(maKH);
      if (res && res.data.EC === 0) {
        setLopKhoaList(res.data.DT);
      } else {
        toast.error(res.data.MS);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi server...");
    }
  };
  const fetchDsChuongTrinh = async () => {
    try {
      const res = await getChuongTrinh();
      if (res && res.data.EC === 0) {
        setChuongTrinhList(res.data.DT);
      } else {
        toast.error(res.data.MS);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi server...");
    }
  };
  const fetchDsCaHoc = async () => {
    try {
      const fakeCaList = [
        {
          maCa: 0,
          thoiGian: "9:00-11:00",
        },
        {
          maCa: 1,
          thoiGian: "15:00-17:00",
        },
        {
          maCa: 2,
          thoiGian: "17:00-19:00",
        },
        {
          maCa: 3,
          thoiGian: "19:00-21:00",
        },
      ];
      setCaList(fakeCaList);
    } catch (error) {
      console.log(error);
      toast.error("Lỗi server...");
    }
  };
  const fetchDsNgayHoc = async () => {
    try {
      const fakeNthList = [
        {
          maNTH: 0,
          nhomThu: "2-4-6",
        },
        {
          maNTH: 1,
          nhomThu: "3-5-7",
        },
        {
          maNTH: 2,
          nhomThu: "7-CN",
        },
      ];
      setNgayHocList(fakeNthList);
    } catch (error) {
      console.log(error);
      toast.error("Lỗi server...");
    }
  };

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = async (data) => {
    setShowCreateModal(false); //đóng modal
    if (data) {
      await fetchDsLopKhoa(maKH);
    }
  };

  const handleShowUpdateModal = (lopKhoa) => {
    setSelectedLopKhoa((prev) => ({ ...prev, ...lopKhoa }));
    setShowUpdateModal(true);
  };
  const handleCloseUpdateModal = async (data) => {
    setShowUpdateModal(false);
    if (data) {
      await fetchDsLopKhoa(maKH);
    }
    clearSelected();
  };

  const clearSelected = () => {
    setSelectedLopKhoa((prev) => ({ ...prev, ...lopKhoaDefault }));
    // console.log(selectedLopKhoa);
  };

  const handleDelete = async (maLK) => {
    if (window.confirm("Xác nhận xóa lớp khóa")) {
      try {
        const res = await deleteLopKhoa(maLK);
        if (res.data.EC === 0) {
          toast.success(res.data.MS);
          await fetchDsLopKhoa(maKH);
        } else if (res.data.EC === 1) {
          toast.error(res.data.MS);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  //---Định nghĩa hàm---

  return (
    <div className="container p-3">
      <div className="row m-2 bg-white px-3 py-4 rounded-1">
        <div className="col-12 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-info text-white"
            onClick={() => {
              handleShowCreateModal();
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="col-12">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Mã lớp khóa</th>
                <th scope="col">Khóa học</th>
                <th scope="col">Lớp học</th>
                <th scope="col">Thời gian học</th>
                <th scope="col">Ca học</th>
                <th scope="col">Số lượng dự kiến</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {lopKhoaList &&
                lopKhoaList.length > 0 &&
                lopKhoaList.map((value, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{value.maLK}</th>
                      <td>{value.khoaHoc.tenKH}</td>
                      <td>{value.lopHoc.tenLop}</td>
                      <td>{value.ngayHoc.nhomThu}</td>
                      <td>{value.ca.thoiGian}</td>
                      <td>{value.soLuongDuKien}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning m-1"
                          onClick={() => {
                            handleShowUpdateModal(value);
                          }}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger m-1"
                          onClick={() => {
                            handleDelete(value.maLK);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <ThemLopKhoaModal
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        khoaHoc={khoaHoc}
        chuongTrinhList={chuongTrinhList}
        caList={caList}
        ngayHocList={ngayHocList}
      />
      <SuaLopKhoaModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        selectedLopKhoa={selectedLopKhoa}
        khoaHoc={khoaHoc}
        chuongTrinhList={chuongTrinhList}
        caList={caList}
        ngayHocList={ngayHocList}
      />
      <ToastContainer />
    </div>
  );
};

export default QuanLyLopKhoa;
