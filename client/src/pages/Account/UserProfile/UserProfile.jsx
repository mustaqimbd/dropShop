import { Button, Divider, Menu, MenuItem } from "@mui/material";
import useAuthProvider from "../../../hooks/useAuthProvider";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const UserProfile = () => {
  const { user } = useAuthProvider();
  const [updatedName, setUpdatedName] = useState(user?.name);
  const btnController = () => {
    if (user?.name === updatedName) {
      return true;
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMouseOver = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="bg-white shadow-md p-2 md:p-5 rounded-md">
        <h2 className="dashboard-title">Profile info</h2>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-10">
          <div>
            <input
              type="text"
              defaultValue={user?.name}
              className="cs-input"
              onChange={event => setUpdatedName(event.target.value)}
            />
          </div>
          <div>
            <button
              className="rounded-full w-[200px] h-[200px] ring-2 ring-zinc-300 aspect-square relative"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onMouseEnter={handleMouseOver}
            >
              <img
                src={user?.profile_pic}
                alt={user?.name}
                className="rounded-full"
              />
              <span className="absolute bottom-4 left-0 bg-slate-800 inline-block px-3 py-1 text-white rounded-md ring-2 ring-slate-100">
                <EditIcon /> <span>Edit</span>
              </span>
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Upload new</MenuItem>
            </Menu>
          </div>
          <div>
            <Button disabled={btnController()} variant="contained">
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
