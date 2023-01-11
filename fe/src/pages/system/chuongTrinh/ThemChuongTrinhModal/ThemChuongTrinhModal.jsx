import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createChuongTrinh } from "../../../../services/ChuongTrinhService";
import { toast } from "react-toastify";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import alternate from "../../../../assets/image/alt.png";
import uploadFile from "../../../../services/UploadFile";

const ThemChuongTrinhModal = (props) => {
  let { show, handleClose } = props;
  const chuongTrinhDefault = {
    maCT: "",
    tenCT: "",
    moTa: "",
    mkdownText: "",
    mkdownHtml: "",
  };

  //--khai báo state--
  const [chuongTrinh, setChuongTrinh] = useState(chuongTrinhDefault);
  const [file, setFile] = useState(null);
  //---khai báo state---

  //--cleanup file--
  useEffect(() => {
    //cleanup: trước khi render và rerender thì cleanup xóa file cũ trong bộ nhớ để
    //lưu file mới
    return () => {
      //URL.revokeObjectURL(): xóa file khỏi bộ  nhớ
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);
  //---cleanup file---

  //--định nghĩa hàm--
  const handleSetImage = (e) => {
    const file = e.target.files[0];
    //thêm preview vào file
    //URL.createObjectURL(): lưu file tải lên vào bộ nhớ tạm của browser
    //nếu page hiện tại mất thì bộ nhớ cx mất
    file.preview = URL.createObjectURL(file);
    setFile(file);
  };

  // Initialize a markdown parser
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  // Finish!
  const handleEditorChange = ({ html, text }) => {
    setChuongTrinh((prev) => ({ ...prev, mkdownText: text, mkdownHtml: html }));
    console.log(chuongTrinh);
  };

  const handleChange = (e) => {
    // const { value, name } = e.target;
    setChuongTrinh((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(chuongTrinh);
  };

  const clearChuongTrinh = () => {
    setChuongTrinh(chuongTrinhDefault);
  };

  const checkEmptyInput = (obj) => {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (!obj[key] && obj[key] !== 0) {
          return key;
        }
      }
    }
    return;
  };

  const handleSave = async () => {
    try {
      const key = checkEmptyInput(chuongTrinh);
      if (key) {
        let str = "";
        switch (key) {
          case "maCT":
            str = "mã chương trình";
            break;
          case "tenCT":
            str = "tên chương trình";
            break;
          case "moTa":
            str = "mô tả";
            break;
          case "mkdownText":
            str = "nội dung";
            break;
          default:
            break;
        }
        toast.warning(`Bạn chưa nhập ${str}`);
        return;
      }
      const newChuongTrinh = { ...chuongTrinh };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newChuongTrinh.img = filename;
        try {
          await uploadFile(data);
        } catch (error) {
          console.log(error);
        }
      }
      // console.log(chuongTrinh);
      const res = await createChuongTrinh(newChuongTrinh);
      if (res && res.data.EC === 0) {
        toast.success(res.data.MS);
        clearChuongTrinh();
        handleClose(res.data.DT);
      } else if (res.data.EC > 0) {
        toast.error(res.data.MS);
      } else {
        toast.warning(res.data.MS);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //---định nghĩa hàm---

  // console.log(file.name);

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() => handleClose()}
        centered
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới chương trình</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="form-label">Mã chương trình:</label>
              <input
                className="form-control"
                name="maCT"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="form-label">Tên chương trình:</label>
              <input
                className="form-control"
                name="tenCT"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="col-12 form-group mb-3">
              <label className="form-label">Mô tả:</label>
              <textarea
                className="form-control form-control-lg"
                name="moTa"
                onChange={(e) => {
                  handleChange(e);
                }}
              ></textarea>
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Nội dung:</label>
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
              />
            </div>
            <div className="col-12 form-group mb-3">
              <label className="form-label">Ảnh:</label>
              <input
                className="form-control"
                name="img"
                type={"file"}
                accept=".png, .jpg, jpeg"
                multiple
                onChange={(e) => {
                  handleSetImage(e);
                }}
              />
            </div>
            <div className="col-12 form-group mb-3 text-end">
              <img
                className="border rounded"
                style={{ height: "120px" }}
                src={file ? file.preview : alternate}
                alt=""
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Đóng
          </Button>
          <Button type="submit" variant="primary" onClick={() => handleSave()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ThemChuongTrinhModal;
