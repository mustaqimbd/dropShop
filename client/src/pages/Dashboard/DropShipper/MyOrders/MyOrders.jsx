import { FileDownload } from "@mui/icons-material";
import TablePagination from "../../../../components/pagination/TablePagination";
import { Link } from "react-router-dom";
import OrderTable from "./OrderTable";
import Search from "../../../../components/search/Search";
import { useState } from "react";
import useGetRequest from "../../../../hooks/useGetRequest";

const MyOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const perPage = 3;

  const myOrderApi = `reseller/my-orders?page=${currentPage}&limit=${perPage}`;

  const searchApi = `/api/reseller/my-orders/search`;

  const { data } = useGetRequest("my-orders", myOrderApi);

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[300px]">
          <h1 className="text-2xl font-bold mb-1">Orders</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            minus.
          </p>
          <div className="mt-3">
            <Link to='/track-order' className="text-white bg-[#83B735] px-2 py-1 rounded">
              Track Your customer orders
            </Link>
          </div>
        </div>
        <Search api={searchApi} setSearchResults={setSearchResults} />
      </div>
      <div className="text-white text-sm font-bold space-x-4 mt-5 mb-4">
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

      {searchResults ? (
        <OrderTable data={searchResults.payload?.orders} />
      ) : (
        <>
          <OrderTable data={data.payload?.orders} />
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

export default MyOrders;
