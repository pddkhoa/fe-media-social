import { Badge, Button, Title, cn } from "rizzui";
import { GroupIcon } from "@/components/ui/Icon";
import { Category } from "@/type/category";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ListMemberCard } from "./GroupCard";

type GroupGridProps = {
  data: Category;
};

const GroupGrid: FC<GroupGridProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border border-gray-200">
      <div className="flex cursor-pointer items-center justify-between gap-4 p-3 md:p-5 ">
        <div className="flex gap-2 sm:items-center md:gap-4">
          <div className="relative aspect-square w-24 h-24">
            {data?.avatar?.url ? (
              <img
                src={"https://source.unsplash.com/random/200x200/?0"}
                className="h-full w-full object-contain rounded-md"
              />
            ) : (
              <div className=" h-full bg-gradient-to-r rounded-md from-[#F8E1AF] to-[#F6CFCF] " />
            )}
          </div>
          <div className="sm:flex sm:flex-col">
            <Title as="h6" className="text-gray-900">
              {data?.name}
            </Title>
            <p className="text-gray-600 text-sm">{data?.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getBadgeStatus(data?.status)}
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500"
            )}
          >
            <GroupIcon />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-gray-200 p-5 md:flex-nowrap">
        <div className="text-gray-500">
          <Button variant="outline" className="p-1">
            <ListMemberCard />
          </Button>
        </div>
        <div className="grid w-full grid-cols-2 items-center gap-4 sm:flex sm:w-auto ">
          <Button
            size="sm"
            variant="text"
            className="rounded-none  px-0 text-xs font-medium text-primary"
            onClick={() => {
              navigate(`/group/detail/${data?._id}`);
            }}
          >
            View Detail
          </Button>
          <Button
            size="sm"
            variant="text"
            className="rounded-none border-b border-primary px-0 text-xs font-medium text-primary"
          >
            Join Groups
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupGrid;

const getBadgeStatus = (status: string) => {
  switch (status) {
    case "Publish":
      return (
        <Badge rounded="md" className="shadow" variant="outline">
          {status}
        </Badge>
      );
    case "Private":
      return (
        <Badge rounded="md" color="danger" className="shadow" variant="outline">
          {status}
        </Badge>
      );
    default:
      break;
  }
};
