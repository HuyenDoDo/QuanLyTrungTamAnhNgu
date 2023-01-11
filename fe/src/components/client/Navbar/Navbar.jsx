import { NavLink, Link } from "react-router-dom";
import logo from "../../../assets/image/logo.svg";
import "./Navbar.scss";
const Navbar = (props) => {
  const { chuongTrinhList } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          <img className="navbar-logo" src={logo} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/about"}>
                Về chúng tôi
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"#"}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Chương trình học
              </Link>
              <ul className="dropdown-menu">
                {chuongTrinhList &&
                  chuongTrinhList.length > 0 &&
                  chuongTrinhList.map((value, index) => {
                    return (
                      <li key={index}>
                        <Link
                          className="dropdown-item"
                          to={`/chuongtrinh/${value.maCT}`}
                        >
                          {value.tenCT}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/dang-ky-lop"}
              >
                Khóa học
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
