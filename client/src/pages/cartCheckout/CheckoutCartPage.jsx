import useCart from "../../hooks/useCart";
import CustomerInfo from "./CustomerInfo";
import CartOfCheckout from "./checkoutCartComponents/CartOfCheckout";

const CheckoutCartPage = () => {
  const { data, refetch } = useCart("cart", "cart/get-cart");
  refetch();

  const products = data?.payload?.cart?.items;

  return (
    <div className="grid grid-cols-3 mx-5 mb-10">
      <div className="col-span-2">
        <h1 className="text-center text-3xl font-medium py-4">Your Orders</h1>
        <div className="space-y-5 ">
          {products?.map((product) => {
            return <CartOfCheckout product={product} key={product._id} />;
          })}
        </div>
        <div className="flex gap-2 justify-end items-center mt-2 mr-20">
          <span className="text-xl font-semibold">Subtotal</span>
          <span>({data?.payload?.totalQuantity} items)</span>
          <span className="text-xl font-semibold">
            {" "}
            : {data?.payload?.subTotal}৳
          </span>
        </div>
      </div>
      <div className="col-span-1">
        <div className="w-[70%] mx-auto">
          <div className="mb-5">
            <div className="flex gap-2 justify-end items-center mt-2">
              <span className="text-xl font-semibold">Subtotal</span>
              <span>({data?.payload?.totalQuantity} items)</span>
              <span className="text-xl font-semibold">
                {" "}
                : {data?.payload?.subTotal}৳
              </span>
            </div>
            <div className="flex gap-2 justify-end items-center mt-2">
              <span className="text-base font-semibold">Delivery Charge</span>
              <span className="text-xl font-semibold">
                {" "}
                : {data?.payload?.subTotal}৳
              </span>
            </div>
            <hr className="my-1  border-gray-500" />
            <div className="flex gap-2 justify-end items-center mt-2">
              <span className="text-xl font-semibold">Total</span>
              <span className="text-xl font-semibold">
                {" "}
                : {data?.payload?.subTotal}৳
              </span>
            </div>
          </div>

          <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Proceed to Payment
          </button>
        </div>
        <div className="mt-10">
          <CustomerInfo customer={data?.payload?.cart?.customerId} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartPage;
