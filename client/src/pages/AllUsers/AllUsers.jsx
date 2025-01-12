import AllUsersTable from "../../Components/AllUsersTable/AllUsersTable";
import ErrorBox from "../../Components/subComponents/ErrorBox/ErrorBox";
import FullScreenLoader from "../../Components/subComponents/Loader/FullScreenLoader/FullScreenLoader";
import { useGetAllUsersQuery } from "../../features/users/usersApi";
import { resErrorHandler } from "../../helper/commmon/resErrorHandler";

export default function AllUsers() {
  const { data, isLoading, error } = useGetAllUsersQuery();

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
  if (data) {
    return <AllUsersTable users={data} />;
  }
}
