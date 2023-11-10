import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useAuthProvider from "../../hooks/useAuthProvider";
import { Link } from "react-router-dom";
import { Person } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { FaChartLine } from "react-icons/fa";

const QuickLinks = () => {
  const { user, logOut } = useAuthProvider();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    logOut();
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar src={user?.profile_pic} alt={user?.name} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          <div className="flex gap-5 px-5 items-center pb-2">
            <div>
              <Avatar alt={user?.name} srcSet={user?.profile_pic} />
            </div>
            <div>
              <Typography variant="h6" component="h6">
                {user?.name}
              </Typography>
              <Box component="p" color="customColors.linkText" fontSize={14}>
                {user?.email}
              </Box>
            </div>
          </div>
          <Divider style={{ marginBottom: "10px" }} />
          <Link to="/account">
            <MenuItem>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
          </Link>
          <Link
            to={
              user?.role === "admin"
                ? "/dashboard/admin/status"
                : user?.role === "reseller"
                ? "/dashboard/reseller-panel"
                : user?.role === "user"
                ? ""
                : ""
            }
          >
            <MenuItem>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>
          </Link>
          {user?.role === "user" ? (
            <Link to="/join-as-dropshipper">
              <MenuItem>
                <ListItemIcon>
                  <FaChartLine fontSize="small" />
                </ListItemIcon>
                <ListItemText>Join as dropshipper</ListItemText>
              </MenuItem>
            </Link>
          ) : (
            ""
          )}
          {/* logout  */}
          <Divider style={{ marginTop: "10px" }} />
          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default QuickLinks;
