import { Post } from "@/type/post";
import {
    PiBookmarkSimple,
    PiBookmarkSimpleFill,
    PiChatCentered,
    PiDotsThreeOutlineFill,
    PiFireFill,
    PiFireLight,
    PiShareNetwork,
} from "react-icons/pi";
import { ActionIcon, Avatar, Modal, Popover } from "rizzui";
import PostsModal from "./PostModal";
import { useState } from "react";
import DropdownAuthor from "./DropdownAuthor";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DropdownOther from "./DropdownOther";
import ModalPrivate from "../../modal/ModalPrivate";
import { formatDate } from "@/utils/format-date";
import ModalDraft from "./ModalDraft";
import { Link, useNavigate } from "react-router-dom";

type POST_TYPE = "image" | "gallery" | "video";

type PostCard = {
    type?: POST_TYPE;
    onClick?: () => void;
    data: Post;
    setIsDelete?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    actionDispatchLike?: {
        payload: any;
        type: any;
    };
    actionDispatchSave?: {
        payload: any;
        type: any;
    };

    handleCommentPost?: (data: {
        blogId: string;
        replyToCommentId: string | null;
        content: string;
    }) => Promise<void>;
};

export default function PostCard({
    data,
    setIsDelete,
    actionDispatchLike,
    actionDispatchSave,
    handleCommentPost,
}: PostCard) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const isAuthor = useSelector(
        (state: RootState) => state.auth.userToken.user._id
    );

    return (
        <>
            <div className="flex flex-col max-w-xl p-6 space-y-6 overflow-hidden rounded-md shadow bg-gray-100">
                <div className="flex justify-between">
                    {data.category ? (
                        <div
                            onClick={() => {
                                navigate(`/group/detail/${data.category._id}`);
                            }}
                            className="relative inline-flex gap-5 w-[80%] cursor-pointer group "
                        >
                            {data?.category?.avatar?.url ? (
                                <img
                                    src={data?.category?.avatar?.url}
                                    className="object-cover h-12 w-12 rounded-lg group-hover:brightness-95"
                                />
                            ) : (
                                <div className="bg-gradient-to-r h-12 w-12 rounded-lg from-[#F8E1AF] to-[#F6CFCF] bg-opacity-30 group-hover:brightness-95" />
                            )}
                            <p className="font-semibold mt-1 group-hover:text-gray-800">
                                {data?.category?.name}
                            </p>
                            <div className="absolute top-8 left-8 -translate-y-[25%]">
                                <Link
                                    className="flex gap-2 items-center"
                                    to={`/profile/${data?.user?._id}`}
                                >
                                    <Avatar
                                        name={data?.user?.name}
                                        src={data?.user?.avatar?.url}
                                        customSize={30}
                                        className="object-cover w-12 h-12 rounded-full shadow"
                                    />
                                    <div className="flex flex-col mt-2">
                                        <div className="text-xs font-semibold">
                                            {data?.user?.name}
                                        </div>
                                        <span className="text-[10px] text-gray-400 pointer-events-none">
                                            {formatDate(data?.createdAt as any)}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="relative inline-flex gap-5 w-[80%]">
                            <Link
                                className="flex gap-2 items-center"
                                to={`/profile/${data?.user?._id}`}
                            >
                                <Avatar
                                    name={data?.user?.name}
                                    src={data?.user?.avatar?.url}
                                    size="md"
                                    className="object-cover w-12 h-12 rounded-full shadow"
                                />
                                <div className="flex flex-col mt-2">
                                    <div className="text-sm font-semibold">
                                        {data?.user?.name}
                                    </div>
                                    <span className="text-[10px] text-gray-400 pointer-events-none">
                                        {formatDate(data?.createdAt as any)}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    )}
                    <div>
                        <Popover placement="bottom-start">
                            <Popover.Trigger>
                                <ActionIcon variant="text">
                                    <PiDotsThreeOutlineFill />
                                </ActionIcon>
                            </Popover.Trigger>
                            <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                                {isAuthor === data?.user?._id && setIsDelete ? (
                                    <DropdownAuthor
                                        data={data}
                                        setIsDelete={setIsDelete}
                                    />
                                ) : (
                                    <DropdownOther data={data} />
                                )}
                            </Popover.Content>
                        </Popover>
                    </div>
                </div>
                <div
                    onClick={() => {
                        setOpen(true);
                    }}
                    className="group  relative aspect-square h-full w-full cursor-pointer overflow-hidden bg-gray-100"
                >
                    {!data?.avatar ? (
                        <div className=" h-full bg-gradient-to-r rounded-md from-[#F8E1AF] to-[#F6CFCF] "></div>
                    ) : (
                        <img
                            alt={"Post"}
                            src={data?.avatar}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    )}
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="space-x-2 flex gap-2 items-center">
                        <PiShareNetwork className="w-5 h-5" />
                        {data?.isSave ? (
                            <PiBookmarkSimpleFill className="w-5 h-5" />
                        ) : (
                            <PiBookmarkSimple className="w-5 h-5" />
                        )}
                    </div>
                    <div className="flex space-x-2 text-sm ">
                        <div className="flex items-center p-1 space-x-1.5">
                            <PiChatCentered className="h-5 w-5" />
                            <span>{data?.sumComment}</span>
                        </div>
                        <div className="flex items-center p-1 space-x-1.5">
                            {data?.isLiked ? (
                                <PiFireFill className="h-5 w-5" />
                            ) : (
                                <PiFireLight className="h-5 w-5" />
                            )}
                            <span>{data?.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                className="[&>div]:p-0 lg:[&>div]:p-4"
                overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
                containerClassName="dark:bg-gray-100 max-w-7xl max-h-[650px] w-full h-full relative"
            >
                {data &&
                    (data?.isPermission &&
                    actionDispatchLike &&
                    actionDispatchSave &&
                    handleCommentPost ? (
                        <PostsModal
                            data={data}
                            actionDispatchLike={actionDispatchLike}
                            onClose={() => setOpen(false)}
                            actionDispatchSave={actionDispatchSave}
                            handleCommentPost={handleCommentPost}
                        />
                    ) : data.status === "Draft" ? (
                        <ModalDraft onClose={() => setOpen(false)} />
                    ) : (
                        <ModalPrivate onClose={() => setOpen(false)} />
                    ))}
            </Modal>
        </>
    );
}
