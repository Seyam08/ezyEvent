import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import defaultImage from "../../../assets/avatar.svg";

export default function SearchInput({ usersList = [], users, existedUsers }) {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // for passing the selected users to the parent component
  useEffect(() => {
    const usernames = selectedUsers.map((user) => user.username);
    users(usernames);
  }, [selectedUsers]);

  // for adding existedUsers in the list

  useEffect(() => {
    if (existedUsers) {
      setSelectedUsers([...selectedUsers, ...existedUsers]);
    }
  }, [existedUsers]);

  const filteredUsers = usersList.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      !selectedUsers.some((s) => s.username === user.username)
  );

  // for adding a new user to the list of selected users
  const selectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    // setSearch("");
  };
  //  for removing a user from the list of selected users
  const removeUser = (username) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user.username !== username)
    );
  };
  // for handling image error
  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="w-full rounded-lg">
      {/* Selected Users */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedUsers.map((user, index) => (
          <div
            key={index}
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
              onClick={() => removeUser(user.username)}
              className="ml-2 text-red-500 text-lg leading-none bg-tertiary px-1 rounded-full"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Type Username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-2 py-1 text-base font-medium rounded-md focus:outline-none bg-primary text-primary border-b border-transparent focus:border-[#514cfe]"
        />

        {/* Clear search input Button */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-lg leading-none bg-tertiary px-1 rounded-full"
          >
            &times;
          </button>
        )}
      </div>
      {/* Dropdown */}
      {search && (
        <ul className="absolute mt-1 w-full bg-primary rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <li
                key={index}
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
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  users: PropTypes.func.isRequired,
  existedUsers: PropTypes.array,
};
