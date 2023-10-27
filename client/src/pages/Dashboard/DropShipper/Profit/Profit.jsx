import ProfitTable from "./ProfitTable";
import { FileDownload } from "@mui/icons-material";
import AreaCharts from "../../../../components/AreaCharts/AreaCharts";
import TablePagination from "../../../../components/pagination/TablePagination";
import useAuthProvider from "../../../../hooks/useAuthProvider";
import { useState } from "react";
import useGetRequest from "../../../../hooks/useGetRequest";
import Search from "../../../../components/search/Search";

const Profit = () => {
  const { user } = useAuthProvider();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const perPage = 3;

  const { data: thisMonthProfitStatistics } = useGetRequest(
    "profit-statistics",
    "reseller/dashboard/profit-statistics"
  );

  const tableProfitApi = `reseller/dashboard/profit/${user.reseller_id}?page=${currentPage}&limit=${perPage}`;
  const searchApi = `/api/reseller/dashboard/profit/${user.reseller_id}/search`;
  const { data: tableProfitData } = useGetRequest("profit", tableProfitApi);

  // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  // Format the date to "yyyy-MM" (required format for input type "month")
  const currentMonth = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}`;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const handleInputChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const { data: selectedMonthProfit } = useGetRequest(
    "profit-overview",
    `reseller/dashboard/profit-overview?date=${selectedMonth}`
  );
  const profitData =
    selectedMonthProfit.payload?.selectedMonthProfit?.profitEverySingleDay;

  const dateParts = selectedMonth.split("-");
  const monthNumber = parseInt(dateParts[1]);
  const date = new Date(0, monthNumber - 1);
  const year = date.getFullYear();
  const monthName = date.toLocaleString("default", { month: "long" });
  // Calculate the first day of the next month and subtract one day
  const lastDayOfCurrentMonth = new Date(year, monthNumber, 0).getDate();

  const chartData = Array.from(
    { length: lastDayOfCurrentMonth },
    (_, index) => {
      const matchingItem = profitData?.find((item) => index + 1 === item.date);
      if (matchingItem) {
        return {
          date: matchingItem.date,
          dateWithMonth: `${matchingItem.date} ${monthName}`,
          profit: matchingItem.totalProfit,
        };
      } else {
        return {
          date: index + 1,
          dateWithMonth: `${index + 1} ${monthName}`,
          profit: 0,
        };
      }
    }
  );

  console.log(chartData);
  // console.log(selectedMonthProfit.payload?.selectedMonthProfit);

  const CustomTooltip = ({ active, payload}) => {
    if (active && payload && payload.length) {
      const dateWithMonth = payload[0].payload.dateWithMonth;
      return (
        <div className="custom-tooltip bg-white p-2 border-2">
          <p>{dateWithMonth}</p>
          <p className="text-blue-500">{`Profit: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        <div className="text-center p-5 bg-white rounded">
          <h2 className="text-lg font-bold">This Month&apos;s Profits</h2>
          <h1 className="text-2xl font-bold my-1">
            {thisMonthProfitStatistics?.payload?.thisMonthProfit?.totalProfit ||
              0}{" "}
            ৳
          </h1>
          <p className="text-sm">Total profit from month start</p>
        </div>
        <div className="text-center p-5 bg-white rounded">
          <h2 className="text-lg font-bold">Profits Across Last 30 Days</h2>
          <h1 className="text-2xl font-bold my-1">
            {
              thisMonthProfitStatistics?.payload?.lastThirtyDaysProfit
                ?.totalProfit
            }
            ৳
          </h1>
          <p className="text-sm">Over the last 30 calender days</p>
        </div>
        <div className="text-center p-5 bg-white rounded">
          <h2 className="text-lg font-bold">Balance</h2>
          <h1 className="text-2xl font-bold my-1">{user.balance || 0} ৳</h1>
          <p className="text-sm">Available Withdrawals</p>
        </div>
      </div>
      <div className="bg-white mt-6 p-5 rounded">
        <div className="grid grid-cols-3 items-center mb-6">
          <div>
            <h2 className="text-lg font-bold">Earning Overview</h2>
            <p className="text-sm">
              Earning during{" "}
              <input
                type="month"
                readOnly
                value={selectedMonth}
                className="outline-none"
              />
            </p>
          </div>
          <h1 className="text-center text-2xl font-bold">
            {selectedMonthProfit.payload?.selectedMonthProfit
              ?.totalProfitThisMonth[0]?.totalProfit || 0}{" "}
            ৳
          </h1>
          <div className="text-right">
            <input
              type="month"
              value={selectedMonth} // Bind the value to the state variable
              onChange={handleInputChange} // Attach the event handler
              max={`${currentYear}-12`} // Set max attribute to limit selection to the current year
              min={`${currentYear}-01`}
              className="outline-none"
            />
          </div>
        </div>
        <AreaCharts
          data={chartData}
          area="profit"
          xAxis="date"
          CustomTooltip={CustomTooltip}
        />
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
          <ProfitTable data={tableProfitData.payload?.profit} />
          <TablePagination
            perPage={perPage}
            count={tableProfitData.payload?.count}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></TablePagination>
        </>
      )}
    </div>
  );
};

export default Profit;
