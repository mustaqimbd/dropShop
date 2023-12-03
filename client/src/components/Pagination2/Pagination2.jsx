import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const Pagination2 = ({
  data,
  currentPage,
  setCurrentPage,
  totalPage,
  totalData,
}) => {
  const handleCurrentPage = increase => {
    if (increase) {
      if (currentPage == totalPage - 1) {
        return;
      }
      return setCurrentPage(currentPage + 1);
    } else {
      if (currentPage < 1) {
        return;
      }
      return setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="py-3 flex justify-end mr-10 gap-3 items-center">
      <div className="font-bold">
        {data?.payload?.skip ? <span>{data?.payload?.skip + 1}</span> : "0"}
        {" - "}
        {data?.payload?.skip + data?.payload?.limit ? (
          <span>{data?.payload?.skip + data?.payload?.length}</span>
        ) : (
          ""
        )}{" "}
        of {totalData}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => handleCurrentPage(false)}
          disabled={currentPage < 1}
          className={`w-7 h-7  rounded-full  ${
            currentPage < 1
              ? " text-gray-500 bg-gray-200 cursor-not-allowed"
              : "text-gray-700 bg-gray-300"
          }`}
        >
          <KeyboardArrowLeftIcon />
        </button>
        <button
          onClick={() => handleCurrentPage(true)}
          disabled={currentPage == totalPage - 1}
          className={`w-7 h-7 bg-gray-300 rounded-full  ${
            currentPage == totalPage - 1
              ? " text-gray-500 bg-gray-200 cursor-not-allowed"
              : "text-gray-700 bg-gray-300"
          }`}
        >
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination2;
