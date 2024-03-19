import { Button, Title, cn } from "rizzui";
import { GroupIcon } from "@/components/ui/Icon";
import { Category } from "@/type/category";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ListMemberCard } from "./GroupCard";
import { getBadgeStatus } from "@/components/ui/BadgeStatus";
import { STATUS_USER_GROUP } from "@/utils/contants";

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
                                src={
                                    "https://source.unsplash.com/random/200x200/?0"
                                }
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
                        <p className="text-gray-600 text-sm">
                            {data?.description}
                        </p>
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
                        <ListMemberCard user={data?.users} />
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
                    {data.statusUser === STATUS_USER_GROUP.UNJOIN && (
                        <Button
                            size="sm"
                            variant="text"
                            className="rounded-none border-b border-primary px-0 text-xs font-medium text-primary"
                        >
                            Join Groups
                        </Button>
                    )}
                    {data.statusUser === STATUS_USER_GROUP.JOINED && (
                        <Button
                            size="sm"
                            variant="text"
                            color="danger"
                            className="rounded-none border-b border-red-dark px-0 text-xs font-medium "
                        >
                            Leave Groups
                        </Button>
                    )}
                    {data.statusUser === STATUS_USER_GROUP.PENDING && (
                        <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                            className="rounded-none border-b  px-0 text-xs font-medium "
                        >
                            Resquesting
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupGrid;
