import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterModal = (props) => {
  const { show, handleCloseModal } = props;
  return (
    <>
      <Modal show={show} onHide={() => handleCloseModal()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p>
                  Bạn cần <Link to={"/login"}>đăng nhập</Link> để đăng ký lớp
                  học
                </p>
                <p>
                  Bạn chưa có tài khoản?{" "}
                  <Link to={"/regist"}>Đăng ký tài khoản</Link>
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterModal;
