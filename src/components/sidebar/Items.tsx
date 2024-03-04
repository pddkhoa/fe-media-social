import { PiUsersFill } from "react-icons/pi";
import { BookmarkIcon, FeedIcon, MessageIcon, TuneIcon } from "../ui/Icon";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: "News Feed",
    href: "/",
    icon: <FeedIcon />,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: <TuneIcon />,
  },
  {
    name: "User",
    href: "/user",
    icon: <FeedIcon />,
  },
  {
    name: "Bookmark",
    href: "/user",
    icon: <BookmarkIcon />,
  },
  {
    name: "Group",
    href: "/user",
    icon: <PiUsersFill />,
  },
  {
    name: "Message",
    href: "/user",
    icon: <MessageIcon />,
  },
];
