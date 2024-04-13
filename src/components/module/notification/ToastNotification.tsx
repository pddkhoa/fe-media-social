import { TYPE_NOTI } from "@/utils/contants";
import { FC } from "react";
import { Avatar, Title } from "rizzui";

type ToastNotificationProps = {
    type: string;
    user: any;
};

const ToastNotification: FC<ToastNotificationProps> = ({ type, user }) => {
    return (
        <div className="group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2.5 pe-3 transition-colors ">
            <div className={"relative"}>
                <Avatar src={user?.user?.avatar?.url} name={user?.user?.name} />
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                <div className="w-full">
                    <Title as="h6" className="mb-0.5 text-sm font-semibold">
                        {user?.user?.name}
                    </Title>
                    <div className="flex">
                        {type === TYPE_NOTI.LIKE && (
                            <p className="w-10/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                Like a your post
                            </p>
                        )}
                        {type === TYPE_NOTI.COMMENT && (
                            <p className="w-10/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                Comment on your post
                            </p>
                        )}

                        {type === TYPE_NOTI.FOLLOW && (
                            <p className="w-10/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                Follow you
                            </p>
                        )}
                        {type === TYPE_NOTI.INVITE && (
                            <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                invite you to join the group{" "}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToastNotification;
