import { Outlet } from "react-router-dom";
import Header from "../../components/shared/header/Header";
import Topbar from "../../components/shared/topbar/Topbar";
import Footer from "../../components/shared/footer/Footer";
import Navbar from "../../components/shared/navbar/Navbar";
import ContainerFull from "../../components/container/ContainerFull";

const MainLayout = () => {
  return (
    <>
      <ContainerFull>
        <Topbar></Topbar>
        <Header></Header>
        <Navbar></Navbar>
      </ContainerFull>
      <div className="w-full" style={{ minHeight: "calc(100vh - 623px)" }}>
        <Outlet></Outlet>
      </div>
      <ContainerFull>
        <Footer></Footer>
      </ContainerFull>
    </>
  );
};

export default MainLayout;
