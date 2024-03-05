import { PiChatCircleDotsFill, PiBellSimpleRingingFill } from "react-icons/pi";
import { ActionIcon, Badge } from "rizzui";
import SearchWidget from "../search/SearchWidget";
import MessagesDropdown from "../dropdown/MessagesDropdown";
import NotificationDropdown from "../dropdown/NotificationDropdown";
import ProfileMenu from "../dropdown/ProfileMenuDropdown";

function HeaderMenuRight() {
  return (
    <div className="ml-auto grid shrink-0 grid-cols-3 items-center gap-7  text-gray-700 ">
      <MessagesDropdown>
        <ActionIcon
          aria-label="Messages"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <PiChatCircleDotsFill className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </MessagesDropdown>
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <PiBellSimpleRingingFill className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </NotificationDropdown>
      <ProfileMenu />
    </div>
  );
}

const Header = () => {
  return (
    <header
      className={
        "sticky top-0 z-50 flex items-center bg-gray-0/80 px-4 py-4 backdrop-blur-xl dark:bg-white md:px-5 lg:px-6 xl:pl-4 2xl:py-5 2xl:pl-6 3xl:px-8 3xl:pl-6 4xl:px-10 4xl:pl-9"
      }
    >
      <div className="flex w-full max-w-2xl items-center">
        <SearchWidget className="[&_.search-command]:lg:bg-gray-900 [&_.search-command]:lg:text-gray-0" />
      </div>
      <HeaderMenuRight />
    </header>
  );
};

export default Header;
