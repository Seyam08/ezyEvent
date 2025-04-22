import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import defaultImage from "../../../assets/avatar.svg";

export default function SearchInput({ usersList = [], users }) {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // for passing the selected users to the parent component
  useEffect(() => {
    const usernames = selectedUsers.map((user) => user.username);
    users(usernames);
  }, [selectedUsers]);

  const filteredUsers = usersList.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      !selectedUsers.some((s) => s.id === user.id)
  );

  // for adding a new user to the list of selected users
  const selectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    // setSearch("");
  };
  //  for removing a user from the list of selected users
  const removeUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };
  // for handling image error
  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="w-full rounded-lg">
      {/* Selected Users */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center bg-primary rounded-full px-2 py-1"
          >
            <img
              src={user.avatar}
              alt={user.name}
              onError={handleImageError}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-secondary">{user.name}</span>
            <button
              onClick={() => removeUser(user.id)}
              className="ml-2 text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Type Username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-2 py-1 text-base font-medium rounded-md focus:outline-none bg-primary text-primary border-b border-transparent focus:border-[#514cfe]"
      />

      {/* Dropdown */}
      {search && (
        <ul className="absolute mt-1 w-full bg-primary rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li
                key={user.id}
                className="flex items-center p-2 cursor-pointer hover:bg-secondary"
                onClick={() => selectUser(user)}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  onError={handleImageError}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="font-semibold text-primary">{user.name}</div>
                  <div className="text-sm text-secondary">{user.username}</div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-2 text-secondary">No users found</li>
          )}
        </ul>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  users: PropTypes.func.isRequired,
};
