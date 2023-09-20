import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";

const VerifyAccounts = () => {
  const [axiosSecure] = useAxiosSecure();

  const handleConfirmRegistration = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    try {
      const res = await axiosSecure.post(`/api/user/register`, { token });
      Swal.fire({
        icon: "success",
        title: "Verification success.",
        text: "Now log in with your account.",
        footer: `<a href="/login">Log in now</a>`,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
            Click to verify your account
          </Typography>
          <Typography variant="h6" fontSize={16}>
            Complete your register and start earnings from today.
          </Typography>
          <button
            onClick={handleConfirmRegistration}
            className="mt-2 inline-block bg-hotBadge px-6 text-white w-full rounded-md py-3 text-xl"
          >
            Click to verify.
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyAccounts;
