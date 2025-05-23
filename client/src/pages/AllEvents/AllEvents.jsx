import AllEventsTable from "../../Components/AllEventsTable/AllEventsTable";
import ErrorBox from "../../Components/subComponents/ErrorBox/ErrorBox";
import FullScreenLoader from "../../Components/subComponents/Loader/FullScreenLoader/FullScreenLoader";
import { useGetAllEventsQuery } from "../../features/Events/eventApi";
import { resErrorHandler } from "../../helper/commmon/resErrorHandler";

export default function AllEvents() {
  const { data, isLoading, error } = useGetAllEventsQuery();

  if (isLoading) {
    return <FullScreenLoader />;
  }
  if (error) {
    const extractError = resErrorHandler(error); // Use the error extractor function
    let errorDesc = "";
    if (extractError.message === "Unauthorized URL!") {
      errorDesc = "You are not allowed to view this page";
    }
    return (
      <ErrorBox
        status={error.status}
        heading={extractError.message}
        desc={errorDesc}
      />
    );
  }
  if (data?.events) {
    return <AllEventsTable />;
  }
}
