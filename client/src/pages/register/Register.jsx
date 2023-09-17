import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";
import { useForm } from "react-hook-form";

import registeImg from "../../assets/images/registerPage.png";
import { Link, NavLink } from "react-router-dom";

const Register = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = (data) => console.log("The registration form", data);

  const handleConfirmPasswordBlur = () => {
    const confirmPasswordField = document.getElementById("confirmPassword");
    const confirmPassword = confirmPasswordField.value;

    if (password !== confirmPassword) {
      confirmPasswordField.setCustomValidity("Passwords do not match");
    } else {
      confirmPasswordField.setCustomValidity("");
    }
  };

  return (
    <ContainerFull>
      <div className="bg-iconBg py-10">
        <ContainerMax>
          <div className="flex w-5/6 justify-between items-center  p-20  mx-auto">
            <div className="flex-1 h-full ">
              <div className=" w-5/6 ">
              <h1 className="text-2xl text-center font-semibold font-sans">Register to Create Account</h1>
             
                <img className="3/4 " src={registeImg} alt="" />
              </div>
            </div>
            <div className="flex-1  rounded-md  ">
              <div className="flex justify-center">

            
                <form
                  className="space-y-2 w-5/6 shadow-md bg-white p-16 rounded-md"
                  onSubmit={handleSubmit(onSubmit)}
                >
                 
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="fullname"
                    >
                      Full Name
                    </label>
                    <input
                      autoComplete="name"
                      required
                      name="fullname"
                      {...register("fullname", { required: true })}
                      id="fullname"
                      className="shadow appeara6ce-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Your Full Name"
                      type="text"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      autoComplete="email"
                      required
                      name="email"
                      {...register("email", { required: true })}
                      id="email"
                      className="shadow appeara6ce-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Your Email"
                      type="email"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      autoComplete="new-password"
                      placeholder="Enter Password"
                      name="password"
                      onBlur={handleConfirmPasswordBlur}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long",
                        },
                      })}
                      id="password"
                      className="shadow appeara6ce-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="password"
                    />
                    {errors.password && (
                      <p className="text-gray-500">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="mb-10">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      autoComplete="new-password"
                      name="confirmPassword"
                      onBlur={handleConfirmPasswordBlur}
                      id="confirmPassword"
                      className="shadow appeara6ce-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="password"
                      placeholder=" Enter Confirm Password"
                    />
                  </div>

                  <div className=" py-4">
                    <button
                      className="bg-primary px-6 text-white w-full rounded-md py-3 text-xl"
                      type="submit"
                    >
                      Register Now
                    </button>
                  </div>

                  <div className="flex gap-3">
                  <p>Have any account ? </p>  <NavLink className="text-priceText" to={'/login'}>Login Now</NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ContainerMax>
      </div>
    </ContainerFull>
  );
};

export default Register;
