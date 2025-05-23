import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allEventSelector,
  completedSelector,
  ongoingSelector,
  upcomingSelector,
} from "../../features/Events/eventSelector";
import { eventFilterStatus } from "../../features/filters/eventFilterSlice";
import { getStatusClass } from "../../helper/enentsTable/getColorClass";
import SearchBox from "../subComponents/SearchBox/SearchBox";

export default function AllEventsTable({ filter = true }) {
  const [searchEventArray, setSearchEventArray] = useState([]);
  const dispatch = useDispatch();
  const { eventStatus } = useSelector((state) => state.eventFilter);

  const events = useSelector((state) => {
    switch (eventStatus) {
      case "All":
        return allEventSelector(state);
      case "Upcoming":
        return upcomingSelector(state);
      case "Ongoing":
        return ongoingSelector(state);
      case "Completed":
        return completedSelector(state);
      default:
        return state.events.allEvents;
    }
  });

  const filterEvents = (status) => {
    dispatch(eventFilterStatus(status));
  };

  useEffect(() => {
    if (events) {
      const eventArray = events.map((item) => {
        const { _id, eventName, eventDate } = item;
        const shortID = _id.length > 4 ? _id.slice(-4) : _id;
        const readableDate = new Date(eventDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return {
          id: shortID,
          name: eventName,
          desc: readableDate,
          avatar: null,
          link: `/event/${_id}`,
        };
      });

      setSearchEventArray(eventArray);
    }
  }, []);

  return (
    <div className="bg-secondary shadow rounded-lg p-6">
      <div className="flex flex-row items-center justify-between pb-4">
        <h1 className="text-heading-size font-semibold mb-4 md:mb-0 text-primary">
          All Event's ({events.length})
        </h1>
        {/* <input
          type="text"
          placeholder="Search"
          className="border-none rounded-lg p-2 text-sm w-48 md:w-auto bg-tertiary text-tertiary focus:outline-none focus:bg-primary placeholder:text-secondary"
        /> */}
        <div>
          <SearchBox arrayOfObject={searchEventArray} />
        </div>
      </div>

      {filter ? (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded-lg font-medium text-sm ${getStatusClass()}`}
            onClick={() => filterEvents("View all")}
          >
            View all
          </button>
          <button
            className={`px-3 py-1 rounded-lg font-medium text-sm ${getStatusClass(
              "Upcoming"
            )}`}
            onClick={() => filterEvents("Upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-3 py-1 rounded-lg font-medium text-sm ${getStatusClass(
              "Ongoing"
            )}`}
            onClick={() => filterEvents("Ongoing")}
          >
            Ongoing
          </button>
          <button
            className={`px-3 py-1 rounded-lg font-medium text-sm ${getStatusClass(
              "Completed"
            )}`}
            onClick={() => filterEvents("Completed")}
          >
            Completed
          </button>
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-tertiary rounded-md text-left">
              <th className="px-2 py-2 text-secondary text-desc-size">ID</th>
              <th className="px-2 py-2 text-secondary text-desc-size">Event</th>
              <th className="px-2 py-2 text-secondary text-desc-size">
                Status
              </th>
              <th className="px-2 py-2 text-secondary text-desc-size">
                Total Seat
              </th>
              <th className="px-2 py-2 text-secondary text-desc-size">
                Seats Left
              </th>
              <th className="px-2 py-2 text-secondary text-desc-size">Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => {
              const {
                _id,
                eventName,
                eventDate,
                attendanceLimit,
                status,
                hostId,
                speakerId,
                attendeesId,
              } = event;
              //   const image = `${import.meta.env.VITE_SERVER_URL}/${avatar}`;
              const shortID = _id.length > 4 ? _id.slice(-4) : _id;
              const readableDate = new Date(eventDate).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              );
              // Calculate attendance information
              const limit = attendanceLimit;
              const attend = attendeesId.length;
              const seatLeft = limit - attend > 0 ? limit - attend : "full";
              return (
                <tr
                  key={index}
                  className="border-b border-gray-300 dark:border-gray-700 pb-4 last:border-b-0"
                >
                  <td className="px-2 py-2">
                    <h3 className="font-semibold text-primary text-desc-size">
                      {shortID}
                    </h3>
                  </td>
                  <td className="px-2 py-2">
                    <div>
                      <p className="font-semibold text-glow text-base 2xl:text-lg">
                        <Link target="blank" to={`/event/${_id}`}>
                          {eventName}
                        </Link>
                      </p>
                      <p className="text-desc-size text-tertiary">
                        Hosted by {"- "}
                        {hostId.map((host, index) => (
                          <Link
                            key={index}
                            target="blank"
                            to={`/users/${host?.username}`}
                            className="text-cyan-700 font-medium text-sm 2xl:text-base"
                          >
                            {host?.username}
                            {index < hostId.length - 1 ? (
                              <span className="text-white">{", "}</span>
                            ) : (
                              ""
                            )}
                          </Link>
                        ))}
                      </p>
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-lg text-desc-size mx-1 ${getStatusClass(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-secondary">
                    {attendanceLimit}
                  </td>
                  <td className="px-2 py-2 text-secondary">{seatLeft}</td>
                  <td className="px-2 py-2 text-secondary">{readableDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

AllEventsTable.propTypes = {
  filter: PropTypes.bool,
};
