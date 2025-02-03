import { CalendarIcon, Dashboard, UserStarIcon } from "../icons/icons";

export const userProfileMenuItem = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Dashboard,
  },
  {
    href: "/dashboard/accounts",
    label: "Accounts",
    icon: UserStarIcon,
  },
  {
    href: "/dashboard/accounts/hosted-events",
    label: "My Events",
    icon: CalendarIcon,
  },
];
