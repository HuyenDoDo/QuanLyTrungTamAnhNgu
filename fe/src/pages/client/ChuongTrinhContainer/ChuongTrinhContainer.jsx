import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../../components/client/Sidebar/Sidebar";
import { findChuongTrinh } from "../../../services/ChuongTrinhService";
import "./ChuongTrinhContainer.scss";

const ChuongTrinhContainer = () => {
  let location = useLocation();
  const splitedPathname = location.pathname.split("/");
  const maCT = splitedPathname[splitedPathname.length - 1];

  //--khai báo state--
  const [chuongTrinh, setChuongTrinh] = useState(null);
  //---khai báo state---

  //--gọi api--
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await findChuongTrinh(maCT);
        setChuongTrinh(res.data.DT);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [maCT]);
  //---gọi api---
  return (
    <div className="chuong-trinh-container">
      <div className="chuong-trinh-top">
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="breadcrumb-item">Chương trình học</li>
              <li className="breadcrumb-item active" aria-current="page">
                {chuongTrinh && chuongTrinh.tenCT}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="chuong-trinh-content">
        <div className="container-fluid">
          <div className="row">
            <div className="content-left col-9">
              <div className="detail-container">
                <div className="chuong-trinh-title">
                  <h1>{chuongTrinh && chuongTrinh.tenCT}</h1>
                </div>
                <div className="chuong-trinh-desc">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: chuongTrinh && chuongTrinh.mkdownHtml,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="content-right col-3">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChuongTrinhContainer;
