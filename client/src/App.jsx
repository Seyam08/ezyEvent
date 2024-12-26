import { RouterProvider } from "react-router-dom";
import route from "./Router/route";
import useAuth from "./hooks/useAuth";
import useAuthCheck from "./hooks/useAuthCheck";
import useColorMode from "./hooks/useColorMode";

function App() {
  // eslint-disable-next-line no-unused-vars
  const authChecked = useAuthCheck();
  const [theme, setTheme] = useColorMode();
  const loggedIn = useAuth();

  return (
    <>
      <div className="fixed top-0 right-0 m-2 h-4 w-4 flex items-center space-x-2">
        <div
          className={`h-3 w-3 rounded-full ${
            loggedIn ? "bg-emerald-500" : "bg-red-500"
          }`}
        ></div>
      </div>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
