import { FC, useState } from "react";
import ReportList from "./ReportList";
import InboxTabs from "./TabList";

type ReportInboxProps = {
    data: any;
    type: string;
    setAction: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReportInbox: FC<ReportInboxProps> = ({ data, type, setAction }) => {
    const [activeIndex, setActiveIndex] = useState<any>();

    return (
        <div className="@container">
            <div className="mt-5 grid grid-cols-12 gap-8">
                <ReportList
                    data={data}
                    className="col-span-4"
                    type={type}
                    setActiveIndex={setActiveIndex}
                    activeIndex={activeIndex}
                />
                <InboxTabs
                    className="col-span-8"
                    activeIndex={activeIndex}
                    type={type}
                    setAction={setAction}
                />
            </div>
        </div>
    );
};

export default ReportInbox;
