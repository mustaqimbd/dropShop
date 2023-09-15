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
<<<<<<< HEAD
      <ContainerFull>     
=======
      <ContainerFull>
>>>>>>> 520964dc6f9426c8232816896c8164a1cbba187d
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
