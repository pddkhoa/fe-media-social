import { Avatar, Title } from "rizzui";
import { DotSeparator } from "./NotificationDetail";
import { FiExternalLink } from "react-icons/fi";
import { NotificationType } from "@/type/notification";
import { TYPE_NOTI } from "@/utils/contants";

type MessageBodyProps = {
    message: NotificationType | undefined;
};

export default function MessageBody({ message }: MessageBodyProps) {
    console.log(message);
    return (
        <div>
            {message && (
                <>
                    <div className="grid grid-cols-[32px_1fr] items-start gap-3 lg:gap-4 xl:grid-cols-[48px_1fr]">
                        <Avatar
                            name={message?.sender?.name || "default"}
                            src={message?.sender?.avatar?.url}
                            className="!h-8 !w-8 bg-[#70C5E0] font-medium p-white xl:!h-11 xl:!w-11"
                        />
                        <div className="-mt-1.5 lg:mt-0">
                            <div className="flex items-center justify-between">
                                <Title as="h3" className="p-sm font-medium">
                                    {message?.sender?.name}
                                </Title>
                            </div>
                            <div className="mt-1.5 items-center gap-2 p-xs p-gray-500 lg:flex">
                                <span className="flex items-center lowercase">
                                    {message?.sender?.email}{" "}
                                    <FiExternalLink className="ml-1 h-2.5 w-2.5" />
                                </span>
                                <DotSeparator className="hidden lg:block" />
                                <DotSeparator className="hidden lg:block" />
                            </div>
                        </div>
                    </div>
                    <div className="ml-10 mt-3 grid gap-2 leading-relaxed xl:ml-16 2xl:mt-4">
                        {message.type === TYPE_NOTI.LIKE && (
                            <p className="w-full line-clamp-2 pe-7 text-xs text-gray-500">
                                Like a your post:
                                <span className="font-semibold">
                                    {message.blog.title}
                                </span>
                            </p>
                        )}
                        {message.type === TYPE_NOTI.COMMENT && (
                            <>
                                <p className="w-full line-clamp-2 pe-7 text-xs text-gray-500">
                                    Comment on your post:{" "}
                                    <span className="font-semibold">
                                        {message.blog.title}
                                    </span>
                                </p>
                            </>
                        )}

                        {message.type === TYPE_NOTI.FOLLOW && (
                            <p className="w-10/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                Follow you
                            </p>
                        )}
                        {message.type === TYPE_NOTI.INVITE && (
                            <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                invite you to join the group{" "}
                                <span className="font-semibold">
                                    {message.category?.name}
                                </span>
                            </p>
                        )}
                        {message.type === TYPE_NOTI.ACCEPT && (
                            <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                accept to join the group{" "}
                                <span className="font-semibold">
                                    {message.category?.name}
                                </span>
                            </p>
                        )}
                        {message.type === TYPE_NOTI.ACCEPT_BLOG && (
                            <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                approve your post in the group{" "}
                                <span className="font-semibold">
                                    {message.category?.name}
                                </span>
                            </p>
                        )}
                        {message.type === TYPE_NOTI.DECLINE_BLOG && (
                            <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                not approve your post in the group{" "}
                                <span className="font-semibold">
                                    {message.category?.name}
                                </span>
                            </p>
                        )}
                        {message.type === TYPE_NOTI.CHAT && (
                            <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                Chat with you
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
