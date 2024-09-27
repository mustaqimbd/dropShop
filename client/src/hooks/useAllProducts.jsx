import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllProducts = (pageNumber, limit) => {
  const [axiosSecure] = useAxiosSecure()

  const {
    data,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [pageNumber, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products/products-by-pagination?page=${pageNumber}&limit=${limit}`
      );
      return res.data?.payload;
    },
  });
  
  return { data, refetch, isLoading };
};

export default useAllProducts;
