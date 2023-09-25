import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useTotalProducts = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data = {}, refetch } = useQuery({
    queryKey: ["total-products"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/api/products/total-product-count");
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { data, refetch };
};

export default useTotalProducts;
