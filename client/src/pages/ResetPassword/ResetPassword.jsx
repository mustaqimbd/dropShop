import { Button } from "@mui/material";
import ContainerMax from "../../components/container/ContainerMax";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import validatePassword from "../../Utilities/validatePassword";

const ResetPassword = () => {
  const [passwordErr, setPasswordErr] = useState("");
  const [serverError, setServerError] = useState("");
  const [passValidationErr, setPassValidationErr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const handleUpdatePassword = async event => {
    const token = queryParams.get("token");
    event.preventDefault();
    setPasswordErr("");
    setPassValidationErr("");
    setServerError(serverError);
    const form = event.target;
    const password = form.password.value;
    const re_password = form.re_password.value;
    if (password !== re_password) {
      return setPasswordErr("Password and confirm password did not match.");
    }
    if (!validatePassword(password)) {
      return setPasswordErr(
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one special character (@, #, $, %, *, ?), and one number."
      );
    }
    setLoading(true);
    try {
      const res = await axiosSecure.post("/user/reset-password", {
        token,
        password,
      });
      if (res.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            "Password retested successfully now login with your ne password.",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/");
      }
    } catch (error) {
      if (error.response.data.message === "Validation error.") {
        setPassValidationErr(error.response.data.errors);
      } else {
        setServerError(error.response.data.message);
      }
      console.log(error);
      setLoading(false);
    }
    console.log({ password, re_password, token });
  };
  return (
    <>
      <ContainerMax>
        <div className="my-10">
          <div className="flex justify-center">
            <div className="max-w-xl w-full rounded-md ring-1 ring-gray-300 p-2 md:p-5">
              <h3 className="font-bold text-2xl">Reset your password.</h3>
              <form className="space-y-3 mt-3" onSubmit={handleUpdatePassword}>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Password
                  </label>
                  <input
                    autoComplete="password"
                    required
                    name="password"
                    id="password"
                    className="shadow appeara6ce-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter new password"
                    type="password"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Confirm password
                  </label>
                  <input
                    autoComplete="password"
                    required
                    name="re_password"
                    id="re_password"
                    className="shadow appeara6ce-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirm new password"
                    type="password"
                  />
                </div>
                {passwordErr ? (
                  <h2 className="font-bold text-hotBadge">{passwordErr}</h2>
                ) : (
                  ""
                )}
                {serverError ? (
                  <h2 className="font-bold text-hotBadge">{serverError}</h2>
                ) : (
                  ""
                )}
                {passValidationErr.length
                  ? passValidationErr.map((item, index) => (
                      <p key={index} className="text-hotBadge">
                        <span>{index + 1}. </span>
                        {item}
                      </p>
                    ))
                  : ""}
                <Button variant="contained" type="submit" disabled={loading}>
                  Update password
                </Button>
              </form>
            </div>
          </div>
        </div>
      </ContainerMax>
    </>
  );
};

export default ResetPassword;
