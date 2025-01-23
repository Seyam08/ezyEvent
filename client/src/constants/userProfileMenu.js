import { CalendarIcon, Dashboard, UserStarIcon } from "../icons/icons";

export const userProfileMenuItem = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Dashboard,
  },
  {
    href: "/dashboard/accounts/my-profile",
    label: "Accounts",
    icon: UserStarIcon,
  },
  {
    href: "/",
    label: "My Events",
    icon: CalendarIcon,
  },
];
