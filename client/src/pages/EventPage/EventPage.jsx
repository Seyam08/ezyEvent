import { includes, map } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import dummyImage from "../../assets/dummy-image-removebg-preview.png";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import TooltipIcon from "../../Components/subComponents/AnimatedIcons/TooltipIcon";
import ErrorBox from "../../Components/subComponents/ErrorBox/ErrorBox";
import AttendEventBtn from "../../Components/subComponents/EventBtn/AttendEventBtn";
import RemoveAttendEventBtn from "../../Components/subComponents/EventBtn/RemoveAttendEventBtn";
import FullScreenLoader from "../../Components/subComponents/Loader/FullScreenLoader/FullScreenLoader";
import { useGetEventQuery } from "../../features/Events/eventApi";
import { resErrorHandler } from "../../helper/commmon/resErrorHandler";
import { getStatusClass } from "../../helper/enentsTable/getColorClass";
import { getRandomDesignation } from "../../helper/static data/getRandomDesignation";
import useAuth from "../../hooks/useAuth";
import { EditIcon } from "../../icons/icons";
import Footer from "../../partials/PublicComponent/Footer/Footer";
import Header from "../../partials/PublicComponent/Header/Header";

export default function EventPage() {
  const loggedIn = useAuth();
  const { id } = useParams();
  const [hosts, setHosts] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(null);
  const [attendanceInfo, setAttendanceInfo] = useState({
    limit: null,
    left: null,
    attend: null,
  });
  const [attended, setAttended] = useState(false);
  const [authority, setAuthority] = useState(false);
  const { myAccount } = useSelector((state) => state.account);

  // running query for getting event
  const { data, error, isLoading } = useGetEventQuery(id);

  useEffect(() => {
    if (data) {
      // Map host information and set it in state
      const hostInfo = map(data?.hostId, ({ name, username, avatar }) => ({
        name,
        username,
        avatar,
      }));
      setHosts(hostInfo);

      // Map speaker information and set it in state
      const speakersInfo = map(
        data?.speakerId,
        ({ name, username, avatar }) => ({
          name,
          username,
          avatar,
          designation: getRandomDesignation(2),
        })
      );
      setSpeakers(speakersInfo);

      // Convert event date from the response data and convert it to a readable format
      const readableDate = new Date(data?.eventDate).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
      setDate(readableDate);

      // Set event status
      setStatus(data?.status);

      // Calculate attendance information
      const limit = data?.attendanceLimit;
      const attend = data?.attendeesId.length;
      const seatLeft = limit - attend > 0 ? limit - attend : "full";

      setAttendanceInfo({
        limit: limit,
        attend: attend,
        left: seatLeft,
      });

      // Map attendees' information and set it in state
      const attendeesInfo = map(
        data?.attendeesId,
        ({ name, username, avatar }) => ({
          name,
          username,
          avatar,
        })
      );
      setAttendees(attendeesInfo);
    }
  }, [data]);

  useEffect(() => {
    if (loggedIn) {
      const attendeesUsername = map(attendees, "username");
      const has = includes(attendeesUsername, myAccount?.username);
      if (has) {
        setAttended(true);
      } else {
        setAttended(false);
      }
    }
  }, [attendees, data]);

  useEffect(() => {
    // checking host

    const userId = myAccount?._id;
    const eventId = id;
    const eventHosted = myAccount?.eventsHosted.map((item) => item._id);
    const hostIds = data?.hostId.map((item) => item._id);
    // ---------------
    const eventHostExist = eventHosted?.includes(eventId);
    const hostIdsExist = hostIds?.includes(userId);
    const role = myAccount?.role.includes("host");

    // checking if the user is host or not
    if (eventHostExist && hostIdsExist && role) {
      setAuthority(true);
    }
  }, [myAccount, data, id]);

  return (
    <div className="bg-primary">
      <Header sticky />
      {isLoading ? (
        <div className="bg-primary">
          <div className="h-20 gradient-bg-2nd"></div>
          <FullScreenLoader />
        </div>
      ) : error ? (
        <div className="bg-primary">
          <div className="h-20 gradient-bg-2nd"></div>
          <ErrorBox
            status={error.status}
            heading={resErrorHandler(error).message}
            desc={
              resErrorHandler(error).message === "Unauthorized URL!"
                ? "You are not allowed to view this page"
                : "Something went wrong!"
            }
          />
        </div>
      ) : data ? (
        <div className="mb-10">
          {/* Header Section */}
          <section className="relative">
            <img
              src={dummyImage}
              alt="Event Banner"
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[#0D1117] bg-opacity-80 flex items-center justify-center text-white">
              <div className="width-holder text-center space-y-6">
                <h1 className="text-2xl md:text-4xl font-bold text-[#EDEDED]">
                  {data?.eventName}
                </h1>
                <p className="text-[#EDEDED] md:text-xl text-secondary">
                  By{" - "}
                  {hosts.map((host, index) => (
                    <Link
                      key={index}
                      target="blank"
                      to={`/users/${host?.username}`}
                      className="text-glow font-medium"
                    >
                      {host?.name}
                      {index < hosts.length - 1 ? (
                        <span className="text-white">{", "}</span>
                      ) : (
                        ""
                      )}
                    </Link>
                  ))}
                </p>
              </div>
            </div>
          </section>

          <section className="width-holder px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-10">
                {/* speakers section  */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-secondary">
                    Speakers
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-primary">
                    {speakers.map((speaker, index) => {
                      const { name, username, avatar, designation } = speaker;
                      const image = `${
                        import.meta.env.VITE_SERVER_URL
                      }/avatars/${avatar}`;

                      return (
                        <ProfileCard
                          key={index}
                          name={name}
                          link={`/users/${username}`}
                          designation={designation}
                          avatar={image}
                          customClass="bg-secondary box-shadow"
                          facebook={"#"}
                          linkedIn={"#"}
                          X={"#"}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* attendees section  */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-secondary">
                    People who's gonna attend
                  </h2>
                  <div className="px-5 py-5 bg-secondary rounded-lg w-full mx-auto max-h-max">
                    <div className="flex justify-between items-center mb-4">
                      {/* <Link
                      to={#}
                      className="text-secondary font-medium text-base bg-tertiary rounded-full px-4 py-1 hover:foreground hover:text-[#EDEDED] transition"
                    >
                      View All
                    </Link> */}
                    </div>
                    <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {attendees.length > 0 ? (
                        attendees.map((attend, index) => {
                          const { name, username, avatar } = attend;
                          const image = `${
                            import.meta.env.VITE_SERVER_URL
                          }/avatars/${avatar}`;

                          return (
                            <li
                              key={index}
                              className="flex items-center space-x-4 border-b border-gray-300 dark:border-gray-700 pb-4 last:border-b-0"
                            >
                              <div className="w-9 h-9 cursor-pointer">
                                <img
                                  src={image}
                                  alt={name}
                                  className="p-1 rounded-full ring-1 ring-[#514cfe] h-full w-full"
                                />
                              </div>

                              <div className="flex-1">
                                <h3 className="text-base font-semibold text-secondary">
                                  <Link
                                    to={`/users/${username}`}
                                    target="blank"
                                    className="text-glow"
                                  >
                                    {name}
                                  </Link>
                                </h3>
                                <h3 className="text-sm text-tertiary">
                                  {username}
                                </h3>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li className="flex items-center space-x-4 border-b border-gray-300 dark:border-gray-700 pb-4 last:border-b-0">
                          <h3 className="text-base font-semibold text-secondary">
                            Be the first to participant for this event!
                          </h3>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="mt-10">
                <div className="bg-secondary shadow-lg rounded-lg p-6 mb-6 relative">
                  <h2 className="text-xl font-bold mb-4 text-secondary">
                    Date & Time
                  </h2>
                  <p className="text-tertiary font-medium">{date}</p>

                  {attended ? (
                    <RemoveAttendEventBtn eventId={id} />
                  ) : (
                    <AttendEventBtn eventId={id} />
                  )}
                  {authority && (
                    <div className="absolute top-4 right-4">
                      <TooltipIcon text={"Edit"} icon={EditIcon} />
                    </div>
                  )}
                </div>

                <div className="bg-secondary shadow-lg rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4 text-secondary">
                    Event status
                  </h2>
                  <div
                    className={`py-1 px-2 rounded-full flex justify-center ${getStatusClass(
                      status
                    )}`}
                  >
                    <span>{status}</span>
                  </div>
                </div>

                <div className="bg-secondary shadow-lg rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4 text-secondary">
                    Seats Info
                  </h2>
                  <div className="space-y-3 text-center">
                    <p className="foreground bg-opacity-10 text-tertiary font-medium px-3 py-1 rounded-md text-base 2xl:text-lg">
                      {attendanceInfo.limit} seats in total
                    </p>
                    <p className="foreground bg-opacity-10 text-tertiary font-medium px-3 py-1 rounded-md text-base 2xl:text-lg">
                      {attendanceInfo.attend} people going to attend this event
                    </p>
                    <p className="foreground bg-opacity-10 text-tertiary font-medium px-3 py-1 rounded-md text-base 2xl:text-lg">
                      {attendanceInfo.left} seats are left
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        ""
      )}
      <Footer />
    </div>
  );
}
