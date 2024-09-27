import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  customerName: yup.string().required("Customer Name is required"),
  mobile: yup
    .string()
    .required("Mobile is required")
    .matches(/^[0-9+]+$/, "Invalid mobile number")
    .max(15, "Invalid mobile number"),
  // .matches(/^(?:\+8801|01)[13-9]\d{8}$/, "Invalid mobile number"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  // country: yup.string().required("Country is required"),
});

export default function AddCustomerForm({ data, refetch, handleClose }) {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const [axiosSecure] = useAxiosSecure();
 
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
   
    try {
      const res = await axiosSecure.post(
        "/reseller/add-customer",
        data
      );
      if (res.data.success) {
        setSuccess(res.data.message);
        reset();
        refetch();
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      if (error.response?.data.errors) {
        setError(error.response.data.errors[0]);
      } else {
        setError(error.message);
      }
    }
  };

  const customerId = data?.customer_id;

  const update = async (data) => {
    setError("");
    setSuccess("");
    data.customer_id = customerId; 

    try {
      const res = await axiosSecure.patch(
        "/reseller/update-customer",
        data
      );
      if (res.data.success) {
        setSuccess(res.data.message);
        reset();
        refetch();
        handleClose();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully edited",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        handleClose();
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      handleClose();
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handler = data ? update : onSubmit;

  return (
    <form
      onSubmit={handleSubmit(handler)}
      className="space-y-2 md:w-[500px] px-5"
    >
      {error && <p className="text-center text-red-600">{error}</p>}
      {success && <p className="text-center text-green-700">{success}</p>}
      <div className="flex flex-col gap-1">
        <label className="font-bold">Customer Name</label>
        <Controller
          name="customerName"
          control={control}
          defaultValue={data ? data.customer_name : ""}
          render={({ field }) => (
            <input
              className="border border-gray-200 rounded p-1 outline-[#83B735]"
              {...field}
            />
          )}
        />
        <p className="text-red-600">{errors.customerName?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-bold">Mobile</label>
        <Controller
          name="mobile"
          control={control}
          defaultValue={data ? data.mobile : ""}
          render={({ field }) => (
            <input
              type="tel"
              className="border border-gray-200 rounded p-1 outline-[#83B735]"
              {...field}
            />
          )}
        />
        <p className="text-red-600">{errors.mobile?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-bold">Email</label>
        <Controller
          name="email"
          control={control}
          defaultValue={data ? data.email : ""}
          render={({ field }) => (
            <input
              type="email"
              className="border border-gray-200 rounded p-1 outline-[#83B735]"
              {...field}
            />
          )}
        />
        <p className="text-red-600">{errors.email?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-bold">Delivery Address</label>
        <Controller
          name="address"
          control={control}
          defaultValue={data ? data.delivery_address?.address : ""}
          render={({ field }) => (
            <input
              className="border border-gray-200 rounded p-1 outline-[#83B735]"
              {...field}
            />
          )}
        />
        <p className="text-red-600">{errors.address?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-bold">City</label>
        <Controller
          name="city"
          control={control}
          defaultValue={data ? data.delivery_address?.city : ""}
          render={({ field }) => (
            <input
              className="border border-gray-200 rounded p-1 outline-[#83B735]"
              {...field}
            />
          )}
        />
        <p className="text-red-600">{errors.city?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-bold">Country</label>
        <Controller
          name="country"
          control={control}
          defaultValue={data ? data.delivery_address?.country : ""}
          render={({ field }) => (
            <input
              className="border border-gray-200 rounded p-1 outline-[#83B735]"
              {...field}
            />
          )}
        />
        <p className="text-red-600">{errors.country?.message}</p>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="text-white bg-[#83B735] px-2 py-1 rounded text-lg font-medium space-x-2"
        >
          {data ? "Save" : "Add Customer"}
        </button>
      </div>
    </form>
  );
}
