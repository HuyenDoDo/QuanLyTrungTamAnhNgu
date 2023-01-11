import React from "react";
import { Outlet } from "react-router-dom";
import "./SystemPage.scss";
import { SystemNavigator } from "../../components/system/systemNavigator/SystemNavigator";
import { SystemTopbar } from "../../components/system/systemTopbar/SystemTopbar";

const SystemPage = () => {
  return (
    <div className="system-container">
      <SystemNavigator />

      <div className="system-main">
        <SystemTopbar />

        <div className="system-content">
          <Outlet />
        </div>
        {/* <div className="card-box">
          <div className="card">
            <div>
              <div className="numbers">1.024</div>
              <div className="cardName">Daily Views</div>
            </div>
            <div className="icon-box">
              <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">80</div>
              <div className="cardName">Sales</div>
            </div>
            <div className="icon-box">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">208</div>
              <div className="cardName">Comments</div>
            </div>
            <div className="icon-box">
              <FontAwesomeIcon icon={faComment} />
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">$6,042 </div>
              <div className="cardName">Earning</div>
            </div>
            <div className="icon-box">
              <FontAwesomeIcon icon={faUsd} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SystemPage;
