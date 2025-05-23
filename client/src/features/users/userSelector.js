import { createSelector } from "reselect";

const allUsers = (state) => state.users.allUsers;

export const allUserSelector = allUsers;

export const speakersSelector = createSelector(allUsers, (users) =>
  users?.filter((user) => user.role.includes("speaker"))
);

export const hostsSelector = createSelector(allUsers, (users) =>
  users?.filter((user) => user.role.includes("host"))
);
