export const getStatusClass = (status) => {
  switch (status) {
    case "Upcoming":
      return "bg-teal-500 bg-opacity-25 text-teal-700 dark:text-teal-200";
    case "Ongoing":
      return "bg-fuchsia-500 bg-opacity-25 text-fuchsia-700 dark:text-fuchsia-200";
    case "Completed":
      return "bg-amber-500 bg-opacity-25 text-amber-700 dark:text-amber-200";
    default:
      return "bg-blue-500 bg-opacity-25 text-blue-700 dark:text-blue-200";
  }
};
