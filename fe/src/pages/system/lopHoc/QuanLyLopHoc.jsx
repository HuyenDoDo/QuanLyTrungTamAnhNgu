import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteLopHoc, getLopHoc } from "../../../services/LopHocService";
import SuaLopHocModal from "./SuaLopHocModal/SuaLopHocModal";
import { ThemLopHocModal } from "./ThemLopHocModal/ThemLopHocModal";
import { convertMonetaryUnit } from "../../../Utils/convert";
import { getChuongTrinh } from "../../../services/ChuongTrinhService";

const QuanLyLopHoc = () => {
  const lopDefault = {
    maLop: "",
    tenLop: "",
    hocPhi: 0,
    thoiLuong: 0,
    maCT: "",
    chuongTrinh: {
      maCT: "",
      tenCT: "",
    },
  };

  //--khai báo state--
  const [chuongTrinhList, setChuongTrinhList] = useState([]);
  const [LopHocList, setLopHocList] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedLop, setSelectedLop] = useState(lopDefault);
  //---khai báo state---

  //--Gọi API--
  //truyền cho Modal
  useEffect(() => {
    const fetchData = async () => {
      await fetchDsLopHoc();
      await fetchDsChuongTrinh();
    };
    fetchData();
  }, []);
  //---Gọi API---

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

  const fetchDsLopHoc = async () => {
    try {
      const res = await getLopHoc();
      if (res && res.data.EC === 0) {
        setLopHocList(res.data.DT);
      } else {
        toast.error(res.data.MS);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi server...");
    }
  };

  //Modal thêm
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = async (data) => {
    setShowCreateModal(false);
    if (data) {
      // const lst = [...LopHocList];
      // lst.push(data);
      // setLopHocList(lst);
      await fetchDsLopHoc();
    }
  };

  //Modal sửa
  const handleShowUpdateModal = (selectedLop) => {
    setSelectedLop(selectedLop);
    setShowUpdateModal(true);
  };
  const handleCloseUpdateModal = async (data) => {
    setShowUpdateModal(false);
    if (data) {
      // const lst = [...LopHocList];
      // const findIndex = lst.findIndex(
      //   (item) => item.maLop === selectedLop.maLop
      // );
      // findIndex !== -1 && lst.fill(data, findIndex, findIndex + 1);
      // setLopHocList(lst);
      await fetchDsLopHoc();
    }
    clearSelected();
  };

  const handleDelete = async (maLop) => {
    if (window.confirm("Xác nhận xóa lớp học")) {
      try {
        const res = await deleteLopHoc(maLop);
        if (res && res.data.EC === 0) {
          // const lst = [...LopHocList];
          // // console.log(res.data.DT.maLop);
          // const itemToBeRemoved = { maLop: res.data.DT.maLop };
          // const findIndex = lst.findIndex(
          //   (item) => item.maLop === itemToBeRemoved.maLop
          // );
          // // console.log(findIndex);
          // findIndex !== -1 && lst.splice(findIndex, 1);
          // setLopHocList(lst);
          // // clearSelected();
          toast.success(res.data.MS);
          await fetchDsLopHoc();
        } else if (res.data.EC === 1) {
          toast.error(res.data.MS);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clearSelected = () => {
    setSelectedLop(lopDefault);
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
                <th scope="col">Mã lớp</th>
                <th scope="col">Tên lớp</th>
                <th scope="col">Chương trình</th>
                <th scope="col">Thời lượng (giờ)</th>
                <th scope="col">Học phí</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {LopHocList &&
                LopHocList.length > 0 &&
                LopHocList.map((value, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{value.maLop}</th>
                      <td>{value.tenLop}</td>
                      <td>{value.chuongTrinh.tenCT}</td>
                      <td>{value.thoiLuong}</td>
                      <td>{convertMonetaryUnit(value.hocPhi)}</td>
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
                            handleDelete(value.maLop);
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
      <ThemLopHocModal
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        chuongTrinhList={chuongTrinhList}
      />
      <SuaLopHocModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        chuongTrinhList={chuongTrinhList}
        selectedLop={selectedLop}
      />
      <ToastContainer />
    </div>
  );
};

export default QuanLyLopHoc;
