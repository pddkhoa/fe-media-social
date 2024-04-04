import PageHeader from "@/components/breadcrumb/PageHeader";
import InboxTabs from "@/components/module/notification/MessageDetail";
import MessageList from "@/components/module/notification/MessageList";
import { TabList } from "@/components/module/notification/TabList";
import { NotificationType } from "@/type/notification";
import { useState } from "react";

const pageHeader = {
    title: "Notifications",
    breadcrumb: [
        {
            href: "/notification",
            name: "Notifications",
        },
    ],
};

const PageNotification = () => {
    const [message, setMessage] = useState<NotificationType>();

    return (
        <>
            <PageHeader
                breadcrumb={pageHeader.breadcrumb}
                title={pageHeader.title}
            />
            <div className="mt-5">
                <TabList />
                <div className=" container  mt-5 items-start grid grid-cols-12 gap-7">
                    <MessageList
                        setMessage={setMessage}
                        className="col-span-4 overflow-auto"
                    />
                    <InboxTabs message={message} className="col-span-8" />
                </div>
            </div>
        </>
    );
};

export default PageNotification;
