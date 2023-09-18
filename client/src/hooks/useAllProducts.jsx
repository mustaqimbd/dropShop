import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllProducts = (pageNumber, limit) => {
  const {
    data: allProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [pageNumber, limit],
    queryFn: async () => {
      const res = await axios(
        `http://localhost:5000/api/products/products-by-pagination?page=${pageNumber}&limit=${limit}`
      );
      console.log("res from axios", res);
      return res.data.payload;
    },
  });
  return { allProducts, refetch, isLoading };
};

export default useAllProducts;
