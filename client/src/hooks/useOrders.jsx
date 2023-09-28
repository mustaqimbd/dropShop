import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useOrders = (url, page) => {
  const [axiosSecure] = useAxiosSecure();
  const { data = {}, refetch } = useQuery({
    queryKey: ["orders", page],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`${url}?&skip=${page}`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { data, refetch };
};

export default useOrders;
