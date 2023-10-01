import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Person from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UpdateIcon from "@mui/icons-material/Update";
import CategoryIcon from "@mui/icons-material/Category";
import FluorescentIcon from "@mui/icons-material/Fluorescent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Redeem,
  MonetizationOnOutlined,
  LoginOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import useAuthProvider from "../../hooks/useAuthProvider";
import ActiveLink from "../../components/ActiveLink/ActiveLink";

const drawerWidth = 240;

const Dashboard = (props) => {
  const { user, logOut } = useAuthProvider();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const path = useLocation().pathname;
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //handle logout
  const handleLogOut = () => {
    logOut();
  };
  const drawer = (
    <div>
      <Toolbar>
        <Link to="/">
          <Typography variant="h4" color="customColors.offBadge">
            DropShop
          </Typography>
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {user?.role === "admin" ? (
          <>
            {path === "/dashboard" && <Navigate to="/dashboard/admin/status" />}
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/admin/status">
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/admin/sellers">
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sellers" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
            <Divider style={{ marginBlock: "5px" }} />
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/admin/category">
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Category" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/admin/products">
                <ListItemButton>
                  <ListItemIcon>
                    <FluorescentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/admin/add-product">
                <ListItemButton>
                  <ListItemIcon>
                    <AddCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add product" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/admin/update-product">
                <ListItemButton>
                  <ListItemIcon>
                    <UpdateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Update product" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/admin/orders">
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
          </>
        ) : (
          ""
        )}
        {user?.role === "reseller" ? (
          <>
            {path === "/dashboard" && (
              <Navigate to="/dashboard/dropshipper/reseller" />
            )}
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/dropshipper/reseller">
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reseller Panel" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/dropshipper/my-customers">
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="My customers" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
            <Divider style={{ marginBlock: "5px" }} />
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/dropshipper/my-orders">
                <ListItemButton>
                  <ListItemIcon>
                    <Redeem />
                  </ListItemIcon>
                  <ListItemText primary="My orders" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/dropshipper/profit">
                <ListItemButton>
                  <ListItemIcon>
                    <MonetizationOnOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Profit" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/dropshipper/payment-withdraw">
                <ListItemButton>
                  <ListItemIcon>
                    <LoginOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Payment withdraw" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ActiveLink to="/dashboard/dropshipper/profile">
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleAltOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ActiveLink>
            </ListItem>
          </>
        ) : (
          ""
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        bgcolor="customColors.iconBg"
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          style={{ background: "#fff", borderBottom: "1px solid #E0E0E0" }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex justify-between w-full items-center">
            <div className="flex-1"></div>
            <div className="">
              <ul>
                <li>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Avatar alt={user?.name} srcSet={user?.profile_pic} />
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
                          <Box
                            component="p"
                            color="customColors.linkText"
                            fontSize={14}
                          >
                            {user?.email}
                          </Box>
                        </div>
                      </div>
                      <Divider style={{ marginBottom: "10px" }} />
                      <Link to="/">
                        <MenuItem>
                          <ListItemIcon>
                            <Person fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Profile</ListItemText>
                        </MenuItem>
                      </Link>
                      <Link to="/accounts/settings">
                        <MenuItem>
                          <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Settings</ListItemText>
                        </MenuItem>
                      </Link>
                      <Divider style={{ marginTop: "10px" }} />
                      <MenuItem onClick={handleLogOut}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Log Out</ListItemText>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </li>
              </ul>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        bgcolor={"customColors.lightGray"}
        overflow={"hidden"}
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div className="bg-[#F3F3F9] p-5 min-h-[calc(100vh-65px)]">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
