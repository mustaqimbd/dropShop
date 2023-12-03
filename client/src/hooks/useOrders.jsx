import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useOrders = (url, page, status = "all") => {
  const [axiosSecure] = useAxiosSecure();
  const { data = {}, refetch } = useQuery({
    queryKey: ["orders", page, status],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `${url}?&page=${page}&&status=${status}`
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { data, refetch };
};

export default useOrders;
