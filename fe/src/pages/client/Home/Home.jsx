import Gallery from "../../../components/client/Gallery/Gallery";
import Header from "../../../components/client/Header/Header";
import KhoaHocGallery from "../../../components/client/KhoaHocGallery/KhoaHocGallery";
import KhoaHocRegister from "../../../components/client/KhoaHocRegister/KhoaHocRegister";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Gallery />
      <KhoaHocGallery />
      <KhoaHocRegister />
    </div>
  );
};

export default Home;
