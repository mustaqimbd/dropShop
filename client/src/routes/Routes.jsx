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
import TrackOrder from "../pages/TrackOrder/TrackOrder";

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
        element: <ConfirmAccountMessage></ConfirmAccountMessage>,
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
        path: "/track_order",
        element: <TrackOrder />,
      },
    ],
  },
]);
