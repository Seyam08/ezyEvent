import { createSelector } from "reselect";

const allEvents = (state) => state.events.allEvents;

export const allEventSelector = allEvents;

export const upcomingSelector = createSelector(allEventSelector, (events) =>
  events?.filter((event) => event.status === "Upcoming")
);
export const ongoingSelector = createSelector(allEventSelector, (events) =>
  events?.filter((event) => event.status === "Ongoing")
);
export const completedSelector = createSelector(allEventSelector, (events) =>
  events?.filter((event) => event.status === "Completed")
);
