import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function SpeakerList({ list, link, customClass }) {
  return (
    <div
      className={`px-5 py-5 bg-secondary rounded-lg w-full mx-auto max-h-max ${customClass}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-primary">
          Event Speaker List
        </h2>
        <Link
          to={link}
          className="text-secondary font-medium text-base bg-tertiary rounded-full px-4 py-1 hover:foreground hover:text-[#EDEDED] transition"
        >
          View All
        </Link>
      </div>
      <ul className="space-y-4">
        {list.map((speaker, id) => (
          <li
            key={id}
            className="flex items-center space-x-4 border-b border-gray-300 dark:border-gray-700 pb-4 last:border-b-0 "
          >
            <div className="w-12 h-12 cursor-pointer">
              <img
                src={speaker.avatar}
                alt={speaker.name}
                className="p-1 rounded-full ring-1 ring-[#8C5BFE] h-full w-full"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-secondary">
                {speaker.name}
              </h3>
              <p className="text-xs text-tertiary">{speaker.designation}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-tertiary">Upcoming Event</p>
              <p className="text-sm text-secondary font-medium">
                {speaker.upcomingEvent}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
SpeakerList.propTypes = {
  list: PropTypes.array.isRequired,
  link: PropTypes.string.isRequired,
  customClass: PropTypes.string,
};
