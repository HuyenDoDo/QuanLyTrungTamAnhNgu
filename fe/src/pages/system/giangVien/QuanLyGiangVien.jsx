import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  deleteGiangVien,
  getGiangVien,
} from "../../../services/GiangVienService";
// import thư viện
import { ToastContainer, toast } from "react-toastify";
import ThemGiangVienModal from "./ThemGiangVienModal/ThemGiangVienModal";
import SuaGiangVienModal from "./SuaGiangVienModal/SuaGiangVienModal";
import { convertDate } from "../../../Utils/convert";
// import ThemKhoaHocModal from "./ThemKhoaHocModal/ThemKhoaHocModal";

const QuanLyGiangVien = () => {
  // khai báo state
  // const [dsCaHoc,setdsCaHoc]=useState([]);
  // Modal thêm
  const [showCreateModal, setShowCreateModal] = useState(false);
  // Modal sửa
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  //Chọn ca học để update
  const giangVienDefault = {
    maGV: 0,
    hoTenLot: "",
    ten: "",
    ngaySinh: "",
    email: "",
    sdt: "",
    diaChi: "",
  };
  const [selectedGV, setSelectedGV] = useState(giangVienDefault);
  //ds ca học
  const [giangVienList, setGiangVienList] = useState([]);

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
      await fetchDsGiangVien();
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
      await fetchDsGiangVien();
    }
    clearSelected(); //reset chương trình đã chọn để cập nhật
  };
  //hàm mở modal cập nhật
  const handleShowUpdateModal = (selected) => {
    setSelectedGV(selected);
    setShowUpdateModal(true);
  };
  //hàm reset ca học được chọn
  const clearSelected = () => {
    selectedGV(giangVienDefault);
  };

  const fetchDsGiangVien = async () => {
    try {
      const res = await getGiangVien();
      if (res && res.data.EC === 0) {
        setGiangVienList(res.data.DT);
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
    const getdsGiangVien = async () => {
      await fetchDsGiangVien();
    };
    getdsGiangVien();
  }, []);

  // console.log(dsKhoaHoc)

  const handleDelete = async (maGV) => {
    try {
      let res = await deleteGiangVien(maGV);
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
        await fetchDsGiangVien();
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
                <th scope="col">Mã học vien</th>
                <th scope="col">Ho ten lot</th>
                <th scope="col">Ten</th>
                <th scope="col">Ngay sinh</th>
                <th scope="col">Email</th>
                <th scope="col">So dien thoai</th>
                <th scope="col">Dia chi</th>
              </tr>
            </thead>
            <tbody>
              {giangVienList && // kiểm tra ds có tồn tại hay không
                giangVienList.length > 0 && // kiểm tra xem có rỗng hay không
                giangVienList.map((value, index) => {
                  // lấy ra tất cả phần tử(value hoặc item) trong danh sách
                  return (
                    <tr key={index}>
                      {/* đổ dữ liệu vào */}
                      <th scope="row">{value.maGV}</th>
                      <td>{value.hoTenLot}</td>
                      <td>{value.ten}</td>
                      <td>{convertDate(value.ngaySinh)}</td>
                      <td>{value.email}</td>
                      <td>{value.sdt}</td>
                      <td>{value.diaChi}</td>
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
                            handleDelete(value.maGV);
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
        <ThemGiangVienModal
          show={showCreateModal}
          handleClose={handleCloseCreateModal}
        ></ThemGiangVienModal>
        <SuaGiangVienModal
          show={showUpdateModal}
          handleClose={handleCloseUpdateModal}
          selectedGV={selectedGV}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default QuanLyGiangVien;
