import { Outlet } from "react-router-dom";

const DropShipper = () => {
  return (
    <div className="bg-[#F3F3F9] p-5">
      <Outlet />
    </div>
  );
};

export default DropShipper;
