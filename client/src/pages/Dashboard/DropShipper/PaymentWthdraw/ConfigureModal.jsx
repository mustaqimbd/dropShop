import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [isSelected, setIsSelected] = React.useState(false);

  const handleRadioChange = (e) => {
    setIsSelected(e.target.checked);
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
          <div>
            <h1 className="text-lg font-bold">Select a payment method</h1>
            <div className="my-4 w-[500px]">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={isSelected}
                  onChange={handleRadioChange}
                  className="form-radio h-5 w-5 accent-lime-600"
                />
                <span className="text-lg font-semibold text-gray-800">
                  BKash personal
                </span>
              </label>
              {isSelected && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter your personal BKash Number"
                    className="border border-gray-300 outline-[#83B735] p-2 rounded w-full"
                  />
                </div>
              )}
            </div>
            <div className="mb-3  flex justify-center">
              <button className="bg-[#83B735] px-3 py-2 font-bold text-white rounded-md flex gap-1 items-center justify-center">
                <span>Save Info</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
