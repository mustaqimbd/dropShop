import { FileDownload } from "@mui/icons-material";
import CustomerTable from "./CustomerTable";
import AddModal from "./AddModal";
import useGetRequest from "../../../../hooks/useGetRequest";
import { useState } from "react";
import Search from "../../../../components/search/Search";
import TablePagination from "../../../../components/pagination/TablePagination";

const MyCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const perPage = 5;

  const myCustomersApi = `reseller/my-customers?page=${currentPage}&limit=${perPage}`;

  const searchApi = `/api/reseller/my-customers/search`;

  const { data, refetch } = useGetRequest("my-customers", myCustomersApi);

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[300px]">
          <h1 className="text-2xl font-bold mb-1">Customers</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            minus.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Search api={searchApi} setSearchResults={setSearchResults} />
          <div>
            <AddModal refetch={refetch}></AddModal>
          </div>
        </div>
      </div>
      <div className="text-white text-sm font-bold space-x-4 mt-8 mb-4">
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
        <CustomerTable data={searchResults.payload?.customers} refetch={refetch}/>
      ) : (
        <>
          <CustomerTable data={data.payload?.customers} refetch={refetch} />
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

export default MyCustomers;
