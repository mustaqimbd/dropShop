import { Button } from "@mui/material";
import ContainerMax from "../../components/container/ContainerMax";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [axiosSecure] = useAxiosSecure();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, serLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async event => {
    event.preventDefault();
    setErrorMessage("");
    serLoading(true);
    const email = event.target.email.value;
    try {
      const res = await axiosSecure.post("/user/forgot-password", {
        email,
      });
      serLoading(false);
      if (res?.data?.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Please check your email to reset your password.",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/");
      }
    } catch (error) {
      serLoading(false);
      setErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="my-5">
        <ContainerMax>
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Forgot your password?
          </h2>
          <p className="text-center mt-5">
            Enter your account email and we will send you a password reset link.
          </p>
          <div className="mt-10">
            <form
              className="flex justify-center"
              onSubmit={handleForgotPassword}
            >
              <div className="max-w-lg w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  autoComplete="email"
                  required
                  name="email"
                  id="email"
                  className="shadow appeara6ce-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Email"
                  type="email"
                />
                {errorMessage ? (
                  <h2 className="text-hotBadge mt-2 font-bold">
                    {errorMessage}
                  </h2>
                ) : (
                  ""
                )}
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginTop: "15px" }}
                  disabled={loading}
                >
                  Reset password
                </Button>
              </div>
            </form>
          </div>
        </ContainerMax>
      </div>
    </>
  );
};

export default ForgotPassword;
