import { UserWall } from "@/type/wall";
import { useState } from "react";
import { PiChatCircleText, PiUsers } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Title, Button, Avatar } from "rizzui";

type ProfileHeaderProps = {
    isView?: boolean;
    userDetail: UserWall | undefined;
};

export default function ProfileHeader({
    isView,
    userDetail,
}: ProfileHeaderProps) {
    const [follow, setFollow] = useState(false);
    const navigate = useNavigate();

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
                <div className="grid grid-cols-2 pt-3 @3xl:pt-4">
                    {isView ? (
                        <Button
                            onClick={() => {
                                navigate("/profile");
                            }}
                            className="col-span-2"
                        >
                            View Profile
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                className="font-500 text-gray-900"
                            >
                                <PiChatCircleText className="h-auto w-[18px]" />
                                <span className="ms-1.5 inline-block">
                                    Message
                                </span>
                            </Button>
                            <Button
                                color="primary"
                                className="font-500 ms-3.5 text-white"
                                onClick={() => setFollow(!follow)}
                            >
                                <PiUsers className="h-auto w-[18px]" />
                                {follow ? (
                                    <span className="ms-1.5 inline-block">
                                        Following
                                    </span>
                                ) : (
                                    <span className="ms-1.5 inline-block">
                                        Follow
                                    </span>
                                )}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
