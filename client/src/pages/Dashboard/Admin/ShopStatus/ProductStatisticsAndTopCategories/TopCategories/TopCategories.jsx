import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";
import { Divider } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
const TopCategories = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data = {}, refetch } = useQuery({
    queryKey: ["top-categories"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          "/api/admin/dashboard/top-categories"
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  const topCategories = data?.payload?.topCategories;
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="dashboard-title">Top categories</h2>
        <button onClick={() => refetch()}>
          <CachedIcon />
        </button>
      </div>
      <Divider />
      <div className="mt-5 space-y-5">
        {topCategories?.map(category => (
          <div key={category.category_slug} className="grid grid-cols-6">
            <div className="w-14 h-14 bg-borderColor flex justify-center items-center rounded-full cursor-pointer">
              <img
                src={category.category_img}
                alt={category.category_name}
                className="w-10 h-10"
              />
            </div>
            <div className="col-span-3">
              <h2 className="font-bold text-caption">
                {category.category_name}
              </h2>
              <h2 className="text-linkText text-sm">{category._id}</h2>
            </div>
            <h2 className="text-caption font-semibold text-sm">
              {category.total_sales} Sales
            </h2>
            <h2 className="text-caption font-semibold text-sm">
              {parseFloat(category.percentage.toFixed(4))}%
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
