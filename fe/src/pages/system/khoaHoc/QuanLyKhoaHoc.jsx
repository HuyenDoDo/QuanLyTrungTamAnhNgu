import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { deleteKhoaHoc, getKhoaHoc } from "../../../services/KhoaHocService";
// import thư viện
import { ToastContainer, toast } from "react-toastify";
import ThemKhoaHocModal from "./ThemKhoaHocModal/ThemKhoaHocModal";
import SuaKhoaHocModal from "./SuaKhoaHocModal/SuaKhoaHocModal";
import { convertDate, convertStatusCode } from "../../../Utils/convert";
import { Link } from "react-router-dom";

const QuanLyKhoaHoc = () => {
  const initKhoaHocState = {
    maKH: "",
    tenKH: "",
    tinhTrang: 0,
    ngayBatDau: "",
    ngayKetThuc: "",
    hanDangKy: "",
  };

  //--khai báo state--
  const [dsKhoaHoc, setdsKhoaHoc] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedKH, setSelectedKH] = useState(initKhoaHocState);
  //---khai báo state---

  //--Gọi API--
  // sau khi render giao diện lần đầu thì react có hàm component did mount
  useEffect(() => {
    const getdsKhoaHoc = async () => {
      await fetchDsKhoaHoc();
    };
    getdsKhoaHoc();
  }, []);
  //---Gọi API---

  //--Định nghĩa hàm--
  const fetchDsKhoaHoc = async () => {
    try {
      const res = await getKhoaHoc();
      if (res && res.data.EC === 0) {
        setdsKhoaHoc(res.data.DT);
      } else {
        toast.error(res.data.MS);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi server...");
    }
  };

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = async (data) => {
    setShowCreateModal(false);
    data && (await fetchDsKhoaHoc());
  };

  //hàm mở modal cập nhật
  const handleShowUpdateModal = (selected) => {
    setSelectedKH(selected);
    setShowUpdateModal(true);
  };
  //hàm đóng modal cập nhật
  const handleCloseUpdateModal = async (data) => {
    setShowUpdateModal(false); //đóng modal
    //nếu modal có trả về data thì cập nhật data vào danh sách khóa học
    //(cập nhật state => rerender)
    data && (await fetchDsKhoaHoc());
    clearSelected(); //reset khóa học đã chọn để cập nhật
  };

  const clearSelected = () => {
    setSelectedKH(initKhoaHocState);
  };

  const handleDelete = async (maKH) => {
    if (window.confirm("Xác nhận xóa khóa học")) {
      try {
        let res = await deleteKhoaHoc(maKH);
        if (res && res.data.EC === 0) {
          await fetchDsKhoaHoc();
          toast.success(res.data.MS);
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
                <th scope="col">Mã khóa học</th>
                <th scope="col">Tên khóa học</th>
                <th scope="col">Ngày bắt đầu</th>
                <th scope="col">Ngày kết thúc</th>
                <th scope="col">Hạn đăng ký</th>
                <th scope="col">Tình trạng</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {dsKhoaHoc && // kiểm tra ds có tồn tại hay không
                dsKhoaHoc.length > 0 && // kiểm tra xem có rỗng hay không
                dsKhoaHoc.map((value, index) => {
                  // lấy ra tất cả phần tử(value hoặc item) trong danh sách
                  return (
                    <tr key={index}>
                      {/* đổ dữ liệu vào */}
                      <th scope="row">{value.maKH}</th>
                      <td>{value.tenKH}</td>
                      <td>{convertDate(value.ngayBatDau)}</td>
                      <td>{convertDate(value.ngayKetThuc)}</td>
                      <td>{convertDate(value.hanDangKy)}</td>
                      <td>{convertStatusCode(value.tinhTrang)}</td>
                      <td>
                        <Link
                          className="btn btn-info m-1"
                          to={`/system/khoahoc/${value.maKH}`}
                        >
                          <i className="bi bi-layers-fill text-light"></i>
                        </Link>
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
                            handleDelete(value.maKH);
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
        <ThemKhoaHocModal
          show={showCreateModal}
          handleClose={handleCloseCreateModal}
        ></ThemKhoaHocModal>
        <SuaKhoaHocModal
          show={showUpdateModal}
          handleClose={handleCloseUpdateModal}
          selectedKH={selectedKH}
        />

        <ToastContainer />
      </div>
    </div>
  );
};

export default QuanLyKhoaHoc;
