import { Outlet } from "react-router-dom";
import Header from "../../components/shared/header/Header";
import Topbar from "../../components/shared/topbar/Topbar";
import Footer from "../../components/shared/footer/Footer";
import Navbar from "../../components/shared/navbar/Navbar";
import ContainerFull from "../../components/container/ContainerFull";


const MainLayout = () => {
  return (
    <div className="">
      <ContainerFull>
        <Topbar></Topbar>
        <Header></Header>
        <Navbar></Navbar>
      </ContainerFull>
      <ContainerFull>     
        <Outlet></Outlet>
      </ContainerFull>
      <ContainerFull>
        <Footer></Footer>
      </ContainerFull>
    </div>
 //ok the kayout . Please dontt breakdown IT 
  );
};

export default MainLayout;
