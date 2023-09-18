/* eslint-disable react/no-unescaped-entities */
import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";
import { useForm } from "react-hook-form";
import loginBg from '../../assets/images/login-bg.svg'

import { Link, NavLink } from "react-router-dom";

const Login = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = (data) => console.log("The registration form", data);

 
  return (
    <ContainerFull>
      <div className="bg-iconBg py-16">
        <ContainerMax>
      
          <div className="flex flex-row-reverse w-5/6 justify-between items-center gap-20  p-20  mx-auto">
          
            <div className="flex-1 h-full ">
              <div className=" w-5/6 ">
              

                <img className="3/4 h-fit " src={loginBg} alt="" />
              </div>
            </div>
            <div className="flex-1 rounded-md  ">
          
              <div className="flex  justify-center">
             
                <form
                  className="space-y-2 w-5/6 shadow-md bg-white p-16 rounded-md"
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
                  
                      {...register("password", {
                        required: "Password is required",
                      })}
                      id="password"
                      className="shadow appeara6ce-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="password"
                    />
                  </div>

                  <div className=" py-4">
                    <button
                      className="bg-primary px-6 text-white w-full rounded-md py-3 text-xl"
                      type="submit"
                    >
                      Login Now
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <p>Haven't any account ? </p>{" "}
                    <NavLink className="text-priceText " to={"/register"}>
                      Register Now
                    </NavLink>
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

export default Login;
