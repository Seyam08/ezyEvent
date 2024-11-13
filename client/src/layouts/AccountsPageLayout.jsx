import { Outlet } from "react-router-dom";
import VerticalMenu from "../Components/VerticalMenu/VerticalMenu";
import PageHeading from "../Components/subComponents/Heading/PageHeading";

export default function AccountsPageLayout() {
  return (
    <div>
      <PageHeading>Accounts</PageHeading>
      <div className="flex md:flex-row flex-col gap-5 py-5">
        <div className="bg-secondary basis-full md:basis-1/6 md:min-h-screen">
          <VerticalMenu />
        </div>
        <div className="bg-primary basis-full md:basis-5/6 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
