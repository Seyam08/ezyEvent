import {
  CalendarFavorite01Icon,
  LeftToRightListStarIcon,
  MicIcon,
  Profile,
} from "../icons/icons";

export const accountsPageMenu = [
  {
    href: "/dashboard/accounts/my-profile",
    label: "My Profile",
    icon: Profile,
  },
  {
    href: "/accounts/anything",
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
