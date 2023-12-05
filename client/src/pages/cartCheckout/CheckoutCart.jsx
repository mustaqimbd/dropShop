import AddToCart from "../../components/addToCart/AddToCart";
import useCart from "../../hooks/useCart";

const CheckoutCart = () => {
  const { data } = useCart("cart-products", "cart/get-cart-products");
  const { refetch } = useCart("cart", "cart/get-cart");
  refetch();
  console.log(data?.payload?.products);
  return (
    <div className="grid grid-cols-3 mx-5 mb-10">
      <div className="col-span-2">
        <h1 className="text-center text-3xl font-medium py-4">Your Orders</h1>
        <div className="space-y-5 ">
          {data?.payload?.products?.map((product) => {
            const { _id, product_name, suggested_price, reseller_price } =
              product.productId;
            return (
              <div
                key={product._id}
                className="flex gap-5 border rounded-md shadow-slate-50"
              >
                <div className="w-[200px] h-[200px]">
                  <img
                    src={product?.productId?.images[0]?.link}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <div className=" py-3 px-5">
                  <h1 className="text-lg font-bold">{product_name}</h1>
                  <h1 className="text-lg font-medium">
                    Price : {suggested_price}
                  </h1>
                  <h1 className="text-lg font-medium">
                    Reseller rice : {reseller_price}
                  </h1>
                  <AddToCart _id={_id} quantity={product?.quantity} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-span-1">
        <p>Shipping information section</p>
      </div>
    </div>
  );
};

export default CheckoutCart;
