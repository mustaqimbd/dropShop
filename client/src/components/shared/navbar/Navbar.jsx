import { Typography } from "@mui/material";
import ContainerFull from "../../container/ContainerFull";
import ContainerMax from "../../container/ContainerMax";
import { Link } from "react-router-dom";

const Navbar = ({ openMobileMenu }) => {
  const links = (
    <>
      <div>
        <Link to="/">
          <div className="flex gap-3 items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21.4453 5.09766C21.4453 5.76429 20.9049 6.30469 20.2383 6.30469H4.06641C3.39977 6.30469 2.85938 5.76429 2.85938 5.09766C2.85938 4.43102 3.39977 3.89062 4.06641 3.89062H20.2383C20.9049 3.89062 21.4453 4.43102 21.4453 5.09766ZM17.5312 12.0352C17.5312 12.7018 16.9908 13.2422 16.3242 13.2422H4.06641C3.39977 13.2422 2.85938 12.7018 2.85938 12.0352C2.85938 11.3685 3.39977 10.8281 4.06641 10.8281H16.3242C16.9908 10.8281 17.5312 11.3685 17.5312 12.0352ZM11.0391 18.9492C11.0391 19.6158 10.4987 20.1562 9.83203 20.1562H4.06641C3.39977 20.1562 2.85938 19.6158 2.85938 18.9492C2.85938 18.2826 3.39977 17.7422 4.06641 17.7422H9.83203C10.4987 17.7422 11.0391 18.2826 11.0391 18.9492Z"
                fill="#5F6C72"
              />
            </svg>
            <Typography
              fontWeight={"fontWeightMedium"}
              color={"customColors.linkText"}
            >
              {" "}
              All Category
            </Typography>
          </div>
        </Link>
      </div>
      <div>
        <Link to="/track-order">
          <div className="flex gap-3 items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.25 21.75H18.75"
                stroke="#5F6C72"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z"
                stroke="#5F6C72"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z"
                stroke="#5F6C72"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Typography
              fontWeight={"fontWeightMedium"}
              color={"customColors.linkText"}
            >
              {" "}
              Track Order
            </Typography>
          </div>
        </Link>
      </div>
      <div>
        <div className="flex gap-3 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.1406 12.7501H18.1406C17.7428 12.7501 17.3613 12.9081 17.08 13.1894C16.7987 13.4707 16.6406 13.8522 16.6406 14.2501V18.0001C16.6406 18.3979 16.7987 18.7794 17.08 19.0607C17.3613 19.342 17.7428 19.5001 18.1406 19.5001H19.6406C20.0384 19.5001 20.42 19.342 20.7013 19.0607C20.9826 18.7794 21.1406 18.3979 21.1406 18.0001V12.7501ZM21.1406 12.7501C21.1407 11.5618 20.9054 10.3854 20.4484 9.28851C19.9915 8.19166 19.3218 7.19616 18.4781 6.35944C17.6344 5.52273 16.6334 4.86136 15.5328 4.41351C14.4322 3.96565 13.2538 3.74017 12.0656 3.75007C10.8782 3.74141 9.70083 3.96781 8.60132 4.41623C7.5018 4.86464 6.50189 5.5262 5.6592 6.36279C4.81651 7.19938 4.1477 8.19446 3.69131 9.29069C3.23492 10.3869 2.99997 11.5626 3 12.7501V18.0001C3 18.3979 3.15804 18.7794 3.43934 19.0607C3.72064 19.342 4.10218 19.5001 4.5 19.5001H6C6.39782 19.5001 6.77936 19.342 7.06066 19.0607C7.34196 18.7794 7.5 18.3979 7.5 18.0001V14.2501C7.5 13.8522 7.34196 13.4707 7.06066 13.1894C6.77936 12.9081 6.39782 12.7501 6 12.7501H3"
              stroke="#5F6C72"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Typography
            fontWeight={"fontWeightMedium"}
            color={"customColors.linkText"}
          >
            {" "}
            Customer Support
          </Typography>
        </div>
      </div>
      <div>
        <Link to="/need-help">
          <div className="flex gap-3 items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="#5F6C72"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.25 11.25H12V16.5H12.75"
                stroke="#5F6C72"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.1875 7.875C12.1875 8.08211 12.0196 8.25 11.8125 8.25C11.6054 8.25 11.4375 8.08211 11.4375 7.875C11.4375 7.66789 11.6054 7.5 11.8125 7.5C12.0196 7.5 12.1875 7.66789 12.1875 7.875Z"
                fill="#191C1F"
                stroke="#5F6C72"
                strokeWidth="1.5"
              />
            </svg>
            <Typography
              fontWeight={"fontWeightMedium"}
              color={"customColors.linkText"}
            >
              Need Help
            </Typography>
          </div>
        </Link>
      </div>
    </>
  );
  return (
    <ContainerFull>
      <div className="hidden bg-white border-b h-[52px] md:flex items-center">
        <ContainerMax>
          <div className="flex justify-between items-center px-12">
            <div className="flex gap-5">{links}</div>
          </div>
        </ContainerMax>
      </div>
      <div
        className={`${
          openMobileMenu ? "flex" : "hidden"
        }  bg-white/90 backdrop-blur-sm w-max p-5 fixed h-screen flex-col gap-3 z-20`}
      >
        {links}
      </div>
    </ContainerFull>
  );
};

export default Navbar;
