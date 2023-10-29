import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";
import { useForm } from "react-hook-form";
import registerImg from "../../assets/images/registerPage.png";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthProvider from "../../hooks/useAuthProvider";
import { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const { user } = useAuthProvider();
  const confirmPasswordFieldRef = useRef();
  const [serverValidationErr, setServerValidationErr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    setRegisterError("");
    setServerValidationErr("");
    setLoading(true);
    try {
      await axiosSecure.post("/api/user/request-register", data);
      navigate("/confirm-account-message");
      setLoading(false);
    } catch (error) {
      if (error.response.data.message === "Validation error.") {
        setServerValidationErr(error.response.data.errors);
      } else {
        setRegisterError(error.response.data.message);
      }
      setLoading(false);
    }
  };
  const handleConfirmPasswordBlur = () => {
    const confirmPasswordField = confirmPasswordFieldRef.current;
    const confirmPassword = confirmPasswordField.value;
    if (password !== confirmPassword) {
      confirmPasswordField.setCustomValidity("Passwords do not match.");
    } else {
      confirmPasswordField.setCustomValidity("");
    }
  };
  if (user) {
    return navigate("/");
  }
  return (
    <ContainerFull>
      <div className="bg-iconBg py-10">
        <ContainerMax>
          <div className="flex gap-10 justify-center items-center mt-10 mb-20 mx-auto">
            <div className="flex-1 flex justify-end">
              <div>
                <h1 className="text-2xl text-center font-semibold font-sans">
                  Register to Create Account
                </h1>
                <img className="3/4 " src={registerImg} alt="" />
              </div>
            </div>
            <div className="flex-1">
              <form
                className="space-y-2  shadow-md bg-white p-16 rounded-md w-full max-w-[500px]"
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
                    {...register("name", { required: true })}
                    id="fullname"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your Email"
                    type="email"
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Mobile No.
                  </label>
                  <input
                    autoComplete="mobile"
                    required
                    name="mobile"
                    {...register("mobile", { required: true })}
                    id="mobile"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your mobile"
                    type="tel" // TODO need validation
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
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                    id="password"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                  />
                  {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
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
                    ref={confirmPasswordFieldRef}
                    autoComplete="new-password"
                    name="confirmPassword"
                    onBlur={handleConfirmPasswordBlur}
                    id="confirmPassword"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder=" Enter Confirm Password"
                  />
                </div>
                {serverValidationErr.length
                  ? serverValidationErr.map((item, index) => (
                      <p key={index} className="text-hotBadge font-bold">
                        <span>{index + 1}. </span>
                        {item}
                      </p>
                    ))
                  : ""}
                {registerError ? (
                  <h2 className="text-hotBadge font-bold">{registerError}</h2>
                ) : (
                  ""
                )}
                <div className=" py-4">
                  <button
                    className="bg-primary px-6 text-white w-full rounded-md py-3 text-xl"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register Now"}
                  </button>
                </div>

                <div className="flex gap-3 justify-center">
                  <p>Already have an account ? </p>{" "}
                  <NavLink className="text-priceText" to={"/login"}>
                    Login Now
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </ContainerMax>
      </div>
    </ContainerFull>
  );
};

export default Register;
