import React from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";

const AuthLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const NewHomeLayout = () => {
  const token = localStorage.getItem("token");
  // return token ? <Outlet /> : <Navigate replace to="/login" />;
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/",
    element: <NewHomeLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Homepage />,
      },
      {
        path: "/coins/:id",
        element: <CoinPage />,
      },
    ],
  },
]);
export default router;
