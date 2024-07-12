import Dashboard from "../pages/Dashboard/Dashboard";
import Header from "../partials/Header/Header";

export default function Wrapper() {
  return (
    <div>
      <div className="flex md:flex-row flex-col">
        <div className="bg-secondary basis-full md:basis-1/6 md:min-h-screen">
          <Header />
        </div>
        <div className="bg-primary basis-full md:basis-5/6 min-h-screen p-8">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
