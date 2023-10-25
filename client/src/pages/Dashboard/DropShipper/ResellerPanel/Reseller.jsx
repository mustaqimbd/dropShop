import { Link } from "react-router-dom";
import CustomPieChart from "./CustomPieChart";
import { PeopleAlt, Redeem } from "@mui/icons-material";
import EarningTable from "./EarningTable";
import useGetRequest from "../../../../hooks/useGetRequest";


const Reseller = () => {
  const { data } = useGetRequest(
    "order-statistics",
    "reseller/dashboard/reseller-statistics"
  );
 
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Reseller Panel</h1>
        <p>Welcome to your panel Md. Mustaqim Khan! At a glance everything</p>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5 mb-6">
        <div className="text-white px-5 py-3 bg-[#2DA5F3] space-y-4 rounded">
          <div className="space-y-3">
            <div className="flex justify-between">
              <h1 className="text-lg font-bold">Available Balance</h1>
              <Link className="text-sm">View earning</Link>
            </div>
            <h1 className="text-2xl font-bold">350 ৳</h1>
            <p className="text-sm">350 ৳ earnings in the last 30 days</p>
          </div>
          <div className="space-y-3">
            <p className="text-lg font-bold">Amount of profit in this month</p>
            <h1 className="text-2xl font-bold">350 ৳</h1>
          </div>
        </div>
        <div className="px-5 py-3 rounded">
          <h1 className="font-bold">Order statistics (last 30 days)</h1>
          <div className=" w-full h-[200px] ">
            <CustomPieChart orderStatistics={data.payload?.orderStatistics[0]} />
          </div>
        </div>

        <div className="p-5 py-3 space-y-5 bg-white rounded">
          <h1 className="font-bold">Store statistics (last 30 days)</h1>
          <div className="flex justify-between items-center">
            <div>
              <h1>Orders</h1>
              <h1 className="font-bold">
                {data.payload?.orderStatistics[0]?.orders?.length}
              </h1>
            </div>
            <div className="hover:bg-[#deebf3] p-3">
              <Link to="/dashboard/dropshipper/my-orders">
                <Redeem className="text-[#2DA5F3]" />
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1>Customer</h1>
              <h1 className="font-bold">{data.payload?.customers?.length}</h1>
            </div>
            <div className="hover:bg-[#deebf3] p-3">
              <Link to="/dashboard/dropshipper/my-customers">
                <PeopleAlt className="text-[#2DA5F3]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <EarningTable />
      </div>
    </div>
  );
};

export default Reseller;
