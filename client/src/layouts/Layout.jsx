import { Outlet } from "react-router-dom";
import { AddIcon } from "../icons/icons";
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

          <div className="fixed bottom-0 right-0 p-2">
            <button className="group flex items-center justify-center w-11 h-11 foreground rounded-lg cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-40 hover:rounded-lg active:translate-x-1 active:translate-y-1">
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3 group-hover:hidden">
                <AddIcon className="text-white fill-current" />
              </div>
              <div className="absolute right-0 left-0 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Add Event
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
