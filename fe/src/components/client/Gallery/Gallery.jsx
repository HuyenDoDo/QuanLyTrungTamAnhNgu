import "./Gallery.scss";
import Slider from "react-slick";
import CardSlider from "../CardSlider/CardSlider";
import { useState } from "react";
import { useEffect } from "react";
import { getChuongTrinh } from "../../../services/ChuongTrinhService";

const Gallery = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  //--Khai báo state--
  const [chuongTrinhList, setChuongTrinhList] = useState([]);
  //---Khai báo state---

  //--Gọi API--
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getChuongTrinh();
        setChuongTrinhList(res.data.DT);
      } catch {}
    };
    fetchData();
  }, []);
  //---Gọi API---

  //--Định nghĩa hàm--

  //---Định nghĩa hàm---

  return (
    <div className="gallery">
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
        <path fill="#fff" fillOpacity="1" d="M0,96L1440,96L1440,0L0,0Z"></path>
      </svg> */}
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-12 text-center">
            <h1 className="title">Chương Trình Học</h1>
          </div>
        </div>
        <div className="row">
          <div className="m-auto">
            <Slider {...settings}>
              {chuongTrinhList &&
                chuongTrinhList.length > 0 &&
                chuongTrinhList.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="col-md-4 p-3 d-flex justify-content-center text-center"
                    >
                      <CardSlider chuongTrinh={value} />
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,96L1440,96L1440,320L0,320Z"
        ></path>
      </svg> */}
    </div>
  );
};

export default Gallery;
