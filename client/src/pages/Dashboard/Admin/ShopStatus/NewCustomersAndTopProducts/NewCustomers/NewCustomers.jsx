import Divider from "@mui/material/Divider";
import CachedIcon from "@mui/icons-material/Cached";
import useGetRequest from "../../../../../../hooks/useGetRequest";

const NewCustomers = () => {
  const { data, refetch } = useGetRequest(
    "new-customer",
    "admin/dashboard/new-customers"
  );
  const customers = data?.payload?.customers;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="dashboard-title">New customers</h2>
        <button onClick={() => refetch()}>
          <CachedIcon />
        </button>
      </div>
      <Divider />
      <div>
        {customers?.map(customer => (
          <div key={customer.email} className="grid grid-cols-5 text-sm mt-5">
            <div className="col-span-1">
              <img
                src={customer.profile_pic}
                alt={customer.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="col-span-3 md:col-span-2">
              <h2 className="font-bold text-caption">{customer?.userName}</h2>
              <p className="text-xs font-semibold text-footerLinkText">
                {customer?.email}
              </p>
            </div>
            <h2 className="col-span-1 font-semibold text-footerLinkText">
              {customer.orderCount} Orders
            </h2>
            <h2 className="col-span-1 hidden md:block font-bold text-caption">
              ${customer.totalSales}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewCustomers;
