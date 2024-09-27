import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTotalProductsCount = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: productsCount,
    refetch: refetchProductsCount,
    isLoading: productsCountLoading,
  } = useQuery({
    queryKey: ["total-order-count"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/products/total-product-count`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { productsCount, refetchProductsCount, productsCountLoading };
};

export default useTotalProductsCount;
