import { Link } from "react-router-dom";
import "./CardSlider.scss";
// import efk from "../../../assets/image/efk.jpg";

const CardSlider = (props) => {
  const { chuongTrinh, sidebar } = props;
  const PF = "http://localhost:5000/images/";
  return (
    <div className="chuongtrinh-card">
      <div
        className="card w-100"
        style={
          sidebar === true
            ? { width: "18rem", minHeight: "350px", marginBottom: "20px" }
            : { minHeight: "430px", width: "18rem" }
        }
      >
        <div className="card-image">
          <Link to={`/chuongtrinh/${chuongTrinh.maCT}`}>
            <img
              src={PF + chuongTrinh.img}
              className="card-img-top"
              alt="..."
            />
          </Link>
        </div>
        <div
          className={
            sidebar === true
              ? "card-body d-flex flex-column justify-content-around"
              : "card-body d-flex flex-column justify-content-between"
          }
        >
          <div className="card-content">
            <Link
              style={{ textDecoration: "none" }}
              to={`/chuongtrinh/${chuongTrinh.maCT}`}
            >
              <h4 style={sidebar === true ? { fontSize: "18px" } : {}}>
                {chuongTrinh ? chuongTrinh.tenCT : ""}
              </h4>
            </Link>
            <p className="card-text">{chuongTrinh ? chuongTrinh.moTa : ""} </p>
          </div>
          {sidebar === true ? (
            ""
          ) : (
            <Link
              className="btn btn-primary fw-bold text-white"
              to={`/chuongtrinh/${chuongTrinh.maCT}`}
            >
              Xem chương trình
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
