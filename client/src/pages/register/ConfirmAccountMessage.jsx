import React from "react";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import useAuthProvider from "../../hooks/useAuthProvider";

const ConfirmAccountMessage = () => {
  const { user } = useAuthProvider();
  const navigate = useNavigate();
  if (user) {
    navigate("/");
  }
  return (
    <>
      <div className="text-center my-10 max-w-lg w-full ring-1 ring-gray-400 mx-auto p-5 rounded-lg bg-primary/30 ">
        <div className="space-y-5">
          <div className="flex justify-center mt-10">
            <img
              src="https://i.ibb.co/vmcPk4C/001-gmail.png"
              alt=""
              className="w-24"
            />
          </div>
          <Typography variant="h5" fontSize={24} fontWeight={600}>
            Check email
          </Typography>
          <Typography variant="h6" fontSize={16}>
            Check your email to complete your registration. <br /> The link will
            be valid for only 10 minutes.
          </Typography>
          <Link
            to="/login"
            className="mt-2 inline-block bg-primary px-6 text-white w-full rounded-md py-3 text-xl"
          >
            Back to login
          </Link>
        </div>
      </div>
    </>
  );
};

export default ConfirmAccountMessage;
