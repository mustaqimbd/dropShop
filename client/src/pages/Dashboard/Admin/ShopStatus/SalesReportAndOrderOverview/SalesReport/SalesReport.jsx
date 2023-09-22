import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Todays from "./Todays/Todays";
import Monthly from "./Monthly/Monthly";
import Yearly from "./Yearly/Yearly";

const SalesReport = () => {
  const [activeTab, setActiveTab] = useState("Todays's");

  return (
    <>
      <h2 className="dashboard-title">Sales report</h2>
      <Divider />
      <div className="mt-5">
        {["Todays's", "Current month", "Yearly"].map((item, index) => (
          <Button
            variant={activeTab === item ? "contained" : ""}
            key={index}
            onClick={() => setActiveTab(item)}
            style={{
              background: `${activeTab === item ? "#83B735" : ""}`,
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
    </>
  );
};

export default SalesReport;
