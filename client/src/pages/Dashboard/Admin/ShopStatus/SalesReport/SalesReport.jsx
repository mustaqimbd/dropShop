import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Todays from "./Todays/Todays";
import Monthly from "./Monthly/Monthly";
import Yearly from "./Yearly/Yearly";
import OrdersOverview from "../OrdersOverview/OrdersOverview";

const SalesReport = () => {
  const [activeTab, setActiveTab] = useState("Todays's");

  return (
    <>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden px-2 pb-2">
        <div className="col-span-1 md:col-span-2 shadow-md p-2 md:p-5 rounded-lg">
          <h2 className="dashboard-title">Sales report</h2>
          <Divider />
          <div className="mt-5">
            {["Todays's", "Current month", "Yearly"].map((item, index) => (
              <Button
                variant={activeTab === item ? "contained" : ""}
                key={index}
                onClick={() => setActiveTab(item)}
                style={{
                  background: `${activeTab === item ? "#EE5858" : ""}`,
                }}
              >
                {item}
              </Button>
            ))}
            <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
            <div>
              {activeTab === "Todays's" ? (
                <Todays />
              ) : activeTab === "Current month" ? (
                <Monthly />
              ) : activeTab === "Yearly" ? (
                <Yearly />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="col-span-1 shadow-md p-2 md:p-5 rounded-lg">
          <OrdersOverview />
        </div>
      </div>
    </>
  );
};

export default SalesReport;
