import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  customerName: yup.string().required("Customer Name is required"),
  mobile: yup
    .number()
    .transform((value, originalValue) => {
      if (originalValue === "") return undefined;
      return value;
    })
    .typeError("Mobile must be a number")
    .required("Mobile is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  // country: yup.string().required("Country is required"),
});

export default function AddCustomerForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 md:w-[500px] px-5"
    >
      <div className="flex flex-col gap-1">
        <label className="font-bold">Customer Name</label>
        <Controller
          name="customerName"
          control={control}
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          Add Customer
        </button>
      </div>
    </form>
  );
}
