import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useNavigate } from "react-router-dom";

const CustomerInfoNavbar = () => {
  
  const navigate = useNavigate();
  const customer = JSON.parse(sessionStorage.getItem("Customer"));
  console.log(sessionStorage.getItem("Customer"));

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <p>
        Customer id <span className="font-bold">{customer.customerId}</span>
      </p>
      <p>
        You are shopping as{" "}
        <span className="font-bold">{customer.customerName}</span>
      </p>
      <div>
        <button
          onClick={() => navigate("/dashboard/reseller-panel")}
          className=" bg-[#85B643] text-white font-medium px-2 rounded flex items-center gap-1"
        >
          <span>Switch to Reseller Panel</span>{" "}
          <EastOutlinedIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default CustomerInfoNavbar;
