import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuthProvider from "../../../../hooks/useAuthProvider";

const schema = yup.object().shape({
  store_name: yup.string().required("Store name is required"),
  payment_number: yup
    .string()
    .required("Payment number is required")
    .matches(/^[0-9+]+$/, "Invalid number")
    .max(15, "Invalid number"),
  // .matches(/^(?:\+8801|01)[13-9]\d{8}$/, "Invalid payment_number number"),
});

export default function Form({ handleClose }) {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuthProvider();
  console.log(user)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

// TODO
  const onSubmit = async (data) => {
    console.log(data)
    // setError("");
    // setSuccess("");
    // data.reseller_id = user.reseller_id;
    // try {
    //   const res = await axiosSecure.put(
    //     "/api/reseller/dashboard/update-customers",
    //     data
    //   );
    //   if (res.data.success) {
    //     setSuccess(res.data.message);
    //     reset();
    //     handleClose();
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: "Successfully edited",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   } else {
    //     handleClose();
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "error",
    //       title: res.data.message,
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    // } catch (error) {
    //   handleClose();
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "error",
    //     title: error.message,
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 md:w-[500px] px-5"
    >
      {error && <p className="text-center text-red-600">{error}</p>}
      {success && <p className="text-center text-green-700">{success}</p>}
      <div className="flex flex-col gap-1">
        <label className="font-bold">Current store name</label>
        <Controller
          name="store_name"
          control={control}
          defaultValue={user?.shop_info?.shop_name}
          render={({ field }) => (
            <input
              className="border border-gray-200 rounded p-1 outline-[#83B735]"
              {...field}
            />
          )}
        />
        <p className="text-red-600">{errors.store_name?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-bold">Current payment number</label>
        <Controller
          name="payment_number"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <input
              type="tel"
              className="border border-gray-200 rounded p-1 outline-[#83B735]"
              {...field}
            />
          )}
        />
        <p className="text-red-600">{errors.payment_number?.message}</p>
      </div>
      <div className="mb-3  flex justify-center">
        <button className="bg-[#83B735] px-3 py-2 font-bold text-white rounded-md flex gap-1 items-center justify-center">
          <span>Save</span>
        </button>
      </div>
    </form>
  );
}
