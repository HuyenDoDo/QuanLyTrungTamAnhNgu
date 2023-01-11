import "./Header.scss";
import header from "../../../assets/image/oxford.jpg";
const Header = () => {
  return (
    <div className="header-container pb-5 bg-white">
      <div className="row">
        <img className="header-img" src={header} alt="" />
      </div>
      {/* <div className="row header-bg"></div> */}
    </div>
  );
};

export default Header;
