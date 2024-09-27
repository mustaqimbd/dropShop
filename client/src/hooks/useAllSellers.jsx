import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllSellers = (skip, searchEmail) => {
  const [axiosSecure] = useAxiosSecure();
  const { data = {}, refetch } = useQuery({
    queryKey: ["all-sellers", skip, searchEmail],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `api/admin/dashboard/sellers-Info?skip=${skip}&email=${searchEmail}`
        );
        return res.data;
      } catch (error) { /* empty */ }
    },
  });
  return { data, refetch };
};

export default useAllSellers;
