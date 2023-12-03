import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuthProvider from "../../../../hooks/useAuthProvider";

const schema = yup.object().shape({
  shopName: yup.string().required("Store name is required"),
  paymentNumber: yup
    .string()
    .required("Payment number is required")
    .matches(/^[0-9+]+$/, "Invalid number")
    .max(15, "Invalid number"),
  // .matches(/^(?:\+8801|01)[13-9]\d{8}$/, "Invalid payment_number number"),
});

export default function Form({ handleClose }) {
  const [error, setError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const { user, fetchUser, setFetchUser } = useAuthProvider();
  // console.log(user)
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
    console.log(data);
    setError("");
    try {
      const res = await axiosSecure.put(
        "/api/user/update-dropshipper-info",
        data
      );
      if (res.data.success) {
        setFetchUser(!fetchUser);
        reset();
        handleClose();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully updated",
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 md:w-[500px] px-5"
    >
      {error && <p className="text-center text-red-600">{error}</p>}
      <div className="flex flex-col gap-1">
        <label className="font-bold">Current store name</label>
        <Controller
          name="shopName"
          control={control}
          defaultValue={user?.shop_info?.shop_name || ""}
          render={({ field }) => (
            <input
              className="border border-gray-200 rounded p-1 outline-[#83B735]"
              {...field}
            />
          )}
        />
        <p className="text-red-600">{errors.shop_name?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-bold">Current payment number</label>
        <Controller
          name="paymentNumber"
          control={control}
          defaultValue={user?.payments?.account_no ||''}
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
