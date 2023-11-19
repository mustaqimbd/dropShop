import ContainerFull from "../../container/ContainerFull";
import ContainerMax from "../../container/ContainerMax";
import cartIon from "../../../assets/icons/cart.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QuickLinks from "../../QuickLinks/QuickLinks";
import useAuthProvider from "../../../hooks/useAuthProvider";

const Header = ({ setOpenMobileMenu }) => {
  const { user } = useAuthProvider();
  const navigate = useNavigate();
  const [orderCart] = useState(() => {
    const storedData = localStorage.getItem("orderCart");
    return storedData ? JSON.parse(storedData) : [];
  });

  // Update localStorage whenever orderCart changes
  useEffect(() => {
    localStorage.setItem("orderCart", JSON.stringify(orderCart));
  }, [orderCart]);
  const searchIcon = (color = "#191C1F") => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.0625 15.625C12.6869 15.625 15.625 12.6869 15.625 9.0625C15.625 5.43813 12.6869 2.5 9.0625 2.5C5.43813 2.5 2.5 5.43813 2.5 9.0625C2.5 12.6869 5.43813 15.625 9.0625 15.625Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7031 13.7031L17.5 17.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return (
    <ContainerFull>
      <div className="w-full bg-primary p-3">
        <ContainerMax>
          <div className="flex md:px-10 item-center justify-between">
            <button
              className="flex-1 block md:hidden"
              onClick={() => setOpenMobileMenu(previous => !previous)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21.4453 5.09766C21.4453 5.76429 20.9049 6.30469 20.2383 6.30469H4.06641C3.39977 6.30469 2.85938 5.76429 2.85938 5.09766C2.85938 4.43102 3.39977 3.89062 4.06641 3.89062H20.2383C20.9049 3.89062 21.4453 4.43102 21.4453 5.09766ZM17.5312 12.0352C17.5312 12.7018 16.9908 13.2422 16.3242 13.2422H4.06641C3.39977 13.2422 2.85938 12.7018 2.85938 12.0352C2.85938 11.3685 3.39977 10.8281 4.06641 10.8281H16.3242C16.9908 10.8281 17.5312 11.3685 17.5312 12.0352ZM11.0391 18.9492C11.0391 19.6158 10.4987 20.1562 9.83203 20.1562H4.06641C3.39977 20.1562 2.85938 19.6158 2.85938 18.9492C2.85938 18.2826 3.39977 17.7422 4.06641 17.7422H9.83203C10.4987 17.7422 11.0391 18.2826 11.0391 18.9492Z"
                  fill="#fff"
                />
              </svg>
            </button>
            <div className="flex-1 flex flex-col justify-center">
              <Link
                to="/"
                className="text-md text-white text-2xl md:text-3xl font-bold"
              >
                DropShop
              </Link>
            </div>
            {/* Search input */}
            <div className="hidden md:flex flex-1 items-center relative">
              <input
                className="w-full p-2 rounded-md"
                type="text"
                placeholder="Search here"
              />
              <span className="inline-block ml-2">{searchIcon()}</span>
            </div>
            <div className="flex-1 flex gap-4 justify-end items-center">
              {/* Cart icon */}
              <button
                onClick={() => navigate("/checkout-cart")}
                className="relative hidden md:block"
              >
                <img src={cartIon} alt="" />
                <span className="absolute bg-iconBg w-6 h-6 items-center text-center rounded-full -top-3 -right-2 text-ratingCount">
                  {orderCart.length || 0}
                </span>
              </button>
              <div className="flex items-center">
                <div className="flex md:hidden justify-center">
                  <button className="text-white">{searchIcon("#fff")}</button>
                  <span className="w-[2.5px] h-7 bg-white inline-block ml-2"></span>
                </div>
                <div>
                  {user ? (
                    <QuickLinks />
                  ) : (
                    <Link to="/login">
                      {" "}
                      <span className="ml-2 flex">
                        {" "}
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
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ContainerMax>
      </div>
    </ContainerFull>
  );
};

export default Header;
