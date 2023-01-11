import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./SystemTopbar.scss";
import userImg from "../../../assets/image/user.png";

const toggleMenu = () => {
  let toggle = document.querySelector(".toggle");
  let navigation = document.querySelector(".system-nav-container");
  let main = document.querySelector(".system-main");

  toggle.classList.toggle("active");
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

export const SystemTopbar = () => {
  return (
    <div className="topbar">
      <div
        className="toggle"
        onClick={() => {
          toggleMenu();
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div className="search">
        <label>
          <input type="text" placeholder="Search here" />
          <FontAwesomeIcon
            style={{ position: "absolute", left: "15px", top: "10px" }}
            icon={faMagnifyingGlass}
          />
        </label>
      </div>

      <div className="user">
        <img src={userImg} alt={""} />
      </div>
    </div>
  );
};
