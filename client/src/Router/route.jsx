import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";

const route = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
      ],
    },
  ],
  {
    basename: "/dashboard",
  }
);

export default route;
