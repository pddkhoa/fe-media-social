import useAuth from "@/hooks/useAuth";
import UserServices from "@/services/user";
import {
    startLoadingPage,
    endLoadingPage,
    readNotificationMess,
} from "@/store/notiSlice";
import { ChatNoti } from "@/type/notification";
import { cn } from "@/utils/class-name";
import { formatDistanceToNow } from "date-fns";
import { FC, RefObject, useState } from "react";
import { PiCheck } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Loader, Popover, Title } from "rizzui";
import SimpleBar from "simplebar-react";

function MessagesList({
    setIsOpen,
    dataNotiMess,
    isLoading,
    setIsRead,
}: {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dataNotiMess: ChatNoti[];
    isLoading: boolean;
    setIsRead: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { axiosJWT } = useAuth();

    const handleClickRead = async (noti: ChatNoti) => {
        dispatch(startLoadingPage());
        const { body } = await UserServices.readNotification(
            noti._id,
            axiosJWT
        );
        if (body?.success) {
            dispatch(readNotificationMess(noti._id));
            setIsRead(true);
            navigate("/messenger");
            dispatch(endLoadingPage());
        }
    };

    return (
        <div className="w-[320px] text-left rtl:text-right sm:w-[360px] 2xl:w-[420px]">
            <div className="mb-2 flex items-center justify-between ps-6">
                <Title as="h5">Messages</Title>
                <Link
                    to={"messenger"}
                    onClick={() => setIsOpen(false)}
                    className="hover:underline"
                >
                    View all
                </Link>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center pt-8">
                    <Loader />
                </div>
            ) : (
                <SimpleBar className="max-h-[450px]">
                    <div className="grid grid-cols-1 ps-4 p-2">
                        {dataNotiMess?.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => {
                                    handleClickRead(item);
                                }}
                                className="group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2.5 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
                            >
                                <div
                                    className={cn(
                                        "relative",
                                        item?.sender?.avatar?.url?.length > 1 &&
                                            "me-1"
                                    )}
                                >
                                    <Avatar
                                        src={item.sender.avatar.url}
                                        name={item.sender.name}
                                        // className={cn(
                                        //     item.sender.avatar. > 1 &&
                                        //         "relative -end-1 -top-0.5 !h-9 !w-9"
                                        // )}
                                    />
                                    {/* {item.avatar.length > 1 && (
                                    <Avatar
                                        src={item.avatar[1]}
                                        name={item.name}
                                        className="absolute -bottom-1 end-1.5 !h-9 !w-9 border-2 border-gray-0 dark:border-gray-100"
                                    />
                                )} */}
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
                                            <p className="w-10/12 truncate pe-7 text-xs text-gray-500">
                                                {
                                                    item?.message?.message
                                                        ?.content
                                                }
                                            </p>
                                            <span className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                                                {formatDistanceToNow(
                                                    new Date(item.createdAt),
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
                        ))}
                    </div>
                </SimpleBar>
            )}
        </div>
    );
}

type MessagesDropdownProps = {
    dataNotiMess: ChatNoti[];
    isLoading: boolean;
    setIsRead: React.Dispatch<React.SetStateAction<boolean>>;
    children: JSX.Element & { ref?: RefObject<unknown> };
};

const MessagesDropdown: FC<MessagesDropdownProps> = ({
    children,
    dataNotiMess,
    isLoading,
    setIsRead,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Popover placement={"bottom-end"}>
                <Popover.Trigger>{children}</Popover.Trigger>
                <Popover.Content className="z-50 pb-6 pe-6 ps-0 pt-5 h-fit overflow-auto dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex">
                    <MessagesList
                        setIsOpen={setIsOpen}
                        dataNotiMess={dataNotiMess}
                        isLoading={isLoading}
                        setIsRead={setIsRead}
                    />
                </Popover.Content>
            </Popover>
        </>
    );
};
export default MessagesDropdown;
