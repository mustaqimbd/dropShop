import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const PaginationGenaral = ({
  itemsPerPage,
  allProductsLength,
  currentPage,
  setCurrentPage,
}) => {
  // Default state is an empty array

  // Calculate total pages and indices for pagination
  const totalPages = Math.ceil(allProductsLength / itemsPerPage);
  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-4 py-2 rounded-md ${
          currentPage === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-primary text-white hover:bg-blue-600"
        }`}
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex space-x-2">
        {[...Array(totalPages).keys()].map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-full ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-200"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage + 1 === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage + 1 === totalPages
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-primary text-white hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

//pagination in Dashboard

const PaginationInDashboard = ({
  itemsPerPage,
  allProductsLength,
  currentPage,
  setCurrentPage,
}) => {
  // Default state is an empty array

  // Calculate total pages and indices for pagination
  const totalPages = Math.ceil(allProductsLength / itemsPerPage);

  console.log("total page:", totalPages);
  console.log("current page page:", currentPage);

  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? " text-gray-600 cursor-not-allowed"
            : " text-green "
        }`}
      >
        <NavigateBeforeIcon />
      </button>

      {/* Page numbers */}
      <div className="flex space-x-2">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`px-3 py-2 rounded-full ${
              currentPage === page + 1
                ? " text-green-500 font-bold"
                : " text-gray-800 "
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? "  text-green-500 cursor-not-allowed"
            : " text-gray-600 "
        }`}
      >
        <NavigateNextIcon />
      </button>
    </div>
  );
};

export { PaginationGenaral, PaginationInDashboard };
