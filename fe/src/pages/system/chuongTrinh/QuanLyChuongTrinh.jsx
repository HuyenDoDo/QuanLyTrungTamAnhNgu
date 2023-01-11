import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteChuongTrinh,
  getChuongTrinh,
} from "../../../services/ChuongTrinhService";
import SuaChuongTrinhModal from "./SuaChuongTrinhModal/SuaChuongTrinhModal";
import ThemChuongTrinhModal from "./ThemChuongTrinhModal/ThemChuongTrinhModal";

const QuanLyChuongTrinh = () => {
  //--khai báo state--
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const chuongTrinhDefault = { maCT: "", tenCT: "", moTa: "" };
  const [selectedCT, setSelectedCT] = useState(chuongTrinhDefault);
  const [chuongTrinhList, setChuongTrinhList] = useState([]);
  //---khai báo state---

  //--gọi api--
  //gọi api lấy danh sách chương trình bằng useEffect
  //tham số 2: mảng rỗng
  //-> sau khi render xong giao diện sẽ thực hiện các dòng lệnh trong useEffect chỉ 1 lần
  //=>trường hợp này là tự động gọi API duy nhất 1 lần
  useEffect(() => {
    const fetchData = async () => {
      await fetchDsChuongTrinh();
    };
    fetchData();
  }, []);
  //---gọi api---

  //--Định nghĩa hàm--

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

  //hàm mở modal thêm
  const handleShowCreateModal = () => setShowCreateModal(true);
  //hàm đóng modal thêm
  const handleCloseCreateModal = async (data) => {
    setShowCreateModal(false); //đóng modal
    if (data) {
      await fetchDsChuongTrinh();
    }
  };

  //hàm mở modal cập nhật
  const handleShowUpdateModal = (selected) => {
    setSelectedCT(selected);
    setShowUpdateModal(true);
  };
  //hàm đóng modal cập nhật
  const handleCloseUpdateModal = async (data) => {
    setShowUpdateModal(false); //đóng modal
    //nếu modal có trả về data thì cập nhật data vào danh sách chương trình
    //(cập nhật state => rerender)
    if (data) {
      // const lst = [...chuongTrinhList];
      // //tìm vị trí phần tử cần sửa theo maCT
      // const findIndex = lst.findIndex((item) => item.maCT === selectedCT.maCT);
      // //thay thế phần tử cũ bằng data trả về
      // findIndex !== -1 && lst.fill(data.DT, findIndex, findIndex + 1);
      // setChuongTrinhList(lst);
      await fetchDsChuongTrinh();
    }
    clearSelected(); //reset chương trình đã chọn để cập nhật
  };

  //hàm xóa chương trình
  const handleDelete = async (maCT) => {
    if (window.confirm("Xác nhận xóa chương trình")) {
      try {
        const res = await deleteChuongTrinh(maCT);
        if (res && res.data.EC === 0) {
          // const lst = [...chuongTrinhList];
          // const itemToBeRemoved = { maCT: res.data.DT.maCT };
          // const findIndex = lst.findIndex(
          //   (item) => item.maCT === itemToBeRemoved.maCT
          // );
          // findIndex !== -1 && lst.splice(findIndex, 1);
          // setChuongTrinhList(lst);
          // // clearSelected();
          toast.success(res.data.MS);
          await fetchDsChuongTrinh();
        } else if (res.data.EC > 0) {
          toast.warning(res.data.MS);
        } else {
          toast.error(res.data.MS);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //hàm reset chương trình được chọn
  const clearSelected = () => {
    setSelectedCT(chuongTrinhDefault);
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
                <th scope="col">Mã chương trình</th>
                <th scope="col">Tên chương trình</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {chuongTrinhList &&
                chuongTrinhList.length > 0 &&
                chuongTrinhList.map((value, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{value.maCT}</th>
                      <td>{value.tenCT}</td>
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
                            handleDelete(value.maCT);
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
      <ThemChuongTrinhModal
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
      />
      <SuaChuongTrinhModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        selectedCT={selectedCT}
      />
      <ToastContainer />
    </div>
  );
};

export default QuanLyChuongTrinh;
