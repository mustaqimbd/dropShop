import { Button } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ViewAllButton = ({ title }) => {
  return (
    <Button size="small">
      {" "}
      <span className="font-sans text-black">{title} <ChevronRightIcon /> </span>{" "}
    </Button>
  );
};
const PrimaryButton = ({ title }) => {
  return (
    <button className="bg-primary w-full px-3 py-2" >
      {" "}
      <span className="font-sans text-white">{title} <ChevronRightIcon /> </span>{" "}
    </button>
  );
};

export const AddindButton = ({logo}) =>{
  return <Button>{logo}</Button>
}

 const BackToOrderBtn = ({ title }) => {
  return (
    <button className="bg-primary  px-3 py-2 my-10" >
      {" "}
      <span className="font-sans text-white"><ChevronRightIcon />{" "}{title}  </span>{" "}
    </button>
  );
};




export { ViewAllButton ,PrimaryButton,BackToOrderBtn};
