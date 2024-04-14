import useAuth from "@/hooks/useAuth";
import UserServices from "@/services/user";
import {
    endLoadingPage,
    readNotification,
    startLoadingPage,
} from "@/store/notiSlice";
import { NotificationType } from "@/type/notification";
import { cn } from "@/utils/class-name";
import { TYPE_NOTI } from "@/utils/contants";
import { formatDistanceToNow } from "date-fns";
import { RefObject, useState } from "react";
import { PiCheck } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Title, Badge, Popover, Avatar, Empty, Loader } from "rizzui";
import SimpleBar from "simplebar-react";

function NotificationsList({
    setIsOpen,
    dataNoti,
    isLoading,
    setIsRead,
}: {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dataNoti: NotificationType[];
    isLoading: boolean;
    setIsRead: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { axiosJWT } = useAuth();

    const displayNoti = dataNoti?.slice(0, 6);

    const handleClickRead = async (noti: NotificationType) => {
        dispatch(startLoadingPage());
        const { body } = await UserServices.readNotification(
            noti._id,
            axiosJWT
        );
        if (body?.success) {
            switch (noti.type) {
                case TYPE_NOTI.LIKE:
                    navigate("/post", { state: noti.blog });

                    break;
                case TYPE_NOTI.COMMENT:
                    navigate("/post", { state: noti.blog });

                    break;
                case TYPE_NOTI.INVITE:
                    navigate(`/group/detail/${noti.category?._id}`);

                    break;
                case TYPE_NOTI.FOLLOW:
                    navigate(`/profile/${noti.sender._id}`);

                    break;

                default:
                    break;
            }
            dispatch(readNotification(noti._id));
            setIsRead(true);
            dispatch(endLoadingPage());
        }
    };

    return (
        <div className="w-[320px] text-left rtl:text-right sm:w-[360px] 2xl:w-[420px]">
            <div className="mb-2 flex items-center justify-between ps-6">
                <Title as="h5">Notification</Title>
                <div
                    onClick={() => {
                        setIsOpen(false), navigate("/notification");
                    }}
                    className="cursor-pointer hover:underline"
                >
                    View all
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center pt-8">
                    <Loader />
                </div>
            ) : (
                <SimpleBar className="max-h-[450px] ">
                    <div className="grid grid-cols-1 ps-4 p-2">
                        {displayNoti && displayNoti.length > 0 ? (
                            displayNoti.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => {
                                        handleClickRead(item);
                                    }}
                                    className="group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2.5 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
                                >
                                    <div className={cn("relative")}>
                                        <Avatar
                                            src={item.sender.avatar.url}
                                            name={item.sender.name}
                                        />
                                    </div>
                                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                                        <div className="w-full">
                                            <Title
                                                as="h6"
                                                className="mb-0.5 text-sm font-semibold"
                                            >
                                                {item.sender.name}
                                            </Title>
                                            <div className="flex">
                                                {item.type ===
                                                    TYPE_NOTI.LIKE && (
                                                    <p className="w-10/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                                        Like a your post:{" "}
                                                        <span className="font-semibold">
                                                            {item.blog.title}
                                                        </span>
                                                    </p>
                                                )}
                                                {item.type ===
                                                    TYPE_NOTI.COMMENT && (
                                                    <p className="w-10/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                                        Comment on your post:{" "}
                                                        <span className="font-semibold">
                                                            {item.blog.title}
                                                        </span>
                                                    </p>
                                                )}

                                                {item.type ===
                                                    TYPE_NOTI.FOLLOW && (
                                                    <p className="w-10/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                                        Follow you
                                                    </p>
                                                )}
                                                {item.type ===
                                                    TYPE_NOTI.INVITE && (
                                                    <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                                        invite you to join the
                                                        group{" "}
                                                        <span className="font-semibold">
                                                            {
                                                                item.category
                                                                    ?.name
                                                            }
                                                        </span>
                                                    </p>
                                                )}
                                                {item.type ===
                                                    TYPE_NOTI.ACCEPT && (
                                                    <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                                                        accept to join the group{" "}
                                                        <span className="font-semibold">
                                                            {
                                                                item.category
                                                                    ?.name
                                                            }
                                                        </span>
                                                    </p>
                                                )}
                                                <span className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                                                    {formatDistanceToNow(
                                                        new Date(
                                                            item.createdAt
                                                        ),
                                                        { addSuffix: true }
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ms-auto flex-shrink-0">
                                            {!item.isRead ? (
                                                <Badge
                                                    renderAsDot
                                                    size="lg"
                                                    color="primary"
                                                    className="scale-90"
                                                />
                                            ) : (
                                                <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                                                    <PiCheck className="h-auto w-[9px]" />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Empty />
                        )}
                    </div>
                </SimpleBar>
            )}
        </div>
    );
}

export default function NotificationDropdown({
    children,
    dataNoti,
    isLoading,
    setIsRead,
}: {
    children: JSX.Element & { ref?: RefObject<unknown> };
    dataNoti: NotificationType[];
    isLoading: boolean;
    setIsRead: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_isOpen, setIsOpen] = useState(false);

    return (
        <Popover placement={"bottom-end"}>
            <Popover.Trigger>{children}</Popover.Trigger>
            <Popover.Content className="z-50 pb-6 pe-6 ps-0 pt-5 h-fit overflow-auto dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex">
                <NotificationsList
                    setIsOpen={setIsOpen}
                    dataNoti={dataNoti}
                    isLoading={isLoading}
                    setIsRead={setIsRead}
                />
            </Popover.Content>
        </Popover>
    );
}
