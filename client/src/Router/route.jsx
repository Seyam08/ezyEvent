import { createBrowserRouter } from "react-router-dom";
import AccountsPageLayout from "../layouts/AccountsPageLayout";
import Layout from "../layouts/Layout";
import MyProfile from "../pages/Accounts/MyProfile";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Speakers from "../pages/Speakers/Speakers";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/speakers",
        element: <Speakers />,
      },
      {
        path: "/accounts",
        element: <AccountsPageLayout />,
        children: [
          {
            path: "/accounts/my-profile",
            element: <MyProfile />,
          },
          {
            path: "/accounts/anything",
            element: <Login />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);

export default route;
