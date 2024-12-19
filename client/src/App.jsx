import { RouterProvider } from "react-router-dom";
import route from "./Router/route";
import useAuth from "./hooks/useAuth";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
  const authChecked = useAuthCheck();
  const loggedIn = useAuth();

  console.log("auth check status", authChecked);
  console.log("logged status", loggedIn);

  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
