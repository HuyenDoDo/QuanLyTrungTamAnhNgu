import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./SystemNavigator.scss";

export const SystemNavigator = () => {
  return (
    <div className="system-nav-container">
      <ul>
        <li>
          <span
            className="title"
            style={{
              color: "#fff",
              textAlign: "center",
            }}
          >
            <h2>Trung tâm anh ngữ</h2>
          </span>
        </li>
        <li>
          <Link className="link" to={"/system"}>
            <span className="icon">
              <FontAwesomeIcon
                style={{ color: "#fff", fontSize: "24px" }}
                icon={faHouse}
              />
            </span>
            <span className="title">Dashboard</span>
          </Link>
        </li>
        <li>
          <NavLink className="link" to={"khoahoc"}>
            <span className="icon"></span>
            <span className="title">Quản lý khóa học</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"chuongtrinh"}>
            <span className="icon"></span>
            <span className="title">Quản lý chương trình</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"lophoc"}>
            <span className="icon"></span>
            <span className="title">Quản lý lớp học</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"cahoc"}>
            <span className="icon"></span>
            <span className="title">Quản lý ca học</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"nhomthuhoc"}>
            <span className="icon"></span>
            <span className="title">Quản lý nhóm thứ học</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"hocvien"}>
            <span className="icon"></span>
            <span className="title">Quản lý học viên</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"giangvien"}>
            <span className="icon"></span>
            <span className="title">Quản lý giảng viên</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
