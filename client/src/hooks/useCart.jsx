import useGetRequest from "./useGetRequest";

const useCart = (queryString, cartApi) => {
  const { data, isLoading, refetch } = useGetRequest(queryString, cartApi);
  return { data, isLoading, refetch };
};

export default useCart;
