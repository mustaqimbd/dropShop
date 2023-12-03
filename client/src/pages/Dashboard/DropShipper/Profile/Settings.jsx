import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuthProvider from "../../../../hooks/useAuthProvider";

const Settings = () => {
  const { user, fetchUser, setFetchUser } = useAuthProvider();
  const [axiosSecure] = useAxiosSecure();
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    setChecked(user.settings?.receive_email);
  }, [user.settings?.receive_email]);

  const saveSetting = () => {
    axiosSecure
      .put("/api/user/update-dropshipper-info", {
        receiveEmail: checked,
      })
      .then(() => {
        setFetchUser(!fetchUser);
      })
      .catch((err) => console.log(err));
  };

  const disable = user.settings?.receive_email === checked ? true : false;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile settings</h1>
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="font-bold">Email Settings</p>
          <p>Choose which email notifications you would like to receive</p>
          <div className="flex items-center">
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <span>Email me when new announcements are published.</span>
          </div>
        </div>
        <div>
          <button
            disabled={disable}
            onClick={saveSetting}
            className={`bg-[#83B735] px-3 py-2 font-bold text-white rounded-md flex gap-1 items-center justify-center ${
              disable ? "opacity-70" : "opacity-100"
            }`}
          >
            <span>Save settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
