import Switch from "@mui/material/Switch";
import { useState } from "react";

const Settings = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
          <button className="bg-[#83B735] px-3 py-2 font-bold text-white rounded-md flex gap-1 items-center justify-center">
            <span>Save settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
