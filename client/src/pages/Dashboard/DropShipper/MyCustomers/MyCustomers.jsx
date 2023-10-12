import { FileDownload } from "@mui/icons-material";
import CustomerTable from "./CustomerTable";
import AddModal from "./AddModal";
import useGetRequest from "../../../../hooks/useGetRequest";
import { useState } from "react";
import Search from "../../../../components/search/Search";
import useAuthProvider from "../../../../hooks/useAuthProvider";
import TablePagination from "../../../../components/pagination/TablePagination";

const MyCustomers = () => {
  const { user } = useAuthProvider();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const perPage = 5;
  
  const { data, refetch } = useGetRequest(
    "my-customers",
    `reseller/dashboard/my-customers?reseller_id=${user.reseller_id}&page=${currentPage}&limit=${perPage}`
  );

const searchApi = `/api/reseller/dashboard/my-customers/${user.reseller_id}`

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
          <div className="flex items-center relative w-[70%]">
            <Search api={searchApi} setSearchResults={setSearchResults} />
            <span className="absolute right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9.0625 15.625C12.6869 15.625 15.625 12.6869 15.625 9.0625C15.625 5.43813 12.6869 2.5 9.0625 2.5C5.43813 2.5 2.5 5.43813 2.5 9.0625C2.5 12.6869 5.43813 15.625 9.0625 15.625Z"
                  stroke="#191C1F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.7031 13.7031L17.5 17.5"
                  stroke="#191C1F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
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
        <CustomerTable data={searchResults} />
      ) : (
        <>
          <CustomerTable
            data={searchResults ? searchResults : data.payload?.customers}
            refetch={refetch}
          />

          <div className="mt-5">
            <TablePagination
              perPage={perPage}
              totalQuantity={data.payload?.totalQuantity}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              refetch={refetch}
            ></TablePagination>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCustomers;
