import { Divider } from "@mui/material";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Person, Settings, NavigateNext } from "@mui/icons-material";

const Profile = () => {
  const path = useLocation().pathname;
  const name = "Mustaqim Khan"
  return (
    <div className="flex">
      <div className="w-[500px] min-h-[calc(100vh-110px)] rounded-l border-r border-gray-300 bg-white">
        <div className="flex items-center gap-4 p-5">
          <span className="text-[#2DA5F3] bg-[#deebf3] p-3 rounded-full">
            {name.split(" ")[0].charAt(0) &&
            name.split(" ")[1]?.charAt(0) &&
            name.split(" ")[2]?.charAt(0)
              ? name.split(" ")[0].charAt(0) +
                name.split(" ")[1].charAt(0) +
                name.split(" ")[2].charAt(0)
              : name.split(" ")[0].charAt(0) && name.split(" ")[1]?.charAt(0)
              ? name.split(" ")[0].charAt(0) + name.split(" ")[1].charAt(0)
              : name.split(" ")[0].charAt(0)}
          </span>
          <div>
            <h1 className="font-bold text-lg">{name}</h1>
            <p>Reseller Id #98uyjeu</p>
          </div>
        </div>
        <Divider style={{ margin: "10px 0" }} />
        <div className="p-5">
          <p>Account Balance</p>
          <h1 className="text-2xl font-bold">0 ৳</h1>
        </div>
        <Divider style={{ margin: "10px 0" }} />
        <div className="space-y-2">
          <div>
            {path === "/dashboard/dropshipper/profile" ? (
              <Navigate to="/dashboard/dropshipper/profile/info" />
            ) : (
              ""
            )}
            <NavLink
              to="/dashboard/dropshipper/profile/info"
              className={({ isActive }) =>
                (isActive ? "text-[#83B735] " : "") +
                " flex gap-1 items-center py-2 px-5 hover:text-[#83B735]  ease-in-out duration-300"
              }
            >
              <span>
                <Person />
              </span>
              <span> My info</span>
              <span className="flex-1 flex items-center justify-end">
                <NavigateNext />
              </span>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/dashboard/dropshipper/profile/settings"
              className={({ isActive }) =>
                (isActive ? "text-[#83B735] " : "") +
                " flex gap-1 items-center py-2 px-5 hover:text-[#83B735]  ease-in-out duration-300"
              }
            >
              <span>
                <Settings />
              </span>
              <span>Settings</span>
              <span className="flex-1 flex items-center justify-end">
                <NavigateNext />
              </span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[calc(100vh-110px)] rounded-r bg-white pl-6 pt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
