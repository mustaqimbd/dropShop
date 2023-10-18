import ProfitTable from "./ProfitTable";
import { FileDownload } from "@mui/icons-material";
import AreaCharts from "../../../../components/AreaCharts/AreaCharts";
import TablePagination from "../../../../components/pagination/TablePagination";
import useAuthProvider from "../../../../hooks/useAuthProvider";
import { useState } from "react";
import useGetRequest from "../../../../hooks/useGetRequest";
import Search from "../../../../components/search/Search";
const chartData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const Profit = () => {
  const { user } = useAuthProvider();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const perPage = 3;

  const profit = `reseller/dashboard/profit/${user.reseller_id}?page=${currentPage}&limit=${perPage}`;

  const searchApi = `/api/reseller/dashboard/profit/${user.reseller_id}/search`;

  const { data } = useGetRequest("profit", profit);
  console.log(searchResults);
  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        <div className="text-center p-5 bg-white rounded">
          <h2 className="text-lg font-bold">This Month&apos;s Profits</h2>
          <h1 className="text-2xl font-bold my-1">0 ৳</h1>
          <p className="text-sm">Total profit from month start</p>
        </div>
        <div className="text-center p-5 bg-white rounded">
          <h2 className="text-lg font-bold">Profits Across Last 30 Days</h2>
          <h1 className="text-2xl font-bold my-1">0 ৳</h1>
          <p className="text-sm">Over the last 30 calender days</p>
        </div>
        <div className="text-center p-5 bg-white rounded">
          <h2 className="text-lg font-bold">Balance</h2>
          <h1 className="text-2xl font-bold my-1">0 ৳</h1>
          <p className="text-sm">Available Withdrawals</p>
        </div>
      </div>
      <div className="bg-white mt-6 p-5 rounded">
        <div className="grid grid-cols-3 items-center mb-6">
          <div>
            <h2 className="text-lg font-bold">Earning Overview</h2>
            <p className="text-sm">Earning during August 2023</p>
          </div>
          <h1 className="text-center text-2xl font-bold">0 ৳</h1>
          <div className="text-right">
            <input type="month" id="myMonth" name="myMonth" />
          </div>
        </div>
        <AreaCharts data={chartData} area="uv" xAxis="name" />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mt-5">Your Direct Profit</h1>
          <div className="text-white text-sm font-bold space-x-4 mt-4 mb-4">
            <button className="bg-[#2DA5F3] px-3 py-2 rounded ">
              <FileDownload fontSize="small" />
              PDF
            </button>
            <button className="bg-[#2DA5F3] px-3 py-2 rounded ">
              <FileDownload fontSize="small" />
              CSV
            </button>
            <button className="bg-[#2DA5F3] px-3 py-2 rounded ">Print</button>
            <button className="bg-[#2DA5F3] px-3 py-2 rounded ">
              Edit Customer
            </button>
          </div>
        </div>
        <Search api={searchApi} setSearchResults={setSearchResults} />
      </div>
      {searchResults ? (
        <ProfitTable data={searchResults.payload?.profit} />
      ) : (
        <>
          <ProfitTable data={data.payload?.profit} />
          <TablePagination
            perPage={perPage}
            count={data.payload?.count}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></TablePagination>
        </>
      )}
    </div>
  );
};

export default Profit;
