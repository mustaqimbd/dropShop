import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ActiveLink from "../../components/ActiveLink/ActiveLink";
import { Link, Outlet } from "react-router-dom";
import QuickLinks from "../../components/QuickLinks/QuickLinks";
import MenuIcon from "@mui/icons-material/Menu";
import { Person } from "@mui/icons-material";
import SecurityIcon from "@mui/icons-material/Security";

const Account = props => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerWidth = 240;
  const container =
    window !== undefined ? () => window().document.body : undefined;
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
        <ListItem style={{ padding: 0 }}>
          <ActiveLink to="/account/profile">
            <ListItemButton>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ActiveLink>
        </ListItem>
        <ListItem style={{ padding: 0 }}>
          <ActiveLink to="/account/change-password">
            <ListItemButton>
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText primary="Change password" />
            </ListItemButton>
          </ActiveLink>
        </ListItem>
      </List>
    </div>
  );
  return (
    <>
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
                    <QuickLinks />
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
          <div className="bg-[#F3F3F9] md:p-2 min-h-[calc(100vh-65px)]">
            <Outlet />
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Account;
