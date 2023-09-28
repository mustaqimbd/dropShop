import useGetRequest from "./useGetRequest";

const useTotalOrders = () => {
  const totalOrders = useGetRequest(
    "totalOrders",
    "admin/dashboard/total-orders"
  );
  return totalOrders;
};

export default useTotalOrders;
