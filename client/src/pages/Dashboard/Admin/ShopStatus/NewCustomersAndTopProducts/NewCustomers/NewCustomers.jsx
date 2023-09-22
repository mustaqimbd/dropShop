import Divider from "@mui/material/Divider";
import CachedIcon from "@mui/icons-material/Cached";
import useGetRequest from "../../../../../../hooks/useGetRequest";

const NewCustomers = () => {
  //   const { data } = useGetRequest("new-customer","admin/dasboard/");

  return (
    <>
      <div className="flex justify-between">
        <h2 className="dashboard-title">New customers</h2>
        <button>
          <CachedIcon />
        </button>
      </div>
      <Divider />
      <div></div>
    </>
  );
};

export default NewCustomers;
