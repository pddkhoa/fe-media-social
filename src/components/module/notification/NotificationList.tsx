import { NotificationType } from "@/type/notification";
import { TYPE_NOTI } from "@/utils/contants";
import { useRef } from "react";
import { PiCheck } from "react-icons/pi";
import { cn, Title, Loader, Avatar, Badge, Empty } from "rizzui";
import SimpleBar from "simplebar-react";

type NotiItemProps = {
    data: NotificationType;
    onClick: (data: any) => void;
};

export function NotificationItem({ data, onClick }: NotiItemProps) {
    const hoverRef = useRef(null);

    return (
        <div
            ref={hoverRef}
            onClick={() => onClick(data)}
            className={`grid cursor-pointer grid-cols-12 items-start  border-t  hover:border-primary  hover:shadow-md border-gray-200 p-5 `}
        >
            <Avatar
                name={data.sender.name}
                className="col-span-2"
                src={data.sender.avatar.url}
                size="md"
            />

            <div className="col-span-10">
                <div className="flex items-center justify-between">
                    <Title as="h4" className="flex items-center">
                        <span className="text-sm font-semibold dark:text-gray-700">
                            {data?.sender?.name}
                        </span>

                        {!data.isRead ? (
                            <Badge
                                renderAsDot
                                size="lg"
                                color="primary"
                                className="ml-3 h-2.5 w-2.5 bg-primary"
                            />
                        ) : (
                            <span className="ml-3 h-2.5 w-2.5 inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                                <PiCheck className="h-auto w-[9px]" />
                            </span>
                        )}
                    </Title>
                </div>
                <p className="mt-1 line-clamp-3 text-sm text-gray-500">
                    {data.type === TYPE_NOTI.LIKE && (
                        <p className="w-full line-clamp-2 pe-7 text-xs text-gray-500">
                            Like a your post:
                            <span className="font-semibold">
                                {data.blog.title}
                            </span>
                        </p>
                    )}
                    {data.type === TYPE_NOTI.COMMENT && (
                        <p className="w-10/12 line-clamp-2 pe-7 text-xs text-gray-500">
                            Comment on your post:{" "}
                            <span className="font-semibold">
                                {data.blog.title}
                            </span>
                        </p>
                    )}

                    {data.type === TYPE_NOTI.FOLLOW && (
                        <p className="w-10/12 line-clamp-2 pe-7 text-xs text-gray-500">
                            Follow you
                        </p>
                    )}
                    {data.type === TYPE_NOTI.INVITE && (
                        <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                            Invited you to join the group{" "}
                            <span className="font-semibold">
                                {data.category?.name}
                            </span>
                        </p>
                    )}
                    {data.type === TYPE_NOTI.ACCEPT && (
                        <p className="w-11/12 line-clamp-2 pe-7 text-xs text-gray-500">
                            Accept you to join the group{" "}
                            <span className="font-semibold">
                                {data.category?.name}
                            </span>
                        </p>
                    )}
                </p>
            </div>
        </div>
    );
}

interface InboxListProps {
    className?: string;
    setMessage: React.Dispatch<
        React.SetStateAction<NotificationType | undefined>
    >;
    dataNoti: NotificationType[];
    isLoading: boolean;
}

export default function NotificationList({
    className,
    setMessage,
    dataNoti,
    isLoading,
}: InboxListProps) {
    const handleSetMessage = (data: any) => {
        setMessage(data);
    };

    return (
        <>
            <div className={cn(className, "sticky")}>
                <div className="overflow-auto rounded-lg border border-gray-200">
                    <SimpleBar className="min-h-[35rem]">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-[35rem]">
                                <Loader />
                            </div>
                        ) : dataNoti && dataNoti.length > 0 ? (
                            dataNoti.map((item) => (
                                <NotificationItem
                                    key={item._id}
                                    data={item}
                                    onClick={handleSetMessage}
                                />
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-[35rem]">
                                <Empty />
                            </div>
                        )}
                    </SimpleBar>
                </div>
            </div>
        </>
    );
}
