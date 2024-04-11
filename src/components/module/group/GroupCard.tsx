/* eslint-disable no-dupe-else-if */
import FollowerModal from "@/components/module/group/FollowModal";
import { getBadgeStatus } from "@/components/ui/BadgeStatus";
import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import CategoriesServices from "@/services/categories";
import {
    cancelPendingCategories,
    joinCategories,
    leaveCategories,
    pendingCategories,
} from "@/store/categorySlice";
import { RootState } from "@/store/store";
import { Category } from "@/type/category";
import { User } from "@/type/user";
import { STATUS_USER_GROUP } from "@/utils/contants";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { PiDotsThreeOutline, PiHandTap, PiSignIn } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "rizzui";

type GroupCardProps = {
    data: Category;
    setIsActive?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

const GroupCard: FC<GroupCardProps> = ({ data, setIsActive }) => {
    const { openModal } = useModal();
    const [loadingJoin, setLoadingJoin] = useState(false);
    const isAdmin = useSelector(
        (state: RootState) => state.auth.userToken.user._id
    );
    const navigate = useNavigate();
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
        <div className="max-w-lg p-2 rounded-md shadow-md bg-gray-100">
            <div className="space-y-2">
                <div className="flex justify-between w-full p-1 mb-2">
                    <div className="">{getBadgeStatus(data?.status)}</div>
                    <Button
                        onClick={() => {
                            openModal({
                                view: <FollowerModal data={data?.users} />,
                            });
                        }}
                        variant="outline"
                        className="p-1"
                    >
                        <ListMemberCard user={data?.users} />
                    </Button>
                </div>
                <Link to={`/group/detail/${data?._id}`} className="group">
                    <div className="relative space-y-2">
                        {data?.avatar?.url ? (
                            <img
                                src={data.avatar.url}
                                alt=""
                                className="block object-cover w-full rounded-md h-60 cursor-pointer group-hover:bg-gray-900/15"
                            />
                        ) : (
                            <>
                                <div className=" h-60 bg-gradient-to-r rounded-md from-[#F8E1AF] to-[#F6CFCF] "></div>
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
                </Link>
                <div className="flex justify-center mx-5 my-2">
                    {data?.statusUser === STATUS_USER_GROUP.UNJOIN && (
                        <Button
                            size="sm"
                            className="w-full flex gap-3"
                            variant="outline"
                            isLoading={loadingJoin}
                            onClick={() => handleJoinCate(data?._id)}
                        >
                            Join Group <PiHandTap className="h-4 w-4" />
                        </Button>
                    )}
                    {data?.statusUser === STATUS_USER_GROUP.JOINED &&
                        (isAdmin !== data?.isAdmin ? (
                            <Button
                                size="sm"
                                className="w-full flex gap-3"
                                variant="outline"
                                color="danger"
                                isLoading={loadingJoin}
                                onClick={() => handleLeaveCate(data?._id)}
                            >
                                Leave Group <PiSignIn className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                className="w-full flex gap-3"
                                variant="outline"
                                isLoading={loadingJoin}
                                onClick={() =>
                                    navigate(`/group/detail/${data?._id}`)
                                }
                            >
                                View Detail <PiSignIn className="h-4 w-4" />
                            </Button>
                        ))}
                    {data?.statusUser === STATUS_USER_GROUP.PENDING && (
                        <Button
                            size="sm"
                            className="w-full flex gap-3"
                            variant="flat"
                            color="danger"
                            isLoading={loadingJoin}
                            onClick={() => {
                                handleLeaveCate(data?._id);
                            }}
                        >
                            Resquesting{" "}
                            <PiDotsThreeOutline className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupCard;

import { Avatar } from "rizzui";

type ListMemberCardProps = {
    user: User[];
};

export const ListMemberCard: FC<ListMemberCardProps> = ({ user }) => {
    const firstThreeUsers = user?.slice(0, 3);

    return (
        <>
            {firstThreeUsers && user.length > 0
                ? firstThreeUsers.map((item) => (
                      <Avatar
                          key={item._id}
                          customSize="25"
                          name={item.name}
                          size="sm"
                          src={item.avatar.url}
                          className="relative inline-flex  object-cover"
                      />
                  ))
                : null}

            <div className=" relative ml-2 inline-flex h-[42px]  -translate-x-[5px] items-center justify-center rounded-full object-cover text-sm font-medium text-gray-900">
                {user?.length - 3 > 0 ? "+" + (user?.length - 3) : null}
            </div>
        </>
    );
};
