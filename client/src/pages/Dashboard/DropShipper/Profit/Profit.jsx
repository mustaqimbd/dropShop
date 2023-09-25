import TablePagination from "../MyCustomers/TablePagination";
import ProfitTable from "./ProfitTable";
import { FileDownload } from "@mui/icons-material";
import SearchTable from "./SearchTable";

const Profit = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        <div className="text-center p-5 bg-white">
          <h2 className="text-lg font-bold">This Month&apos;s Profits</h2>
          <h1 className="text-2xl font-bold my-1">0 ৳</h1>
          <p className="text-sm">Total profit from month start</p>
        </div>
        <div className="text-center p-5 bg-white">
          <h2 className="text-lg font-bold">Profits Across Last 30 Days</h2>
          <h1 className="text-2xl font-bold my-1">0 ৳</h1>
          <p className="text-sm">Over the last 30 calender days</p>
        </div>
        <div className="text-center p-5 bg-white">
          <h2 className="text-lg font-bold">Balance</h2>
          <h1 className="text-2xl font-bold my-1">0 ৳</h1>
          <p className="text-sm">Available Withdrawals</p>
        </div>
      </div>
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
      <ProfitTable />
      <div className="mt-5">
      <TablePagination />
      </div>
      <div className="mt-5">
        <SearchTable/>
      </div>
    </div>
  );
};

export default Profit;
