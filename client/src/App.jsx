import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import FullScreenLoader from "./Components/subComponents/Loader/FullScreenLoader/FullScreenLoader";
import route from "./Router/route";
import { useGetProfileQuery } from "./features/Profile/profileApi";
import useAuth from "./hooks/useAuth";
import useAuthCheck from "./hooks/useAuthCheck";
import useColorMode from "./hooks/useColorMode";

function App() {
  // eslint-disable-next-line no-unused-vars
  const authChecked = useAuthCheck();
  const [theme, setTheme] = useColorMode();
  const loggedIn = useAuth();
  useGetProfileQuery(undefined, {
    skip: !loggedIn,
  });

  return (
    <>
      {import.meta.env.MODE === "development" && (
        <div className="fixed top-0 right-0 m-2 h-4 w-4 flex items-center space-x-2 z-50">
          <div
            className={`h-3 w-3 rounded-full ${
              loggedIn ? "bg-emerald-500" : "bg-red-500"
            }`}
          ></div>
        </div>
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          className: "notification",
          success: {
            className: "notificationSuccess",
            iconTheme: {
              primary: "#0d9488",
              secondary: "#ffffff",
            },
          },
          error: {
            className: "notificationError",
            iconTheme: {
              primary: "#dc2626",
              secondary: "#ffffff",
            },
          },
        }}
      />
      {authChecked ? <RouterProvider router={route} /> : <FullScreenLoader />}
    </>
  );
}

export default App;
