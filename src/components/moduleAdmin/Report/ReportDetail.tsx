import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { cn, Badge, Popover, ActionIcon } from "rizzui";
import SimpleBar from "simplebar-react";
import ReportBody from "./ReportBody";
import ActionDropdown from "./ActionDropdown";

export default function ReportDetails({
    className,
    activeIndex,
    type,
    setAction,
}: {
    className?: string;
    activeIndex: any;
    type: string;
    setAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div
            className={cn(
                "relative pt-6 lg:rounded-lg lg:border lg:border-gray-200 lg:px-4 lg:py-7 xl:px-5 xl:py-5 2xl:pb-7 2xl:pt-6",
                className
            )}
        >
            <div>
                <header className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-2 3xl:flex-row 3xl:items-center">
                    <div className=" flex justify-between items-center gap-2.5 ">
                        <Badge variant="outline" color="danger" size="md">
                            {activeIndex?.reason?.value} Issue
                        </Badge>
                        <Popover placement="bottom-end">
                            <Popover.Trigger>
                                <ActionIcon variant="flat" size="sm">
                                    <PiDotsThreeOutlineVertical />
                                </ActionIcon>
                            </Popover.Trigger>
                            <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                                <ActionDropdown
                                    data={activeIndex}
                                    type={type}
                                    setAction={setAction}
                                />
                            </Popover.Content>
                        </Popover>
                    </div>
                    <div className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
                        <p className="text-sm p-2">
                            Message: {activeIndex?.message}
                        </p>
                    </div>
                </header>

                <div className="[&_.simplebar-content]:grid [&_.simplebar-content]:gap-8 [&_.simplebar-content]:py-5">
                    <SimpleBar className="@3xl:max-h-[calc(100dvh-34rem)] @4xl:max-h-[calc(100dvh-32rem)] @7xl:max-h-[calc(100dvh-31rem)]">
                        <ReportBody data={activeIndex} type={type} />
                    </SimpleBar>
                </div>
            </div>
        </div>
    );
}
