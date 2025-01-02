import { createBrowserRouter } from "react-router-dom";
import AccountsPageLayout from "../layouts/AccountsPageLayout";
import Layout from "../layouts/Layout";
import MyProfile from "../pages/Accounts/MyProfile";
import AllUsers from "../pages/AllUsers/AllUsers";
import ComingSoon from "../pages/ComingSoon/ComingSoon";
import Dashboard from "../pages/Dashboard/Dashboard";
import EventPage from "../pages/EventPage/EventPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import PublicProfile from "../pages/PublicProfile/PublicProfile";
import Register from "../pages/Registration/Registration";
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
        path: "/users/:id",
        element: <PublicProfile />,
      },
      {
        path: "/all-users",
        element: <AllUsers />,
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
    path: "/event/:id",
    element: <EventPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/coming-soon",
    element: <ComingSoon />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
]);

export default route;
