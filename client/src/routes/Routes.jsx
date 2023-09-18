import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainlayout/MainLayout";
import Home from "../pages/home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Conatct/Contact";
import AddToCardPage from "../pages/AddToCardPage/AddToCardPage";

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
        path: "/addToCardPage",
        element: <AddToCardPage />
      }
    ],
  },
]);
