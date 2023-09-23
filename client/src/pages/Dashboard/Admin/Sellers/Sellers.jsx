import { useState } from "react";
import useAllSellers from "../../../../hooks/useAllSellers";

const Sellers = () => {
  const [currentPage, setCurrentPagee] = useState(0);
  const { data } = useAllSellers(currentPage);
  console.log(data);
  return (
    <>
      <div className="bg-white rounded-md shadow-md">
        <h2>sl</h2>
      </div>
    </>
  );
};

export default Sellers;
