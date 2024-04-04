import UserServices from "@/services/user";
import { NotificationType } from "@/type/notification";
import { TYPE_NOTI } from "@/utils/contants";
import { useCallback, useEffect, useRef, useState } from "react";
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
            className={cn(
                "grid cursor-pointer grid-cols-[24px_1fr] items-start gap-3 border-t hover:border-primary hover:shadow-md border-gray-200 p-5"
            )}
        >
            <Avatar name="PK" size="sm" />

            <div>
                <div className="flex items-center justify-between lg:flex-col lg:items-start 2xl:flex-row 2xl:items-center">
                    <Title as="h4" className="flex items-center">
                        <span className="text-sm font-semibold dark:text-gray-700">
                            {" "}
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
                            invite you to join the group{" "}
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
}

export default function MessageList({ className, setMessage }: InboxListProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [dataNoti, setDataNoti] = useState<NotificationType[]>([]);

    const fetchNoti = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await UserServices.getNotification();
            if (body?.success) {
                setDataNoti(body?.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataNoti]);

    useEffect(() => {
        fetchNoti();
    }, [fetchNoti]);

    const handleSetMessage = (data: any) => {
        setMessage(data);
    };

    return (
        <>
            <div className={cn(className, "sticky")}>
                <div className="overflow-auto rounded-lg border border-gray-200">
                    <SimpleBar className="max-h-[40rem]">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-[10rem]">
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
                            <Empty />
                        )}
                    </SimpleBar>
                </div>
            </div>
        </>
    );
}
