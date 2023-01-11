import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  deleteNhomThuHoc,
  getNhomThuHoc,
} from "../../../services/NhomThuHocService";
// import thư viện
import { ToastContainer, toast } from "react-toastify";
import ThemNhomThuHocModal from "./ThemNhomThuHocModal/ThemNhomThuHocModal";
import SuaNhomThuHocModal from "./SuaNhomThuHocModal/SuaNhomThuHocModal";
// import ThemKhoaHocModal from "./ThemKhoaHocModal/ThemKhoaHocModal";

const QuanLyNhomThuHoc = () => {
  // khai báo state
  // const [dsCaHoc,setdsCaHoc]=useState([]);
  // Modal thêm
  const [showCreateModal, setShowCreateModal] = useState(false);
  // Modal sửa
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  //Chọn ca học để update
  const nhomThuHocDefault = { maNTH: 0, nhomThu: "" };
  const [selectedNTH, setSelectedNTH] = useState(nhomThuHocDefault);
  //ds ca học
  const [nhomThuHocList, setNhomThuHocList] = useState([]);

  //khai báo hàm
  //hàm đóng modal thêm
  const handleCloseCreateModal = async (data) => {
    setShowCreateModal(false); //đóng modal
    //nếu modal có trả về data thì thêm data vào danh sách chương trình
    //(cập nhật state => rerender)
    if (data && data.DT) {
      // const lst = [...caHocList];
      // lst.push(data.DT);
      // setCaHocList(lst);
      await fetchDsNhomThuHoc();
    }
  };
  //hàm mở modal thêm
  const handleShowCreateModal = () => setShowCreateModal(true);

  //hàm đóng modal cập nhật
  const handleCloseUpdateModal = async (data) => {
    setShowUpdateModal(false); //đóng modal
    //nếu modal có trả về data thì cập nhật data vào danh sách chương trình
    //(cập nhật state => rerender)
    if (data && data.DT) {
      // const lst = [...caHocList];
      // //tìm vị trí phần tử cần sửa theo maCT
      // const findIndex = lst.findIndex((item) => item.maCa === selectedCH.maCa);
      // //thay thế phần tử cũ bằng data trả về
      // findIndex !== -1 && lst.fill(data.DT, findIndex, findIndex + 1);
      // setCaHocList(lst);
      // console.log(selectedCT);
      await fetchDsNhomThuHoc();
    }
    clearSelected(); //reset chương trình đã chọn để cập nhật
  };
  //hàm mở modal cập nhật
  const handleShowUpdateModal = (selected) => {
    setSelectedNTH(selected);
    setShowUpdateModal(true);
  };
  //hàm reset nhóm thứ học học được chọn
  const clearSelected = () => {
    selectedNTH(nhomThuHocDefault);
  };

  const fetchDsNhomThuHoc = async () => {
    try {
      const res = await getNhomThuHoc();
      if (res && res.data.EC === 0) {
        setNhomThuHocList(res.data.DT);
      } else {
        toast.error(res.data.MS);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi server");
    }
  };
  // Gọi API
  // sau khi render giao diện lần đầu thì react có hàm component did mount
  useEffect(() => {
    const getdsNhomThuHoc = async () => {
      await fetchDsNhomThuHoc();
    };
    getdsNhomThuHoc();
  }, []);

  // console.log(dsKhoaHoc)

  const handleDelete = async (maNTH) => {
    try {
      let res = await deleteNhomThuHoc(maNTH);
      console.log(res.data.DT);
      if (res.data.EC === 0) {
        // const lst = [...dsCaHoc];//clone danh sách ra biến lst
        // const itemToBeRemoved = { maCa: res.data.DT.maCa };//tạo object gồm maCT đã xóa
        // const findIndex = lst.findIndex(
        //   (item) => item.maCa === itemToBeRemoved.maCa
        // );//lấy ra stt của phần tử cần xóa trong danh sách tạm
        // findIndex !== -1 && lst.splice(findIndex, 1);//xóa 1 phần tử tại vị trí findIndex
        // console.log(findIndex)
        // setdsCaHoc(lst);
        // clearSelected();
        toast.success(res.data.MS);
        await fetchDsNhomThuHoc();
      } else if (res.data.EC === 1) {
        toast.error(res.data.MS);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container p-3">
      <div className="row m-2 bg-white p-3 rounded-1">
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
                <th scope="col">Mã nhóm thứ học</th>
                <th scope="col">Nhóm thứ</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {nhomThuHocList && // kiểm tra ds có tồn tại hay không
                nhomThuHocList.length > 0 && // kiểm tra xem có rỗng hay không
                nhomThuHocList.map((value, index) => {
                  // lấy ra tất cả phần tử(value hoặc item) trong danh sách
                  return (
                    <tr key={index}>
                      {/* đổ dữ liệu vào */}
                      <th scope="row">{value.maNTH}</th>
                      <td>{value.nhomThu}</td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-warning mx-1"
                          onClick={() => {
                            handleShowUpdateModal(value);
                          }}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger mx-1"
                          onClick={() => {
                            handleDelete(value.maNTH);
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
        <ThemNhomThuHocModal
          show={showCreateModal}
          handleClose={handleCloseCreateModal}
        ></ThemNhomThuHocModal>
        <SuaNhomThuHocModal
          show={showUpdateModal}
          handleClose={handleCloseUpdateModal}
          selectedNTH={selectedNTH}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default QuanLyNhomThuHoc;
