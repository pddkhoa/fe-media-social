import Spinner from "@/components/ui/Spinner";
import { cn } from "@/utils/class-name";
import { useState, useEffect } from "react";
import { Title, Badge, Empty, Button, Popover } from "rizzui";
import MessageBody from "./MessageBody";
import { NotificationType } from "@/type/notification";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import DropdownOption from "./DropdownOption";

export default function InboxTabs({
    className,
    message,
}: {
    className?: string;
    message: NotificationType | undefined;
}) {
    return <MessageDetails className={cn(className)} message={message} />;
}

export function MessageDetails({
    className,
    message,
}: {
    className?: string;
    message: NotificationType | undefined;
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div
                className={cn(
                    "!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center",
                    className
                )}
            >
                <Spinner size="xl" />
            </div>
        );
    }

    if (!message) {
        return (
            <div
                className={cn(
                    "!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center",
                    className
                )}
            >
                <Empty
                    text="No conversations selected"
                    textClassName="mt-4 text-base text-gray-500"
                />
            </div>
        );
    }

    return (
        <div
            className={cn(
                "relative pt-6 lg:rounded-lg lg:border lg:border-gray-200 lg:px-4 lg:py-7 xl:px-5 xl:py-5 2xl:pb-7 2xl:pt-6",
                className
            )}
        >
            <div>
                <header className="flex items-center justify-between  gap-4 border-b border-gray-200 pb-5">
                    <div className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
                        <Title as="h4" className="font-semibold">
                            Notification
                        </Title>
                        <Badge variant="outline" color="danger" size="sm">
                            {message?.type}
                        </Badge>
                    </div>
                    <div>
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
                                <DropdownOption data={message} />
                            </Popover.Content>
                        </Popover>
                    </div>
                </header>

                <div className="[&_.simplebar-content]:grid [&_.simplebar-content]:gap-8 [&_.simplebar-content]:py-5 p-4">
                    <div className="max-h-[calc(100dvh-14rem)]  overflow-y-scroll">
                        <MessageBody message={message} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DotSeparator({ ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
            {...props}
        >
            <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
        </svg>
    );
}
