import UserServices from "@/services/user";
import { RootState } from "@/store/store";
import { UserWall } from "@/type/wall";
import { useState } from "react";
import toast from "react-hot-toast";
import {
    PiChatCircleText,
    PiDotsThreeOutlineFill,
    PiUsers,
} from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Title, Button, Avatar, Popover } from "rizzui";
import DropdownOption from "./DropdownOption";
import useAuth from "@/hooks/useAuth";
import { Socket } from "socket.io-client";
import { TYPE_NOTI } from "@/utils/contants";
import ChatServices from "@/services/chat";
import { startChatMessagesSuccess } from "@/store/chatSlice";

type ProfileHeaderProps = {
    isView?: boolean;
    userDetail?: UserWall | undefined;
    socket?: Socket | undefined;
    setIsFollow?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

export default function ProfileHeader({
    isView,
    userDetail,
    socket,
    setIsFollow,
}: ProfileHeaderProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(
        (state: RootState) => state.auth.userToken.user._id
    );
    const [loading, setLoading] = useState(false);
    const { axiosJWT, user } = useAuth();

    const handleFollow = async (id: string | undefined) => {
        if (id && setIsFollow) {
            setLoading(true);
            const { body } = await UserServices.followUser(id, axiosJWT);
            if (body?.success) {
                if (userDetail?.isfollow === false) {
                    socket?.emit("interaction", {
                        fromUser: user.user._id,
                        toUser: userDetail?._id,
                        type: TYPE_NOTI.FOLLOW,
                        data: user,
                    });
                }
                setIsFollow(true);
                toast.success(body.message);
                setLoading(false);
            } else {
                toast.error(body?.message || "Error");
                setLoading(false);
            }
        }
    };

    const handleSingleChat = async (userId: string) => {
        const { body } = await ChatServices.singleChat(
            { userId: userId },
            axiosJWT
        );
        if (body?.success) {
            dispatch(startChatMessagesSuccess(body.result));
            navigate("/messenger");
        } else {
            toast.error(body?.message || "Error");
        }
    };

    return (
        <div className="relative -mt-2">
            <div className="-mx-6 h-[200px] bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF] " />

            <div className="mx-auto w-full max-w-[1294px] @container  sm:flex sm:justify-between">
                <div className="flex h-auto gap-4 @5xl:gap-6">
                    <div>
                        <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-4 border-white bg-white  @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] md:border-[6px] 3xl:w-[200px]">
                            {userDetail && (
                                <Avatar
                                    name={userDetail?.name}
                                    src={userDetail?.avatar?.url}
                                    customSize={100}
                                    className="aspect-auto h-full w-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                    <div className="pt-2.5">
                        <Title
                            as="h1"
                            className="text-lg font-bold capitalize leading-normal text-gray-900 @3xl:!text-xl 3xl:text-2xl"
                        >
                            {userDetail?.name}
                        </Title>
                        <p className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base">
                            {userDetail?.email}
                        </p>
                        <p className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base"></p>
                        <ul className="mt-3 flex flex-wrap items-center gap-2 text-sm @3xl:mt-4 @3xl:gap-5 @3xl:text-base 3xl:text-lg">
                            <li className="flex items-center">
                                <span className="font-semibold text-gray-900">
                                    {userDetail?.totalBlog}
                                </span>
                                <span className="ms-1.5 text-sm text-gray-500">
                                    Blogs
                                </span>
                            </li>
                            <li className="flex items-center">
                                <span className="font-semibold text-gray-900">
                                    {userDetail?.totalFollower}
                                </span>
                                <span className="ms-1.5 text-sm text-gray-500">
                                    Followers
                                </span>
                            </li>
                            <li className="flex items-center">
                                <span className="font-semibold text-gray-900">
                                    {userDetail?.totalFollowing}
                                </span>
                                <span className="ms-1.5 text-sm text-gray-500">
                                    Following
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-3 pt-3 ">
                    {isView ? (
                        <Button
                            onClick={() => {
                                navigate("/profile");
                            }}
                            size="sm"
                            className="col-span-2"
                        >
                            View Profile
                        </Button>
                    ) : (
                        <>
                            {isAuth !== userDetail?._id && userDetail && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            handleSingleChat(userDetail?._id);
                                        }}
                                        className={`font-500 text-gray-900  ${
                                            isAuth !== userDetail?._id
                                                ? "col-span-2"
                                                : "col-span-4"
                                        }`}
                                    >
                                        <PiChatCircleText className="h-auto w-[18px]" />
                                        <span className="ms-1.5 inline-block">
                                            Message
                                        </span>
                                    </Button>
                                    <Button
                                        color="primary"
                                        size="sm"
                                        className="font-500 ms-3.5 text-white col-span-2"
                                        isLoading={loading}
                                        disabled={loading}
                                        onClick={() =>
                                            handleFollow(userDetail?._id)
                                        }
                                    >
                                        <PiUsers className="h-auto w-[18px]" />
                                        {userDetail.isfollow ? (
                                            <span className="ms-1.5 inline-block">
                                                Unfollow
                                            </span>
                                        ) : (
                                            <span className="ms-1.5 inline-block">
                                                Follow
                                            </span>
                                        )}
                                    </Button>

                                    <Popover placement="bottom-start">
                                        <Popover.Trigger>
                                            <Button
                                                variant="outline"
                                                className="col-span-2 mx-4"
                                                size="sm"
                                            >
                                                <PiDotsThreeOutlineFill />
                                            </Button>
                                        </Popover.Trigger>
                                        <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                                            <DropdownOption data={userDetail} />
                                        </Popover.Content>
                                    </Popover>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
