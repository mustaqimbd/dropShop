import { Button } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ViewAllButton = ({ title }) => {
  return (
    <Button size="small">
      <span className="font-sans text-black">
        {title} <ChevronRightIcon />
      </span>
    </Button>
  );
};
const PrimaryButton = ({ title }) => {
  return (
    <button className="bg-primary w-full px-2 md:px-3 py-1 md:py-2 rounded-sm shadow-lg">
      <span className="font-semibold text-white text-sm md:text-lg">
        {title} <ChevronRightIcon />
      </span>
    </button>
  );
};

export const AddindButton = ({ logo }) => {
  return <Button>{logo}</Button>;
};

const BackToOrderBtn = ({ title }) => {
  return (
    <Button variant="contained">
      <span className="font-sans text-white">
        <ChevronRightIcon /> {title}
      </span>
    </Button>
  );
};

const TryFreeButton = ({ title }) => {
  return (
    <button className="bg-primary w-full px-3 py-2">
      <span className="font-sans text-white">{title} </span>
    </button>
  );
};

export { ViewAllButton, PrimaryButton, BackToOrderBtn, TryFreeButton };
