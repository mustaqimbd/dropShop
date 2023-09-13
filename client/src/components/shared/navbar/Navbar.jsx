import { Typography } from "@mui/material";
import ContainerFull from "../../container/ContainerFull";
import ContainerMax from "../../container/ContainerMax";

const Navbar = () => {
  return (
    <ContainerFull>
      <div className="bg-white py-3 "></div>
      <ContainerMax>
        <div className="flex">
          <div>

            <div className="flex gap-3 items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M21.4453 5.09766C21.4453 5.76429 20.9049 6.30469 20.2383 6.30469H4.06641C3.39977 6.30469 2.85938 5.76429 2.85938 5.09766C2.85938 4.43102 3.39977 3.89062 4.06641 3.89062H20.2383C20.9049 3.89062 21.4453 4.43102 21.4453 5.09766ZM17.5312 12.0352C17.5312 12.7018 16.9908 13.2422 16.3242 13.2422H4.06641C3.39977 13.2422 2.85938 12.7018 2.85938 12.0352C2.85938 11.3685 3.39977 10.8281 4.06641 10.8281H16.3242C16.9908 10.8281 17.5312 11.3685 17.5312 12.0352ZM11.0391 18.9492C11.0391 19.6158 10.4987 20.1562 9.83203 20.1562H4.06641C3.39977 20.1562 2.85938 19.6158 2.85938 18.9492C2.85938 18.2826 3.39977 17.7422 4.06641 17.7422H9.83203C10.4987 17.7422 11.0391 18.2826 11.0391 18.9492Z" fill="#5F6C72"/>
</svg>
<Typography variant="h6" fontWeight={"fontWeightMedium"} color={"customColors.linkText"}> Category</Typography>
            </div>
          </div>
          <div></div>
        </div>
      </ContainerMax>
    </ContainerFull>
  );
};

export default Navbar;
