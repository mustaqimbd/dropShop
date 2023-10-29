import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";
import { useForm, Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import LocationCityIcon from "@mui/icons-material/LocationCity";

import { Typography } from "@mui/material";
import Coupon from "../../components/cupon/CouponApply";
import Payments from "../../components/payments/Payments";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

import useAuthProvider from "../../hooks/useAuthProvider";

const JoiningPayDropshipper = () => {
  const { control } = useForm();
  const { user } = useAuthProvider();
  console.log(user);

  const [axiosSecure] = useAxiosSecure();

  axiosSecure
    .post("/api/category/", {})
    .then(function (response) {
      console.log(response);
      if (response.status == 200) {
        toast.success(`${response?.data?.message}`, {
          style: {
            border: "1px solid green",
          },
          position: "top-center",
        });
      }
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });

  return (
    <>
      <ContainerFull>
        <div className="bg-borderColor py-16">
          <ContainerMax>
            <div className="w-5/6 mx-auto flex items-start justify-between gap-10 ">
              <div className="w-4/6 ">
                <form className="bg-white shadow-md rounded  p-8 mb-4">
                  <div className="py-3 mb-2">
                    <Typography
                      align="center"
                      className="font-bold"
                      variant="h5"
                    >
                      Payment for Dropshipper Sign Up
                    </Typography>
                  </div>

                  <div className="mb-4">
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={user?.name}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          label="Your Name"
                          fullWidth
                          disabled
                          InputProps={{
                            startAdornment: (
                              <AccountCircleIcon
                                sx={{ marginRight: "8px" }}
                                fontSize="small"
                              />
                            ),
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={user?.email}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="email"
                          label="Email"
                          fullWidth
                          disabled
                          InputProps={{
                            startAdornment: (
                              <EmailIcon
                                sx={{ marginRight: "8px" }}
                                fontSize="small"
                              />
                            ),
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <Controller
                      name="mobile"
                      control={control}
                      defaultValue={user?.mobile}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="tel"
                          label="Phone Number"
                          fullWidth
                          disabled
                          InputProps={{
                            startAdornment: (
                              <PhoneIcon
                                sx={{ marginRight: "8px" }}
                                fontSize="small"
                              />
                            ),
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="mb-4">
                    <Controller
                      name="district"
                      control={control}
                      defaultValue={user?.shop_info?.address?.district}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          label="District/City"
                          fullWidth
                          disabled
                          InputProps={{
                            startAdornment: (
                              <LocationCityIcon
                                sx={{ marginRight: "8px" }}
                                fontSize="small"
                              />
                            ),
                          }}
                        />
                      )}
                    />
                  </div>

                  {/* Dropshipper Signup Fee Section */}
                </form>
                <Coupon></Coupon>
              </div>
              <div className="w-1/3">
                <Payments></Payments>
              </div>
            </div>
          </ContainerMax>
        </div>
      </ContainerFull>
    </>
  );
};

export default JoiningPayDropshipper;
