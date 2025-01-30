import {
  CalendarCheckOutIcon,
  Dashboard,
  MicIcon,
  TaskDaily,
  UserGroupIcon,
} from "../icons/icons";

export const DashboardMenu = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Dashboard,
  },
  {
    href: "/dashboard/all-events",
    label: "Event List",
    icon: TaskDaily,
  },
  {
    href: "/dashboard/speakers",
    label: "Speakers",
    icon: MicIcon,
  },
  {
    href: "/dashboard/all-users",
    label: "All users",
    icon: UserGroupIcon,
  },
  {
    href: "/",
    label: "Upcoming Events",
    icon: CalendarCheckOutIcon,
  },
];
