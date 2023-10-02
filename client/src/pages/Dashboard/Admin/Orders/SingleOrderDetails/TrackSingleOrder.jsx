import { Chip } from "@mui/material";
import { format, parseISO } from "date-fns";
import CustomizedSteppers from "../../../../../components/Stepper/CustomizedSteppers";

const TrackSingleOrder = ({ orderDetails }) => {
  console.log(orderDetails);

  return (
    <div className="mt-20 overflow-hidden ">
      <h2 className="text-center font-bold text-caption text-xl py-5">
        Tracking order NO: {orderDetails?.order_id}
      </h2>
      <div className="ring-2 ring-slate-200 p-2 mx-1 md:p-5 rounded-md flex justify-between flex-wrap gap-5">
        <div>
          <h2 className="text-xl text-caption font-bold">
            Estimates delivery time:
          </h2>
          <p className="text-linkText font-semibold">
            {format(parseISO("2023-09-30T15:29:25.069+00:00"), "MMMM do, yyyy")}
          </p>
        </div>
        <div>
          <h2 className="text-xl text-caption font-bold">Shipped To:</h2>
          <p className="text-linkText font-semibold">
            {orderDetails?.customer_info[0]?.address?.district},
            {orderDetails?.customer_info[0]?.address?.division}
          </p>
        </div>
        <div>
          <span className="text-xl text-caption font-bold">Status: </span>{" "}
          <Chip
            label={orderDetails?.order_status}
            style={{
              fontWeight: 600,
              textTransform: "uppercase",
              background: `${
                orderDetails?.order_status === "shifted"
                  ? "#29cc97"
                  : orderDetails?.order_status === "pending"
                  ? "#fec400"
                  : orderDetails?.order_status === "picked by currier"
                  ? "#4c84ff"
                  : orderDetails?.order_status === "canceled"
                  ? "#fe5461"
                  : orderDetails?.order_status === "completed"
                  ? "#2DB224"
                  : orderDetails?.order_status === "processing"
                  ? "#FA8232"
                  : ""
              }`,
            }}
          />
        </div>
      </div>
      <div className="my-10">
        <CustomizedSteppers orderDetails={orderDetails} />
      </div>
    </div>
  );
};

export default TrackSingleOrder;
