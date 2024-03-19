import { PiChartDonutFill } from "react-icons/pi";
import {
  ContactsIcon,
  FeedIcon,
  GroupIcon,
  MessageIcon,
  TVIcon,
  TuneIcon,
  UserIcon,
} from "../ui/Icon";

export const menuItems = [
  {
    name: "News Feed",
    href: "/",
    icon: <TVIcon />,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: <FeedIcon />,
  },
  {
    name: "User",
    href: "/user",
    icon: <UserIcon />,
  },
  {
    name: "Bookmark",
    href: "/bookmark",
    icon: <TuneIcon />,
  },
  {
    name: "Group",
    href: "/group",
    icon: <GroupIcon />,
    dropdownItems: [
      {
        name: "All Groups",
        href: "/group",
      },
      {
        name: "My Groups",
        href: "/group/my",
      },
    ],
  },
  {
    name: "Message",
    href: "/messenger",
    icon: <MessageIcon />,
  },
  {
    name: "Contacts",
    href: "/contacts",
    icon: <ContactsIcon />,
  },
];

export const menuItemsAdmin: any = [
  {
    name: "Analytics",
    href: "/",
    icon: <PiChartDonutFill />,
  },
];
