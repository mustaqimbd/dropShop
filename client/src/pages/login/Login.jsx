/* eslint-disable react/no-unescaped-entities */
import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";
import { useForm } from "react-hook-form";
import loginBg from "../../assets/images/login-bg.svg";
import Typography from "@mui/material/Typography";

import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthProvider from "../../hooks/useAuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const Login = () => {
  const { user, setUser } = useAuthProvider();
  const [loginError, setLoginError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setLoginError("");
    try {
      const res = await axiosSecure.post(
        "/user/login",
        data
      );
      setUser(res.data.payload.userInfo);
      localStorage.setItem("token", res.data.payload.token);
      navigate("/");
    } catch (error) {
      setLoginError(error.response.data.message);
    }
  };

  return (
    <ContainerFull>
      <div className="bg-iconBg py-10">
        <ContainerMax>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-20  mt-10 mb-20  mx-auto">
            <div className="flex-1 rounded-md">
              <div className="flex justify-center">
                <form
                  className="space-y-2 shadow-md bg-white p-5 md:p-16 rounded-md"
                  onSubmit={handleSubmit(onSubmit)}
                >
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
                      defaultValue={"demoseller1@gmail.com"}
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
                      defaultValue={"Pass#123"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      id="password"
                      className="shadow appeara6ce-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="password"
                    />
                  </div>
                  {loginError ? (
                    <Typography
                      variant="h6"
                      component="h6"
                      color="customColors.hotBadge"
                      fontSize={14}
                      className="mt-5F"
                    >
                      {loginError}
                    </Typography>
                  ) : (
                    ""
                  )}

                  <div className=" py-4">
                    <button
                      className="bg-primary px-6 text-white w-full rounded-md py-3 text-xl"
                      type="submit"
                    >
                      Login Now
                    </button>
                  </div>
                  <div className="flex justify-center my-4">
                    <Link to="/forgot-password">Forgot password ?</Link>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <p>Don't have an account ? </p>
                    <NavLink className="text-priceText " to={"/register"}>
                      Register Now
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex-1 h-full ">
              <div>
                <img className="3/4 h-fit " src={loginBg} alt="" />
              </div>
            </div>
          </div>
        </ContainerMax>
      </div>
    </ContainerFull>
  );
};

export default Login;
