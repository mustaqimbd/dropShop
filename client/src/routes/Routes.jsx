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
import ProductsByCategory from "../pages/products/ProductsByCategory";
import JoinAsDropshipper from "../pages/joinAsDropshiper/JoinAsDropshipper";
import JoiningPayDropshipper from "../pages/joinAsDropshiper/JoiningPayDropshipper";
import Reseller from "../pages/Dashboard/DropShipper/ResellerPanel/Reseller";
import MyCustomers from "../pages/Dashboard/DropShipper/MyCustomers/MyCustomers";
import MyOrders from "../pages/Dashboard/DropShipper/MyOrders/MyOrders";
import Profit from "../pages/Dashboard/DropShipper/Profit/Profit";
import PaymentWithdraw from "../pages/Dashboard/DropShipper/PaymentWthdraw/PaymentWithdraw";
import Profile from "../pages/Dashboard/DropShipper/Profile/Profile";
import ResellerRoute from "./ResellerRoute/ResellerRoute";
import NeedHelp from "../pages/NeedHelp/NeedHelp";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import SingleOrderDetails from "../pages/Dashboard/Admin/Orders/SingleOrderDetails/SingleOrderDetails";
import Account from "../pages/Account/Account";
import UserProfile from "../pages/Account/UserProfile/UserProfile";
import ChangePassword from "../pages/Account/ChangePassword/ChangePassword";
import MyInfo from "../pages/Dashboard/DropShipper/Profile/MyInfo";
import Settings from "../pages/Dashboard/DropShipper/Profile/Settings";
import ProductDetails from "../pages/products/SingleProducts/ProductDetails";
import CheckoutCart from "../pages/orderOverview/CheckoutCart";

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
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/accounts/verify",
        element: <VerifyAccounts />,
      },
      {
        path: "/product-category/:slug",
        element: <ProductsByCategory />,
      },
      {
        path: "/product-category/:categorySlug/:productSlug",
        element: <ProductDetails />, // <AddToCardPage />
      },
      {
        path: "/archive-products/:category",
        element: <ProductsByCategory />,
      },
      {
        path: "/checkout-cart",
        element: <CheckoutCart />,
      },
      {
        path: "/track-order",
        element: <TrackOrder />,
      },
      {
        path: "/join-as-dropshipper",
        element: (
          <PrivateRoute>
            <JoinAsDropshipper />
          </PrivateRoute>
        ),
      },
      {
        path: "/join-pay-dropshipper",
        element: (
          <PrivateRoute>
            <JoiningPayDropshipper />
          </PrivateRoute>
        ),
      },
      {
        path: "/need-help",
        element: <NeedHelp />,
      },
    ],
  },
  {
    path: "/account",
    element: (
      <PrivateRoute>
        <Account />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
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
      //admin dashboard routes
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
          {
            path: "order/:id",
            element: <SingleOrderDetails />,
          },
        ],
      },
      //reseller dashboard routes
      {
        path: "/dashboard",
        element: (
          <ResellerRoute>
            <DropShipper />
          </ResellerRoute>
        ),
        children: [
          {
            path: "reseller-panel",
            element: <Reseller />,
          },
          {
            path: "my-customers",
            element: <MyCustomers />,
          },
          {
            path: "my-orders",
            element: <MyOrders />,
          },
          {
            path: "profit",
            element: <Profit />,
          },
          {
            path: "payment-withdraw",
            element: <PaymentWithdraw />,
          },
          {
            path: "profile",
            element: <Profile />,
            children: [
              {
                path: "info",
                element: <MyInfo />,
              },
              {
                path: "settings",
                element: <Settings />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <h2>Page not found</h2>,
  },
]);
