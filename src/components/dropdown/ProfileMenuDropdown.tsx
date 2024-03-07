import { RootState } from "@/store/store";
import { cn } from "@/utils/class-name";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Button, Popover, Title } from "rizzui";

const menuItems = [
  {
    name: "My Profile",
    href: "/profile",
  },
  {
    name: "Account Settings",
    href: "/profile-setting",
  },
];

function DropdownMenu() {
  const userData = useSelector((state: RootState) => state.auth.userToken.user);
  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar src={userData?.avatar?.url} name={userData.name} />
        <div className="ms-3">
          <Title as="h6" className="font-semibold w-full truncate">
            {userData?.name}
          </Title>
          <p className="text-gray-600 ">@{userData?.second_name}</p>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          // onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const userData = useSelector((state: RootState) => state.auth.userToken.user);

  return (
    <Popover placement="bottom-end">
      <Popover.Trigger>
        <button
          className={cn(
            "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10",
            buttonClassName
          )}
        >
          <Avatar
            src={userData?.avatar?.url}
            name={userData?.name}
            className={cn("!h-9 w-9 sm:!h-10 sm:w-10", avatarClassName)}
          />
        </button>
      </Popover.Trigger>
      <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
        <DropdownMenu />
      </Popover.Content>
    </Popover>
  );
}
