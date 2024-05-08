import AvatarCard from "@/components/ui/AvatarCard";
import { TYPE_REPORT } from "@/utils/contants";
import { useRef } from "react";
import { PiChats, PiHashFill, PiUserFocus, PiReadCvLogo } from "react-icons/pi";
import { cn, ActionIcon, Title } from "rizzui";
import SimpleBar from "simplebar-react";

interface MessageItemProps {
    data: any;
    className?: string;
    type: string;
    onClick: () => void;
    activeIndex: any;
}

export function ReportItem({
    className,
    data,
    type,
    onClick,
    activeIndex,
}: MessageItemProps) {
    const hoverRef = useRef(null);

    const isActive = activeIndex?._id === data?._id;

    return (
        <div
            ref={hoverRef}
            onClick={onClick}
            className={cn(
                className,
                "grid cursor-pointer grid-cols-[24px_1fr] items-start gap-3 border-t border-gray-200 p-5",
                isActive && "border-t-2 border-t-primary dark:bg-gray-100/70"
            )}
        >
            <ActionIcon
                variant="flat"
                size="sm"
                className={cn(
                    "h-6 w-6 p-0",
                    isActive && "bg-primary text-white"
                )}
            >
                {type === TYPE_REPORT.BLOG && (
                    <PiReadCvLogo className="h-3.5 w-3.5" />
                )}
                {type === TYPE_REPORT.USER && (
                    <PiUserFocus className="h-3.5 w-3.5" />
                )}
                {type === TYPE_REPORT.TAG && (
                    <PiHashFill className="h-3.5 w-3.5" />
                )}
                {type === TYPE_REPORT.COMMENT && (
                    <PiChats className="h-3.5 w-3.5" />
                )}
            </ActionIcon>
            <div>
                <div className="flex items-center justify-between lg:flex-col lg:items-start 2xl:flex-row 2xl:items-center">
                    <Title as="h4" className="flex items-center">
                        <span className="text-sm font-semibold dark:text-gray-700 line-clamp-2">
                            {type === TYPE_REPORT.BLOG &&
                                data?.blogIsReported?.title}
                            {type === TYPE_REPORT.USER && (
                                <AvatarCard
                                    src={data?.userReport?.avatar?.url}
                                    name={data?.userReport?.name}
                                    description={data?.userReport?.email}
                                />
                            )}
                            {type === TYPE_REPORT.TAG && (
                                <AvatarCard
                                    src={data?.userReport?.avatar?.url}
                                    name={data?.userReport?.name}
                                    description={data?.userReport?.email}
                                />
                            )}
                            {type === TYPE_REPORT.COMMENT && (
                                <AvatarCard
                                    src={data?.userReport?.avatar?.url}
                                    name={data?.userReport?.name}
                                    description={data?.userReport?.email}
                                />
                            )}
                        </span>
                    </Title>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {data?.message ? data.message : "No Message"}
                </p>
            </div>
        </div>
    );
}

interface InboxListProps {
    className?: string;
    data: any;
    type: string;
    setActiveIndex: React.Dispatch<React.SetStateAction<undefined>>;
    activeIndex: undefined;
}

export default function ReportList({
    className,
    data,
    type,
    setActiveIndex,
    activeIndex,
}: InboxListProps) {
    const handleItemClick = (item: any) => {
        setActiveIndex(item);
    };
    return (
        <>
            <div className={cn(className, "sticky")}>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <SimpleBar className="max-h-[calc(100dvh-356px)] md:max-h-[calc(100dvh-311px)] lg:max-h-[calc(100dvh-240px)] xl:max-h-[calc(100dvh-230px)] 2xl:max-h-[calc(100dvh-240px)] 3xl:max-h-[calc(100dvh-270px)]">
                        {data.map((report: any) => (
                            <ReportItem
                                key={report._id}
                                data={report}
                                type={type}
                                onClick={() => {
                                    handleItemClick(report);
                                }}
                                activeIndex={activeIndex}
                            />
                        ))}
                    </SimpleBar>
                </div>
            </div>
        </>
    );
}
