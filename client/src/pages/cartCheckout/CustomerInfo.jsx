const CustomerInfo = ({ customer }) => {
  const { delivery_address, customer_id, customer_name, email, mobile } =
    customer;

  return (
    <>
      <p className="text-lg text-center">Customer Information</p>
      <div className="bg-white p-6 shadow-md rounded-md max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{customer_name}</h2>

        <div className="mb-4">
          <strong>Customer ID:</strong> {customer_id}
        </div>

        <div className="mb-4">
          <strong>Email:</strong> {email}
        </div>

        <div className="mb-4">
          <strong>Mobile:</strong> {mobile}
        </div>

        <div className="mb-4">
          <strong>Delivery Address:</strong>
          <div className="ml-4">
            <div>{delivery_address?.address}</div>
            <div>{delivery_address?.city}</div>
            <div>{delivery_address?.country}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerInfo;
