import { Typography } from "@mui/material";
import ContainerFull from "../../container/ContainerFull";
import ContainerMax from "../../container/ContainerMax";
import cartIon from "../../../assets/icons/cart.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [orderCart, setOrderCart] = useState(() => {
    const storedData = localStorage.getItem("orderCart");
    return storedData ? JSON.parse(storedData) : [];
  });

  // Update localStorage whenever orderCart changes
  useEffect(() => {
    localStorage.setItem("orderCart", JSON.stringify(orderCart));
  }, [orderCart]);

  return (
    <ContainerFull>
      <div className="w-full bg-primary p-3">
        <ContainerMax>
          <div className="flex px-10 item-center justify-between">
            <div className="flex-1">
              <Typography variant="h4" color={"white"}>
                <Link to="/">DropShop</Link>
              </Typography>
            </div>
            <div className="flex flex-1 items-center relative">
              <input className="w-full p-2 rounded-md" type="text" />
              <span className="absolute right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9.0625 15.625C12.6869 15.625 15.625 12.6869 15.625 9.0625C15.625 5.43813 12.6869 2.5 9.0625 2.5C5.43813 2.5 2.5 5.43813 2.5 9.0625C2.5 12.6869 5.43813 15.625 9.0625 15.625Z"
                    stroke="#191C1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.7031 13.7031L17.5 17.5"
                    stroke="#191C1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div className="flex-1 flex gap-4 justify-end items-center">
              <button
                onClick={() => navigate("/checkout-cart")}
                className="relative "
              >
                <img src={cartIon} alt="" />
                <span className="absolute bg-iconBg w-6 h-6 items-center text-center rounded-full -top-3 -right-2 text-ratingCount">
                  {orderCart.length || 0}
                </span>
              </button>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 27C16 27 3.5 20 3.5 11.5C3.5 9.99737 4.02062 8.54114 4.97328 7.37908C5.92593 6.21703 7.25178 5.42093 8.72525 5.12624C10.1987 4.83154 11.7288 5.05646 13.0551 5.76272C14.3814 6.46898 15.4221 7.61296 16 9.00001C16.5779 7.61296 17.6186 6.46898 18.9449 5.76272C20.2712 5.05646 21.8013 4.83154 23.2748 5.12624C24.7482 5.42093 26.0741 6.21703 27.0267 7.37908C27.9794 8.54114 28.5 9.99737 28.5 11.5C28.5 20 16 27 16 27Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M3.875 26.9999C5.10367 24.8713 6.87104 23.1037 8.99944 21.8747C11.1278 20.6458 13.5423 19.9988 16 19.9988C18.4577 19.9988 20.8722 20.6458 23.0006 21.8747C25.129 23.1037 26.8963 24.8713 28.125 26.9999"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </ContainerMax>
      </div>
    </ContainerFull>
  );
};

export default Header;
