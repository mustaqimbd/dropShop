import { Button, Divider } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [mitchMatchPassErr, setMitchMatchPassErr] = useState("");
  const [serverErr, setServerErr] = useState("");
  const [validationError, setValidationError] = useState([]);
  const { handleSubmit, register, reset } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const onSubmit = async data => {
    setMitchMatchPassErr("");
    setValidationError([]);
    setServerErr("");
    if (data.confirm_password !== data.new_password) {
      return setMitchMatchPassErr(
        "Password and confirm password didn't match."
      );
    }

    try {
      await axiosSecure.post("/api/user/change-password", {
        previousPassword: data.old_password,
        newPassword: data.new_password,
      });
      toast.success("Password changed successfully.");
      reset();
    } catch (error) {
      if (error?.response?.data?.message === "Validation error.") {
        return setValidationError(error.response.data.errors);
      }
      setServerErr(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div className="bg-white p-2 md:p-5">
        <h2 className="dashboard-title">Change password</h2>
        <Divider />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 max-w-md w-full space-y-5"
        >
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="old_password"
            >
              Old password
            </label>
            <input
              autoComplete="password"
              required
              name="old_password"
              {...register("old_password", { required: true })}
              id="old_password"
              className="cs-input"
              placeholder="Pass@*#29823"
              type="password"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="new_password"
            >
              New password
            </label>
            <input
              autoComplete="password"
              required
              name="new_password"
              {...register("new_password", { required: true })}
              id="new_password"
              className="cs-input"
              placeholder="NewPass@*#29823"
              type="password"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm_password"
            >
              Confirm password
            </label>
            <input
              autoComplete="password"
              required
              name="confirm_password"
              {...register("confirm_password", { required: true })}
              id="confirm_password"
              className="cs-input"
              placeholder="NewPass@*#29823"
              type="password"
            />
          </div>
          {mitchMatchPassErr ? (
            <h2 className="text-hotBadge font-bold">{mitchMatchPassErr}</h2>
          ) : (
            ""
          )}
          {serverErr ? (
            <h2 className="text-hotBadge font-bold">{serverErr}</h2>
          ) : (
            ""
          )}
          {validationError.length
            ? validationError.map((item, index) => (
                <p key={index} className="text-hotBadge font-bold">
                  <span>{index + 1}. </span>
                  {item}
                </p>
              ))
            : ""}
          <Button variant="contained" type="submit">
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
