import { Outlet } from "react-router-dom";

const DropShipper = () => {
  return (
    <>
      <Outlet />
      <h2>from dropshipper</h2>
    </>
  );
};

export default DropShipper;
