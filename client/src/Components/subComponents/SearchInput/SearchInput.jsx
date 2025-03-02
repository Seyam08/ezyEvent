import React, { useState } from "react";

const usersList = [
  {
    id: 1,
    name: "Christina",
    description: "chris",
    img: "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  },
  {
    id: 2,
    name: "David",
    description: "david",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  },
  {
    id: 3,
    name: "Alex",
    description: "alex27",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    disabled: true,
  },
  {
    id: 4,
    name: "Samia",
    description: "samia_samia",
    img: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  },
];

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  console.log(selectedUsers);

  const filteredUsers = usersList.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      !selectedUsers.some((s) => s.id === user.id)
  );

  const selectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    // setSearch("");
  };

  const removeUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
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
              src={user.img}
              alt={user.name}
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
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-2 py-1 text-base font-medium rounded-md focus:outline-none bg-primary text-primary border-b border-transparent focus:border-[#514cfe]"
      />

      {/* Dropdown */}
      {search && (
        <ul className="absolute mt-1 w-full bg-primary rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li
                key={user.id}
                className="flex items-center p-2 cursor-pointer hover:bg-secondary"
                onClick={() => selectUser(user)}
              >
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="font-semibold text-primary">{user.name}</div>
                  <div className="text-sm text-secondary">
                    {user.description}
                  </div>
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
