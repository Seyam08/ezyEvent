import PropTypes from "prop-types";
import defaultImage from "../../assets/avatar.png";

export default function AllUsersTable({ users }) {
  const getRoleClass = (role) => {
    switch (role) {
      case "host":
        return "bg-teal-500 bg-opacity-25 text-teal-700 dark:text-teal-200";
      case "speaker":
        return "bg-fuchsia-500 bg-opacity-25 text-fuchsia-700 dark:text-fuchsia-200";
      case "user":
        return "bg-amber-500 bg-opacity-25 text-amber-700 dark:text-amber-200";
      default:
        return "bg-blue-500 bg-opacity-25 text-blue-700 dark:text-blue-200";
    }
  };

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="bg-secondary shadow rounded-lg p-6">
      <div className="flex flex-row items-center justify-between pb-4">
        <h1 className="text-heading-size font-semibold mb-4 md:mb-0 text-primary">
          All users ({users.length})
        </h1>
        <input
          type="text"
          placeholder="Search"
          className="border-none rounded-lg p-2 text-sm w-48 md:w-auto bg-tertiary text-tertiary focus:outline-none focus:bg-primary placeholder:text-secondary"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded-lg font-medium text-sm ${getRoleClass()}`}
        >
          View all
        </button>
        <button
          className={`px-3 py-1 rounded-lg font-medium text-sm ${getRoleClass(
            "host"
          )}`}
        >
          Host
        </button>
        <button
          className={`px-3 py-1 rounded-lg font-medium text-sm ${getRoleClass(
            "speaker"
          )}`}
        >
          Speaker
        </button>
        <button
          className={`px-3 py-1 rounded-lg font-medium text-sm ${getRoleClass(
            "user"
          )}`}
        >
          User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-tertiary rounded-md text-left">
              <th className="px-2 py-2 text-secondary text-desc-size">
                Avatar
              </th>
              <th className="px-2 py-2 text-secondary text-desc-size">Name</th>
              <th className="px-2 py-2 text-secondary text-desc-size">Role</th>
              <th className="px-2 py-2 text-secondary text-desc-size">
                Attended
              </th>
              <th className="px-2 py-2 text-secondary text-desc-size">
                Spoken
              </th>
              <th className="px-2 py-2 text-secondary text-desc-size">
                Hosted
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const {
                avatar,
                name,
                role,
                username,
                eventsAttended,
                eventsHosted,
                eventsSpeaking,
              } = user;
              const image = `${import.meta.env.VITE_SERVER_URL}/${avatar}`;

              return (
                <tr
                  key={index}
                  className="border-b border-gray-300 dark:border-gray-700 pb-4 last:border-b-0"
                >
                  <td className="px-2 py-2">
                    <div className="w-8 h-8">
                      <img
                        src={image}
                        alt={`${name}'s avatar`}
                        onError={handleImageError}
                        className="p-1 rounded-full ring-1 ring-[#514cfe] h-full w-full"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <div>
                      <p className="font-semibold text-primary text-subHeading-size">
                        {name}
                      </p>
                      <p className="text-desc-size text-tertiary">{username}</p>
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    {role.map((role, index) => {
                      return (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-lg text-desc-size mx-1 ${getRoleClass(
                            role
                          )}`}
                        >
                          {role}
                        </span>
                      );
                    })}
                  </td>
                  <td className="px-2 py-2 text-heading-size text-secondary">
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-lg text-desc-size ${getRoleClass(
                        "user"
                      )}`}
                    >
                      {eventsAttended.length}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-heading-size text-secondary">
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-lg text-desc-size ${getRoleClass(
                        "speaker"
                      )}`}
                    >
                      {eventsSpeaking.length}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-heading-size text-secondary">
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-lg text-desc-size ${getRoleClass(
                        "host"
                      )}`}
                    >
                      {eventsHosted.length}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

AllUsersTable.propTypes = {
  users: PropTypes.array.isRequired,
};
