import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ConfigureModal() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isSelected, setIsSelected] = React.useState(null);
  const [axiosSecure] = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRadioChange = (e) => {
    reset();
    setIsSelected(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    data.withdraw_method = isSelected;
    console.log(data, isSelected, "llll");
    setError("");
    try {
      const res = await axiosSecure.put(
        "/api/user/update-dropshipper-info",
        data
      );
      if (res.data.success) {
        reset();
        handleClose();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully saved",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="bg-gray-400 px-3 py-2 font-bold text-white rounded-md flex gap-1 items-center justify-center"
      >
        <SettingsIcon /> <span>Configure</span>
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, textAlign: "center", fontWeight: "bold" }}
          id="customized-dialog-title"
        >
          Set a payment method
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {error && <p className="text-red-600 text-center">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" mx-2 space-y-1 w-[500px]">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="withdraw_method"
                  checked={isSelected === "bkash"}
                  value="bkash"
                  onChange={handleRadioChange}
                  className="form-radio h-5 w-5 accent-lime-600"
                />
                <span className="text-lg font-semibold text-gray-800">
                  BKash personal
                </span>
              </label>
              {isSelected === "bkash" && (
                <div className="flex flex-col mt-2 gap-1">
                  <input
                    type="tel"
                    placeholder="Enter your personal bkash Number"
                    className="border border-gray-300 outline-[#83B735] p-2 rounded w-full"
                    {...register("withdraw_account_no", {
                      required: "Payment number is required",
                      pattern: {
                        value: /^[0-9+]+$/,
                        message: "Invalid number",
                      },
                      maxLength: {
                        value: 15,
                        message: "Invalid number",
                      },
                    })}
                    aria-invalid={errors.withdraw_account_no ? "true" : "false"}
                  />
                  {errors.withdraw_account_no && (
                    <p className="text-red-600">
                      {errors.withdraw_account_no.message}
                    </p>
                  )}
                </div>
              )}

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="withdraw_method"
                  checked={isSelected === "nagad"}
                  value="nagad"
                  onChange={handleRadioChange}
                  className="form-radio h-5 w-5 accent-lime-600"
                />
                <span className="text-lg font-semibold text-gray-800">
                  Nagad personal
                </span>
              </label>
              {isSelected === "nagad" && (
                <div className="flex flex-col mt-2 gap-1">
                  <input
                    type="tel"
                    placeholder="Enter your personal nagad Number"
                    className="border border-gray-300 outline-[#83B735] p-2 rounded w-full"
                    {...register("withdraw_account_no", {
                      required: "Payment number is required",
                      pattern: {
                        value: /^[0-9+]+$/,
                        message: "Invalid number",
                      },
                      maxLength: {
                        value: 15,
                        message: "Invalid number",
                      },
                    })}
                    aria-invalid={errors.withdraw_account_no ? "true" : "false"}
                  />
                  {errors.withdraw_account_no && (
                    <p className="text-red-600">
                      {errors.withdraw_account_no.message}
                    </p>
                  )}
                </div>
              )}
              {isSelected && (
                <div className="mb-3  flex justify-center">
                  <button className="bg-[#83B735] px-3 py-2 font-bold text-white rounded-md flex mt-3 items-center justify-center">
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
