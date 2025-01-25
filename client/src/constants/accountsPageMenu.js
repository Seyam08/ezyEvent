import {
  CalendarFavorite01Icon,
  LeftToRightListStarIcon,
  MicIcon,
  Profile,
} from "../icons/icons";

export const accountsPageMenu = [
  {
    href: "/dashboard/accounts",
    label: "My Profile",
    icon: Profile,
  },
  {
    href: "/dashboard/accounts/hosted-events",
    label: "Hosted Events",
    icon: CalendarFavorite01Icon,
  },
  {
    href: "/some",
    label: "Attended Events",
    icon: LeftToRightListStarIcon,
  },
  {
    href: "/others",
    label: "As Speaker",
    icon: MicIcon,
  },
];
