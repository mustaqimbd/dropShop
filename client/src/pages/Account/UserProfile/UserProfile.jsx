import { Button, Divider, Menu, MenuItem } from "@mui/material";
import useAuthProvider from "../../../hooks/useAuthProvider";
import EditIcon from "@mui/icons-material/Edit";
import { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UserProfile = () => {
  const updateProfileRef = useRef();
  const nameFieldRef = useRef();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuthProvider();
  const [updatedName, setUpdatedName] = useState(user?.name);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const btnController = () => {
    let returnVal = false;
    if (user?.name === updatedName) {
      returnVal = true;
    }
    if (updatedImage) {
      returnVal = false;
    }
    if (isUploading) {
      returnVal = true;
    }
    return returnVal;
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMouseOver = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //handle upload now
  const handleUploadNow = () => {
    handleClose();
    updateProfileRef.current.click();
  };
  const handleFileSelected = e => {
    const selectedFile = e.target.files[0];
    setUpdatedImage(selectedFile);
  };
  const handleClear = () => {
    setUpdatedImage(null);
    nameFieldRef.current.value = user.name;
    setUpdatedName(user.name);
  };
  const handleUpload = async () => {
    setIsUploading(true);
    try {
      if (updatedImage) {
        const formData = new FormData();
        formData.append("image", updatedImage);
        fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then(res => res.json())
          .then(async data => {
            console.log(data);
            changeProfile(data);
            setIsUploading(false);
          })
          .catch(err => {
            console.log(err);
            setIsUploading(false);
          });
      } else {
        changeProfile();
        setIsUploading(false);
      }
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };
  const changeProfile = async data => {
    const result = await axiosSecure.put("api/user/change-user-profile", {
      name: updatedName,
      profile_pic: data?.data?.display_url,
    });
    if (result.data.success) {
      setTimeout(() => {
        window.location.reload();
      }, 200);
      toast.success("Profile updated successfully.");
    }

    return result.data;
  };
  return (
    <>
      <div className="bg-white shadow-md p-2 md:p-5 rounded-md">
        <h2 className="dashboard-title">Profile info</h2>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-10 justify-center">
          <form>
            <input
              ref={nameFieldRef}
              type="text"
              defaultValue={user?.name}
              className="cs-input"
              onChange={event => setUpdatedName(event.target.value)}
            />
          </form>
          <div className="hidden">
            <input
              type="file"
              ref={updateProfileRef}
              onChange={handleFileSelected}
            />
          </div>
          <div className="flex justify-center">
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
                className="rounded-full w-[200px] h-[200px] object-cover"
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
              <MenuItem onClick={handleUploadNow}>Upload new</MenuItem>
            </Menu>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleUpload}
              disabled={btnController()}
              variant="contained"
            >
              Update
            </Button>
            <Button
              onClick={handleClear}
              disabled={btnController()}
              variant="contained"
              style={{ background: "crimson", marginLeft: "10px" }}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
