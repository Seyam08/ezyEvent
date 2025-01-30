import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../Components/AuthCheck/PrivetRoute";
import PublicRoute from "../Components/AuthCheck/PublicRoute";
import AccountsPageLayout from "../layouts/AccountsPageLayout";
import Layout from "../layouts/Layout";
import AsSpeaker from "../pages/Accounts/AsSpeaker";
import AttendedEvents from "../pages/Accounts/AttendedEvents";
import HostedEvents from "../pages/Accounts/HostedEvents";
import MyProfile from "../pages/Accounts/MyProfile";
import AllEvents from "../pages/AllEvents/AllEvents";
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
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/coming-soon",
    element: <ComingSoon />,
  },
  {
    path: "/event/:id",
    element: <EventPage />,
  },
  {
    path: "/users/:id",
    element: <PublicProfile />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/speakers",
        element: <Speakers />,
      },
      {
        path: "/dashboard/all-events",
        element: <AllEvents />,
      },
      {
        path: "/dashboard/all-users",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/accounts",
        element: <AccountsPageLayout />,
        children: [
          {
            path: "/dashboard/accounts",
            element: <MyProfile />,
          },
          {
            path: "/dashboard/accounts/hosted-events",
            element: <HostedEvents />,
          },
          {
            path: "/dashboard/accounts/attended-events",
            element: <AttendedEvents />,
          },
          {
            path: "/dashboard/accounts/as-speaker",
            element: <AsSpeaker />,
          },
        ],
      },
    ],
  },
]);

export default route;
