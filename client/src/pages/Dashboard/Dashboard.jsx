import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import CounterCard from "../../Components/CountCard/CounterCard";
import DataTable from "../../Components/DataTable/DataTable";
import SpeakerList from "../../Components/SpeakerList/SpeakerList";
import { useGetAllEventsQuery } from "../../features/Events/eventApi.js";
import { useGetAllUsersQuery } from "../../features/users/usersApi.js";
import { resErrorHandler } from "../../helper/commmon/resErrorHandler.js";
import { getRandomDesignation } from "../../helper/static data/getRandomDesignation.js";
import {
  CalendarCheckOutIcon,
  MicIcon,
  TaskDaily,
  UserGroupIcon,
} from "../../icons/icons";

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSpeakers, setTotalSpeakers] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalUpcomingEvents, setTotalUpcomingEvents] = useState(0);
  const { isLoading: usersLoading, error: usersError } = useGetAllUsersQuery();
  const { isLoading: eventsLoading, error: eventsError } =
    useGetAllEventsQuery();
  const { speakers, allUsers } = useSelector((state) => state.users);
  const { allEvents, upcoming } = useSelector((state) => state.events);

  // creating object for speakers list
  const speakersList =
    speakers?.slice(0, 5).map((speaker) => {
      return {
        name: speaker.name,
        designation: getRandomDesignation(),
        avatar: `${import.meta.env.VITE_SERVER_URL}/${speaker.avatar}`,
        spokenAt: speaker.eventsSpeaking.length,
      };
    }) || [];

  // creating object for events list
  const eventsList =
    allEvents?.slice(0, 7).map((event) => {
      const { _id, eventName, eventDate, status } = event;
      const shortID = _id.length > 4 ? _id.slice(-4) : _id;
      const readableDate = new Date(eventDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return {
        idNo: shortID,
        date: readableDate,
        event: eventName,
        status: status,
        eventLink: `/event/${_id}`,
      };
    }) || [];

  // handling get all users error
  useEffect(() => {
    if (usersError) {
      const extractError = resErrorHandler(usersError);
      toast.error(extractError.message);
    }
  }, [usersError]);

  // handling get all events error
  useEffect(() => {
    if (eventsError) {
      const extractError = resErrorHandler(eventsError);
      toast.error(extractError.message);
    }
  }, [eventsError]);

  // setting totalUsers and speakers number
  useEffect(() => {
    const allUsersNumber = allUsers?.length || 0;
    setTotalUsers(allUsersNumber);
    const allSpeakersNumber = speakers?.length || 0;
    setTotalSpeakers(allSpeakersNumber);
  }, [allUsers, speakers]);

  // setting totalEvents number
  useEffect(() => {
    const allEventsNumber = allEvents?.length || 0;
    setTotalEvents(allEventsNumber);
    const allUpcomingEventsNumber = upcoming?.length || 0;
    setTotalUpcomingEvents(allUpcomingEventsNumber);
  }, [allEvents, upcoming]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-3 md:gap-2 gap-1">
        <CounterCard
          limit={totalUsers}
          heading="Total user"
          link={"/dashboard/all-users"}
          icon={UserGroupIcon}
          colorClass="bg-gradient-to-b from-emerald-400 to-emerald-500 shadow-emerald-400"
        />
        <CounterCard
          limit={totalEvents}
          heading="Total event's"
          icon={TaskDaily}
          link={"/dashboard/all-events"}
          colorClass="bg-gradient-to-b from-cyan-400 to-cyan-500 shadow-cyan-400"
        />
        <CounterCard
          limit={totalSpeakers}
          heading="Total speaker"
          icon={MicIcon}
          link={"/dashboard/speakers"}
          colorClass="bg-gradient-to-b from-violet-400 to-violet-500 shadow-violet-400"
        />
        <CounterCard
          limit={totalUpcomingEvents}
          heading="Upcoming Event's"
          link={"/dashboard/upcoming-events"}
          icon={CalendarCheckOutIcon}
          colorClass="bg-gradient-to-b from-fuchsia-400 to-fuchsia-500 shadow-fuchsia-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-3 md:gap-2 gap-1">
        <SpeakerList
          list={speakersList}
          link="/dashboard/speakers"
          customClass={"mt-8"}
          loading={usersLoading}
          title={"Speakers"}
        />
        <DataTable
          dataArray={eventsList}
          title={"Recent Events"}
          customClass={"lg:col-span-2"}
          link="/dashboard/all-events"
          loading={eventsLoading}
        />
      </div>
    </div>
  );
}
