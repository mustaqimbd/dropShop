import Divider from "@mui/material/Divider";
import CachedIcon from "@mui/icons-material/Cached";
import useGetRequest from "../../../../../../hooks/useGetRequest";
import { Avatar } from "@mui/material";

const TopSellers = () => {
  const { data, refetch } = useGetRequest(
    "new-customer",
    "admin/dashboard/top-sellers"
  );
  const sellers = data?.payload?.sellers;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="dashboard-title">Top sellers</h2>
        <button onClick={() => refetch()}>
          <CachedIcon />
        </button>
      </div>
      <Divider />
      <div>
        {sellers?.map(seller => (
          <div key={seller._id} className="grid grid-cols-5 text-sm mt-5">
            <div className="col-span-1">
              <Avatar src={seller.profile_pic} alt={seller.seller_name} />
            </div>
            <div className="col-span-3 md:col-span-2">
              <h2 className="font-bold text-caption">{seller?.seller_name}</h2>
              <p className="text-xs font-semibold text-footerLinkText">
                {seller?.seller_email}
              </p>
            </div>
            <h2 className="col-span-1 font-semibold text-footerLinkText">
              {seller.total_orders} Orders
            </h2>
            <h2 className="col-span-1 hidden md:block font-bold text-caption">
              ${seller.total_amount}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopSellers;
