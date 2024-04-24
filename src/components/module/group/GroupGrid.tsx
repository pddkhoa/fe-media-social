import { Button, Title, cn } from "rizzui";
import { GroupIcon } from "@/components/ui/Icon";
import { Category } from "@/type/category";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListMemberCard } from "./GroupCard";
import { getBadgeStatus } from "@/components/ui/BadgeStatus";
import { STATUS_USER_GROUP } from "@/utils/contants";
import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import CategoriesServices from "@/services/categories";
import {
    pendingCategories,
    joinCategories,
    cancelPendingCategories,
    leaveCategories,
} from "@/store/categorySlice";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import FollowerModal from "./FollowModal";

type GroupGridProps = {
    data: Category;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

const GroupGrid: FC<GroupGridProps> = ({ data, setIsActive }) => {
    const navigate = useNavigate();

    const { openModal } = useModal();
    const [loadingJoin, setLoadingJoin] = useState(false);
    const isAdmin = useSelector(
        (state: RootState) => state.auth.userToken.user._id
    );
    const dispatch = useDispatch();
    const { axiosJWT } = useAuth();

    const handleJoinCate = async (id: string) => {
        try {
            setLoadingJoin(true);
            const { body } = await CategoriesServices.joinCategories(
                id,
                axiosJWT
            );
            if (body?.success) {
                toast.success(body?.message);
                if (data.status === "Private") {
                    dispatch(pendingCategories(id));
                } else dispatch(joinCategories(id));
                setLoadingJoin(false);
            } else {
                toast.error(body?.message || "Error");
                setLoadingJoin(false);
            }
        } catch (error) {
            console.log(error);
            setLoadingJoin(false);
        }
    };

    const handleLeaveCate = async (id: string) => {
        try {
            setLoadingJoin(true);
            const { body } = await CategoriesServices.leaveCategories(
                id,
                axiosJWT
            );
            if (body?.success) {
                toast.success(body.message);
                if (data?.status === "Private") {
                    dispatch(cancelPendingCategories(id));
                } else dispatch(leaveCategories(id));
                setLoadingJoin(false);
                if (setIsActive) setIsActive(true);
            } else {
                toast.error(body?.message || "Error");
                setLoadingJoin(false);
            }
        } catch (error) {
            console.log(error);
            setLoadingJoin(false);
        }
    };

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
                    <Button
                        variant="outline"
                        className="p-1"
                        onClick={() => {
                            openModal({
                                view: <FollowerModal data={data?.users} />,
                            });
                        }}
                    >
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
                            isLoading={loadingJoin}
                            onClick={() => handleJoinCate(data?._id)}
                        >
                            Join Groups
                        </Button>
                    )}
                    {data.statusUser === STATUS_USER_GROUP.JOINED &&
                        (isAdmin !== data?.isAdmin ? (
                            <Button
                                size="sm"
                                variant="text"
                                color="danger"
                                className="rounded-none border-b border-red-dark px-0 text-xs font-medium "
                                isLoading={loadingJoin}
                                onClick={() => handleLeaveCate(data?._id)}
                            >
                                Leave Group
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                className="rounded-none border-b border-black px-0 text-xs font-medium"
                                variant="outline"
                                isLoading={loadingJoin}
                                onClick={() =>
                                    navigate(`/group/detail/${data?._id}`)
                                }
                            >
                                View Detail
                            </Button>
                        ))}

                    {data.statusUser === STATUS_USER_GROUP.PENDING && (
                        <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                            className="rounded-none border-b  px-0 text-xs font-medium "
                            isLoading={loadingJoin}
                            onClick={() => {
                                handleLeaveCate(data?._id);
                            }}
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
