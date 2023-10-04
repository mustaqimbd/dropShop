import Divider from "@mui/material/Divider";
import useGetRequest from "../../../../../../hooks/useGetRequest";
import CachedIcon from "@mui/icons-material/Cached";
const TopProducts = () => {
  const { data, refetch } = useGetRequest(
    "top-selling-products",
    "products/highlight-products"
  );
  const products = data?.payload?.topSellingProducts;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="dashboard-title">Top products</h2>
        <button onClick={() => refetch()}>
          <CachedIcon />
        </button>
      </div>
      <Divider />
      <div className="space-y-6 mt-5">
        {products?.map(product => (
          <div
            key={product._id}
            className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center justify-start"
          >
            <div className="col-span-1 md:col-span-1 flex justify-center">
              <img
                src={product.images[0].link}
                alt={product.product_name}
                className="object-cover w-[144px] h-[144px] rounded-md"
              />
            </div>
            <div className="col-span-1 md:col-span-4 space-y-1">
              <div className="flex justify-between">
                <h2 className="font-bold text-caption">
                  {product.product_name}
                </h2>
                <p className="text-footerLinkText text-sm font-bold">
                  {product?.total_sold} Sales
                </p>
              </div>
              <p className="text-sm text-caption">{product?.description}</p>
              <div className="flex gap-5">
                <p className="font-bold text-caption">
                  ${" "}
                  {(
                    product?.suggested_price -
                    (product?.discount / product?.suggested_price) * 100
                  ).toFixed(2)}
                </p>
                <del className="text-footerLinkText text-sm font-bold">
                  $ {product?.suggested_price}
                </del>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopProducts;
