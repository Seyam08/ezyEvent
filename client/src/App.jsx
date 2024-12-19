import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import route from "./Router/route";

function App() {
  const loggedIn = useSelector((state) => state.auth);
  console.log(loggedIn);
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
