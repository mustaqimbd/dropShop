import { useState } from "react";

function Payments() {
  const [paymentOption, setPaymentOption] = useState("");
  const [subtotal, setSubtotal] = useState(100); // Placeholder subtotal
  const [shippingCharge, setShippingCharge] = useState(10); // Placeholder shipping charge
  const [advancePayment, setAdvancePayment] = useState(0); // Placeholder advance payment

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const calculateTotalPrice = () => {
    // Calculate total price based on subtotal, shipping charge, and advance payment
    return subtotal + shippingCharge - advancePayment;
  };

  return (
    <div className="bg-white p-8 rounded shadow-md mx-auto max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Checkout Page</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Payment Option
        </label>
        <div className="flex">
          <label className="inline-flex items-center mr-6">
            <input
              type="radio"
              className="form-radio text-blue-500"
              value="stripe"
              checked={paymentOption === "stripe"}
              onChange={handlePaymentOptionChange}
            />
            <span className="ml-2">Stripe</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-500"
              value="sslCommerce"
              checked={paymentOption === "sslCommerce"}
              onChange={handlePaymentOptionChange}
            />
            <span className="ml-2">SSL Commerce</span>
          </label>
        </div>
      </div>

      <table className="table-auto w-full mb-4">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">Subtotal</td>
            <td className="px-4 py-2">${subtotal}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Shipping </td>
            <td className="px-4 py-2">${shippingCharge}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Discount</td>
            <td className="px-4 py-2">${shippingCharge}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Advance Pay</td>
            <td className="px-4 py-2">${advancePayment}</td>
          </tr>

          {/* Horizontal line */}
          <tr>
            <td className="border-t border-gray-400 px-4 py-2"></td>
            <td className="border-t border-gray-400 px-4 py-2"></td>
          </tr>

          <tr className="font-semibold">
            <td className="px-4 py-2">Total Price</td>
            <td className="px-4 py-2">${calculateTotalPrice()}</td>
          </tr>
        </tbody>
      </table>

      <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Proceed to Payment
      </button>
    </div>
  );
}

export default Payments;
