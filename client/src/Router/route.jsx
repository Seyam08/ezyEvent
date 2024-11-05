import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    // children: [
    //   {
    //     path: "/dashboard",
    //     element: <Dashboard />,
    //   },
    // ],
  },
]);

export default route;
