import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import StoreIcon from "@mui/icons-material/Store";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LanguageIcon from "@mui/icons-material/Language";
import { Typography } from "@mui/material";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuthProvider from "../../hooks/useAuthProvider";
import { useNavigate } from "react-router-dom";

const JoinAsDropshipper = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuthProvider();
  console.log(user);

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);

    axiosSecure
      .put("/user/update-dropshipper-info", data)
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          toast.success(`${response?.data?.message}`, {
            style: {
              border: "1px solid green",
            },
            position: "top-center",
          });
          navigate("/join-pay-dropshipper");
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <>
      <ContainerFull>
        <div className="bg-borderColor py-16">
          <ContainerMax>
            <div className="flex justify-between ">
              <div className="w-1/2 min-w-[620px] mx-auto">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white shadow-md rounded  p-8 mb-4"
                >
                  <div className="py-3 mb-2">
                    <Typography
                      align="center"
                      className="font-bold"
                      variant="h5"
                    >
                      Dropshipper Sign Up Form
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
                      name="shopName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          label="Your Shop/Brand Name"
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: (
                              <StoreIcon
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
                      name="address"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          label="Shop Address"
                          fullWidth
                          required
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
                  <div className="mb-4">
                    <Controller
                      name="district"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          label="District/City"
                          fullWidth
                          required
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
                  <div className="mb-4">
                    <Controller
                      name="webOrPageLink"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="url"
                          label="Website/Page URL"
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: (
                              <LanguageIcon
                                sx={{ marginRight: "8px" }}
                                fontSize="small"
                              />
                            ),
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <div className="mb-4">
                        <FormControlLabel
                          control={
                            <Controller
                              name="termsAndPolicyAccepted"
                              control={control}
                              defaultValue={false}
                              render={({ field }) => (
                                <Checkbox {...field} color="primary" />
                              )}
                            />
                          }
                          label="I accept the terms and policy"
                        />
                      </div>
                      <Button
                        className="text-white"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Join as a Dropshipper
                      </Button>
                    </div>
                    <div className="mt-4  items-center">
                      <p className="mr-2">
                        Dropshipper Sign Up Fee :{" "}
                        <span className="text-normal font-semibold">
                          {" "}
                          3000 tk BD
                        </span>{" "}
                      </p>
                      <a
                        href="/fee-explanation-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        Why this sign up fee?
                      </a>
                    </div>
                  </div>

                  {/* Dropshipper Signup Fee Section */}
                </form>
              </div>
            </div>
          </ContainerMax>
        </div>
      </ContainerFull>
    </>
  );
};

export default JoinAsDropshipper;
