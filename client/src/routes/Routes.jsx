import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainlayout/MainLayout";
import Home from "../pages/home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Conatct/Contact";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import ConfirmAccountMessage from "../pages/register/ConfirmAccountMessage";
import VerifyAccounts from "../pages/register/VerifyAccounts";

import AddToCardPage from "../pages/AddToCardPage/AddToCardPage";
import Dashboard from "../layouts/dashboard/Dashboard";
import AdminDashboard from "../layouts/dashboard/AdminDashboard/AdminDashboard";
import DropShipper from "../layouts/dashboard/DropShipper/DropShipper";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import Sellers from "../pages/Dashboard/Admin/Sellers/Sellers";
import ShopInfo from "../pages/Dashboard/Admin/ShopInfo/ShopInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/confirm-account-message",
        element: <ConfirmAccountMessage />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/accounts/verify",
        element: <VerifyAccounts />,
      },
      {
        path: "/addToCardPage",
        element: <AddToCardPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          {
            path: "shop-info",
            element: <ShopInfo />,
          },
          {
            path: "sellers",
            element: <Sellers />,
          },
        ],
      },
      {
        path: "dropshipper",
        element: <DropShipper />,
      },
    ],
  },
]);
