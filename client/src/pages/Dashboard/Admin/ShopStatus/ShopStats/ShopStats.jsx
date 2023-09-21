import Stats from "../../../../../components/Stats/Stats";
import { FaUserCheck, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import useGetRequest from "../../../../../hooks/useGetRequest";

const ShopStats = () => {
  const { data: stats = {}, isLoading } = useGetRequest(
    "stats",
    "admin/dashboard/stats"
  );
  const user = <FaUserCheck size={20} />;
  const shoppingCart = <FaShoppingCart size={20} />;
  const dollar = <FaDollarSign size={20} />;
  return (
    <>
      <div className="flex justify-evenly gap-5 flex-wrap">
        <Stats
          title="Daily signUps"
          counts={stats?.payload?.dailyUsers}
          icon={user}
          isLoading={isLoading}
        />
        <Stats
          title="Daily orders"
          counts={stats?.payload?.dailyOrders}
          icon={shoppingCart}
          isLoading={isLoading}
        />
        <Stats
          title="Daily revenue"
          counts={stats?.payload?.dailyRevenue}
          icon={dollar}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default ShopStats;
