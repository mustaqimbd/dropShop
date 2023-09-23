import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllSellers = skip => {
  const [axiosSecure] = useAxiosSecure();
  const { data = {}, refetch } = useQuery({
    queryKey: ["all-sellers", skip],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `api/admin/dashboard/sellers-Info?skip=${skip}`
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { data, refetch };
};

export default useAllSellers;
