import { Outlet } from "react-router-dom";
import Header from "../../components/shared/header/Header";
import Topbar from "../../components/shared/topbar/Topbar";
import Footer from "../../components/shared/footer/Footer";
import Navbar from "../../components/shared/navbar/Navbar";
import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";

const MainLayout = () => {
  return (
    <div className="">
      <ContainerFull>
        <Topbar></Topbar>
        <Header></Header>
        <Navbar></Navbar>
      </ContainerFull>

      <ContainerMax >
        <Outlet></Outlet>
      </ContainerMax>

      <ContainerFull>
        <Footer></Footer>
      </ContainerFull>
    </div>
  );
};

export default MainLayout;
