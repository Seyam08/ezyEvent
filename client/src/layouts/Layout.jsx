import { Outlet } from "react-router-dom";
import AddEventBtn from "../Components/CreateEvent/AddEventBtn";
import Header from "../partials/Header/Header";

export default function Layout() {
  return (
    <div>
      <div className="flex md:flex-row flex-col">
        <div className="bg-secondary basis-full md:basis-1/6 md:min-h-screen">
          <Header />
        </div>
        <div className="bg-primary basis-full md:basis-5/6 min-h-screen p-2 md:p-8">
          <Outlet />

          <AddEventBtn />
        </div>
      </div>
    </div>
  );
}
