import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getChuongTrinh } from "../../../services/ChuongTrinhService";
import CardSlider from "../CardSlider/CardSlider";
import "./Sidebar.scss";
const Sidebar = () => {
  //--khai báo state--
  const [chuongTrinhList, setChuongTrinhList] = useState([]);
  //---khai báo state---

  //--gọi API--
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
      const res = await getChuongTrinh(3);
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
  //---Định nghĩa hàm---

  return (
    <div className="sidebar-container">
      <div className="sidebar-title text-center text-uppercase fw-bold">
        Chương trình học
      </div>
      {chuongTrinhList &&
        chuongTrinhList.length > 0 &&
        chuongTrinhList.map((value, index) => {
          return <CardSlider key={index} chuongTrinh={value} sidebar={true} />;
        })}
    </div>
  );
};

export default Sidebar;
