import { PiMagnifyingGlassBold } from "react-icons/pi";
import { Avatar, Badge, Input } from "rizzui";

const ListChat = () => {
  return (
    <div className="absolute  h-[calc(100%-85px)] w-[20%] mx-2  border-r   overflow-auto flex flex-col gap-5 p-2">
      <Input
        variant="flat"
        placeholder="Search here"
        className=""
        prefix={
          <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
        }
      />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
      <RowUserListChat />
    </div>
  );
};

const RowUserListChat = () => {
  return (
    <div className="flex gap-3 hover:bg-gray-200 p-1 rounded-md cursor-pointer">
      <div className="relative inline-flex">
        <Avatar
          size="md"
          name="John Doe"
          src="https://randomuser.me/api/portraits/women/40.jpg"
        />
        <Badge
          renderAsDot
          color="success"
          enableOutlineRing
          size="md"
          className="absolute right-0 bottom-0 -translate-y-[25%]"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold">Bernard Langley</span>
        <span className="text-[12px] text-gray-500">See you tomorrow</span>
      </div>
    </div>
  );
};

export default ListChat;
