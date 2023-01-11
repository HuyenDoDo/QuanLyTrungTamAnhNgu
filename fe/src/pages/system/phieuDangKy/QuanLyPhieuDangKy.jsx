import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getPhieuDangKy } from "../../../services/PhieuDangKyService";
import { convertDate, convertMonetaryUnit } from "../../../Utils/convert";
import SuaPdkModal from "./SuaPdkModal/SuaPdkModal";

const QuanLyPhieuDangKy = () => {
  //--khai báo state--
  const [pdkList, setPdkList] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPdk, setselectedPdk] = useState({});

  //---khai báo state---

  //--gọi api--
  useEffect(() => {
    const fetchData = async () => {
      const res = await getPhieuDangKy();
      if (res.data.EC === 0) {
        setPdkList(res.data.DT);
      }
    };
    fetchData();
  }, []);
  //---gọi api---

  //--Định nghĩa hàm--
  const handleShowUpdateModal = (selected) => {
    setselectedPdk(selected);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = async (data) => {
    setShowUpdateModal(false);
    if (data) {
    }
    clearSelected(); //reset chương trình đã chọn để cập nhật
  };

  const clearSelected = () => {
    setselectedPdk({});
  };

  return (
    <div className="container p-3">
      <div className="row m-2 bg-white px-3 py-4 rounded-1">
        <div className="col-12">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Học viên</th>
                <th scope="col">Tổng học phí</th>
                <th scope="col">Ngày đăng ký</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {pdkList &&
                pdkList.length > 0 &&
                pdkList.map((value, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{value.maHV}</td>
                      <td>{convertMonetaryUnit(value.tongHocPhi)}VNĐ</td>
                      <td>{convertDate(value.createdAt)}</td>
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
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <SuaPdkModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        selectedPdk={selectedPdk}
      />
      <ToastContainer />
    </div>
  );
};

export default QuanLyPhieuDangKy;
