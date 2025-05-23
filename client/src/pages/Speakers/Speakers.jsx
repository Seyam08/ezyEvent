import { useSelector } from "react-redux";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import ErrorBox from "../../Components/subComponents/ErrorBox/ErrorBox";
import PageHeading from "../../Components/subComponents/Heading/PageHeading";
import FullScreenLoader from "../../Components/subComponents/Loader/FullScreenLoader/FullScreenLoader";
import { useGetAllUsersQuery } from "../../features/users/usersApi";
import { speakersSelector } from "../../features/users/userSelector";
import { resErrorHandler } from "../../helper/commmon/resErrorHandler";
import { getRandomDesignation } from "../../helper/static data/getRandomDesignation";

export default function Speakers() {
  const { data, isLoading, error } = useGetAllUsersQuery();
  const speakers = useSelector(speakersSelector);
  const allSpeakers =
    speakers?.map((speaker) => {
      return {
        ...speaker,
        designation: getRandomDesignation(),
      };
    }) || [];

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
    return (
      <>
        <PageHeading>Speakers List</PageHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-primary mt-5">
          {allSpeakers.map((speaker, index) => {
            const { name, username, designation, avatar } = speaker;
            const image = `${import.meta.env.VITE_SERVER_URL}/${avatar}`;

            return (
              <ProfileCard
                key={index}
                link={`/users/${username}`}
                name={name}
                designation={designation}
                avatar={image}
                facebook={"https://www.facebook.com/"}
                linkdin={"https://www.linkdin.com/"}
                X={"https://www.x.com/"}
                customClass="bg-secondary box-shadow"
              />
            );
          })}
        </div>
      </>
    );
  }
}
