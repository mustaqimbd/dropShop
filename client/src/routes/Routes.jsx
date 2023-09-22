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
import AddProduct from "../pages/Dashboard/Admin/AddProduct/AddProduct";
import UpdateProduct from "../pages/Dashboard/Admin/UpdateProduct/UpdateProduct";
import Products from "../pages/Dashboard/Admin/Products/Products";
import Category from "../pages/Dashboard/Admin/Category/Category";
import Orders from "../pages/Dashboard/Admin/Orders/Orders";
import ShopStatus from "../pages/Dashboard/Admin/ShopStatus/ShopStatus";
import TrackOrder from "../pages/TrackOrder/TrackOrder";
import ProductsByCategory from "../pages/products/ArchiveProducts/ProductsByCategory";
import Need_Help from "../pages/Need_Help/Need_Help";

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
      {
        path: "/archive-products",
        element: <ProductsByCategory />,
      },

      {
        path: "/track_order",
        element: <TrackOrder />,
      },
      {
        path:"/Need_Help",
        element:<Need_Help/>
      }
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
            path: "status",
            element: <ShopStatus />,
          },
          {
            path: "sellers",
            element: <Sellers />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "update-product",
            element: <UpdateProduct />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "orders",
            element: <Orders />,
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
