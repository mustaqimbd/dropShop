import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect } from "react";

const useGetRequest = (queryKey, endPoint) => {
  const [axiosSecure] = useAxiosSecure();
  const api = `/api/${endPoint}`;

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(api);
        return res.data;
      } catch (error) {
        console.log(error);
        throw error; // Re-throw the error so React Query can handle it
      }
    },
  });

  useEffect(() => {
    // You can use data, isLoading, refetch here if needed
    refetch();
  }, [api, refetch]);

  return { data, isLoading, refetch };
};

export default useGetRequest;
