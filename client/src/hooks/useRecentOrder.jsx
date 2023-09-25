import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRecentOrder = page => {
  const [axiosSecure] = useAxiosSecure();
  const { data: recentOrders = {}, refetch } = useQuery({
    queryKey: ["recent-orders", page],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `api/admin/dashboard/recent-orders?&skip=${page}`
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { recentOrders, refetch };
};

export default useRecentOrder;
