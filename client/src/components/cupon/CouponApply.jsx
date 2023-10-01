import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

function CouponApply() {
  const [couponCode, setCouponCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCouponChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleApplyCoupon = async () => {
    // Simulate coupon verification logic here (replace with your actual logic)
    setIsLoading(true);

    // Simulate a delay to mimic an API request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (couponCode === "EXAMPLE123") {
      setVerificationStatus("success");
    } else {
      setVerificationStatus("error");
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <p className="font-normal text-normal mb-2">Apply Coupon (If have )</p>
        <div className="flex">
          <TextField
            type="text"
            label="Coupon Code"
            variant="outlined"
            disabled={verificationStatus === "success"}
            size="small"
            value={couponCode}
            onChange={handleCouponChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyCoupon}
            size="small"
            className="ml-2"
            disabled={isLoading || verificationStatus === "success"}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Apply"
            )}
          </Button>
        </div>
      </div>
      {verificationStatus === "success" && (
        <div className="text-green-600">Coupon verified successfully!</div>
      )}
      {verificationStatus === "error" && (
        <div className="text-red-600">
          Invalid coupon code. Please try again.
        </div>
      )}
    </div>
  );
}

export default CouponApply;
