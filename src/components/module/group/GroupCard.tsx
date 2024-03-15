import { NoImageIcon } from "@/components/ui/Icon";
import { Category } from "@/type/category";
import { FC } from "react";
import { PiHandTap } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Badge, Button } from "rizzui";

type GroupCardProps = {
  data: Category;
};

const GroupCard: FC<GroupCardProps> = ({ data }) => {
  const getBadgeStatus = (status: string) => {
    switch (status) {
      case "Publish":
        return (
          <Badge rounded="md" className="shadow" variant="outline" size="sm">
            {status}
          </Badge>
        );
      case "Private":
        return (
          <Badge
            rounded="md"
            color="danger"
            className="shadow"
            variant="outline"
            size="sm"
          >
            {status}
          </Badge>
        );
      default:
        break;
    }
  };

  return (
    <div className="max-w-lg p-2 rounded-md shadow-md bg-gray-100">
      <div className="space-y-2">
        <div className="flex justify-between w-full p-1 mb-2">
          <div className="">{getBadgeStatus(data?.status)}</div>
          <Button variant="outline" className="p-1">
            <ListMemberCard />
          </Button>
        </div>
        <Link to={`/group/detail/${data?._id}`} className="group">
          <div className="relative space-y-2">
            {data?.avatar.url ? (
              <img
                src={data.avatar.url}
                alt=""
                className="block object-cover w-full rounded-md h-60 cursor-pointer group-hover:bg-gray-900/15"
              />
            ) : (
              <>
                <div className=" h-60 bg-gradient-to-r rounded-md from-[#F8E1AF] to-[#F6CFCF] ">
                  <NoImageIcon className="h-44 mx-auto opacity-60" />
                </div>
              </>
            )}
          </div>
          <div className="space-y-2 p-1 my-2">
            <div className="block">
              <h3 className="text-lg font-medium group-hover:text-gray-600">
                {data?.name}
              </h3>
            </div>
          </div>
          <div className="flex justify-center mx-5 my-2">
            <Button size="sm" className="w-full flex gap-3" variant="outline">
              Join Group <PiHandTap className="h-4 w-4" />
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GroupCard;

import { Avatar } from "rizzui";

export function ListMemberCard() {
  return (
    <>
      <Avatar
        customSize="25"
        name="John Doe"
        size="sm"
        src="https://randomuser.me/api/portraits/women/40.jpg"
        className="relative inline-flex  object-cover"
      />
      <Avatar
        customSize="25"
        name="John Doe"
        size="sm"
        src="https://randomuser.me/api/portraits/women/40.jpg"
        className="relative inline-flex  object-cover"
      />
      <Avatar
        customSize="25"
        name="John Doe"
        size="sm"
        src="https://randomuser.me/api/portraits/women/40.jpg"
        className="relative inline-flex  object-cover"
      />

      <div className="bordered relative ml-2 inline-flex h-[42px]  -translate-x-[5px] items-center justify-center rounded-full object-cover text-sm font-medium text-gray-900">
        +5
      </div>
    </>
  );
}
