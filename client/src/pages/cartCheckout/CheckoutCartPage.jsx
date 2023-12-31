import useCart from "../../hooks/useCart";
import CustomerInfo from "./CustomerInfo";
import CartOfCheckout from "./checkoutCartComponents/CartOfCheckout";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutCartPage = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data } = useCart("cart", "cart/get-cart");

  const products = data?.payload?.cart?.items;
  const deliveryCharge = 100;
  const advancePayment = 200;
  const total = data?.payload?.subTotal + deliveryCharge;
  const remainingPayment = total - advancePayment;
  // console.log(data.payload);

  const payment = async () => {
    const response = await axiosSecure.post("/api/payments/order");
    console.log(response.data);
    const paymentUrl = response.data.url;
    // Redirect the user to the payment URL
    window.location.href = paymentUrl;
  };
  // console.log(products);

  return (
    <>
      {!products || products?.length < 1 ? (
        <h1 className="text-3xl font-medium text-center my-10">
          Your Cart is empty.
        </h1>
      ) : (
        <div className="grid grid-cols-3 gap-5 mx-5 mb-10">
          <div className="col-span-2">
            <h1 className="text-center text-3xl font-medium py-4">
              Your Orders
            </h1>
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
            <div className="border-x border-b rounded-md shadow-slate-50 pb-5">
              <div className="w-[70%] mx-auto">
                <div className="mb-5">
                  <div className="flex gap-2 justify-end items-center mt-2">
                    <span className="text-xl font-semibold">Subtotal</span>
                    <span>
                      ({data?.payload?.totalQuantity} items){" "}
                      <span className="text-xl font-semibold">:</span>{" "}
                    </span>
                    <span className="text-xl font-semibold">
                      {data?.payload?.subTotal}৳
                    </span>
                  </div>
                  <div className="flex gap-2 justify-end items-center mt-2">
                    <span className="text-base font-semibold">
                      Delivery Charge :
                    </span>
                    <span className="text-xl font-semibold">
                      {" "}
                      {deliveryCharge}৳
                    </span>
                  </div>
                  <hr className="my-1  border-gray-500" />
                  <div className="flex gap-2 justify-end items-center mt-2">
                    <span className="text-xl font-semibold">Total : </span>
                    <span className="text-xl font-semibold">{total}৳</span>
                  </div>
                </div>
                <div className="my-2">
                  <div className="flex gap-2 justify-end items-center">
                    <span className="text-base font-semibold">
                      Advance payment to confirm :
                    </span>
                    <span className="text-xl font-semibold">
                      {" "}
                      {advancePayment}৳
                    </span>
                  </div>
                  <div className="flex gap-2 justify-end items-center ">
                    <span className="text-base font-semibold">
                      Remaining payment :
                    </span>
                    <span className="text-xl font-semibold">
                      {" "}
                      {remainingPayment}৳
                    </span>
                  </div>
                </div>
                <button
                  onClick={payment}
                  className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>

            <div className="mt-5 pt-2 border rounded-md shadow-slate-50">
              <CustomerInfo customer={data?.payload?.cart?.customerId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutCartPage;
