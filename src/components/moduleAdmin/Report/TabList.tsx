import ReportDetails from "./ReportDetail";
import { cn } from "@/utils/class-name";

export default function InboxTabs({
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
        <ReportDetails
            className={cn(className)}
            activeIndex={activeIndex}
            type={type}
            setAction={setAction}
        />
    );
}
