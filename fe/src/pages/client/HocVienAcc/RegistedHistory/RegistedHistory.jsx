import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRegistedHistory } from "../../../../services/HocVienService";

const RegistedHistory = () => {
  const { loggedIn } = useSelector((state) => state.hocVien);
  const navigate = useNavigate();
  //--khai báo state--
  const [khoaHocList, setKhoaHocList] = useState([]);
  const [lopKhoaList, setLopKhoaList] = useState([]);
  //---khai báo state---

  //--gọi api--
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
    const fetchData = async () => {
      const res = await getRegistedHistory();
      if (res.data.EC === 0) {
        setKhoaHocList(res.data.DT);
        console.log(res.data.DT);
      }
    };
    fetchData();
  }, [loggedIn, navigate]);
  //---gọi api---

  return <div>RegistedHistory</div>;
};

export default RegistedHistory;
