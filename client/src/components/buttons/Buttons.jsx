import { Button } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ViewAllButton = ({ title }) => {
  return (
    <Button size="small">
      {" "}
      <span className="font-['sans'] text-black">{title} <ChevronRightIcon /> </span>{" "}
    </Button>
  );
};

export { ViewAllButton };
