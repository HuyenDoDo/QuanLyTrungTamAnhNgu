import "./KhoaHocRegister.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "./RegisterModal";

const KhoaHocRegister = () => {
  const { loggedIn } = useSelector((state) => state.hocVien);
  const navigate = useNavigate();
  //--khai báo state--
  const [showModal, setShowModal] = useState(false);
  //---khai báo state---

  //--định nghĩa hàm--
  const handleCloseModal = async () => {
    setShowModal(false); //đóng modal
  };
  const handleShowModal = () => setShowModal(true);

  const handleClick = () => {
    if (!loggedIn) {
      handleShowModal();
    } else {
      navigate("/dang-ky-lop");
    }
  };
  //---định nghĩa hàm---

  return (
    <div className="khoahoc-register">
      <div className="container text-center">
        <button
          type="button"
          className="btn btn-primary text-light fw-bold"
          onClick={() => {
            handleClick();
          }}
        >
          Đăng ký học ngay!!!
        </button>
      </div>
      <RegisterModal show={showModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default KhoaHocRegister;
