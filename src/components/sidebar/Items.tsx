import {
  ExploreIcon,
  FeedIcon,
  GroupIcon,
  MessageIcon,
  TuneIcon,
  UserIcon,
} from "../ui/Icon";

export const menuItems = [
  {
    name: "News Feed",
    href: "/",
    icon: <ExploreIcon />,
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
    href: "/message",
    icon: <MessageIcon />,
  },
];
