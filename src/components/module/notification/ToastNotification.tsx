import { TYPE_NOTI } from "@/utils/contants";
import { FC } from "react";
import { Title } from "rizzui";

type ToastNotificationProps = {
    type: string;
    user: any;
};

const ToastNotification: FC<ToastNotificationProps> = ({ type, user }) => {
    return (
        <div className="group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2.5 pe-3 transition-colors ">
            <div className={"relative"}>
                {/* {type === TYPE_NOTI.CHAT ? (
                    <Avatar src={user[0]?.avatar?.url} name={user[0]?.name} />
                ) : (
                    <Avatar src={user?.avatar?.url} name={user?.name} />
                )} */}
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                <div className="w-full">
                    <Title as="h6" className="mb-0.5 text-sm font-semibold">
                        {type === TYPE_NOTI.CHAT ? null : user?.user.name}
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
                                Invite you to join the group{" "}
                            </p>
                        )}
                        {type === TYPE_NOTI.ACCEPT && (
                            <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                Accept you to join the group{" "}
                            </p>
                        )}
                        {type === TYPE_NOTI.ACCEPT_BLOG && (
                            <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                Approve your post in the group{" "}
                            </p>
                        )}
                        {type === TYPE_NOTI.DECLINE_BLOG && (
                            <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                Not approve your post in the group{" "}
                            </p>
                        )}
                        {type === TYPE_NOTI.CHAT && (
                            <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                Have new message
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToastNotification;
