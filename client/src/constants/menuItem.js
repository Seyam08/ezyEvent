import {
  CalendarCheckOutIcon,
  Dashboard,
  MicIcon,
  TaskDaily,
  UserGroupIcon,
} from "../icons/icons";

export const menuItem = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Dashboard,
  },
  {
    href: "/",
    label: "Event List",
    icon: TaskDaily,
  },
  {
    href: "/speakers",
    label: "Speakers",
    icon: MicIcon,
  },
  {
    href: "/",
    label: "User's List",
    icon: UserGroupIcon,
  },
  {
    href: "/",
    label: "Upcoming Events",
    icon: CalendarCheckOutIcon,
  },
];
