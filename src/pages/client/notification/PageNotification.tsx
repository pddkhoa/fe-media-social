import PageHeader from "@/components/breadcrumb/PageHeader";
import InboxTabs from "@/components/module/notification/NotificationDetail";
import NotificationList from "@/components/module/notification/NotificationList";
import { TabList } from "@/components/module/notification/TabList";
import useAuth from "@/hooks/useAuth";
import UserServices from "@/services/user";
import { NotificationType } from "@/type/notification";
import { useEffect, useState } from "react";

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
    const [isLoading, setIsLoading] = useState(true);
    const [valueTab, setValueTab] = useState<any>("All");
    const [dataNoti, setDataNoti] = useState<NotificationType[]>([]);
    const { axiosJWT } = useAuth();

    useEffect(() => {
        const fetchNoti = async () => {
            try {
                setIsLoading(true);

                const { body } =
                    valueTab !== "All"
                        ? await UserServices.getNotificationByType(
                              valueTab,
                              axiosJWT
                          )
                        : await UserServices.getNotification(axiosJWT);
                if (body?.success) {
                    setDataNoti(body?.result);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        fetchNoti();
    }, [valueTab, setValueTab]);

    return (
        <>
            <PageHeader
                breadcrumb={pageHeader.breadcrumb}
                title={pageHeader.title}
            />
            <div className="mt-5">
                <TabList
                    setValueTab={setValueTab}
                    dataTotal={dataNoti?.length}
                />
                <div className=" mt-5 items-start grid grid-cols-12 gap-7">
                    <NotificationList
                        setMessage={setMessage}
                        dataNoti={dataNoti}
                        isLoading={isLoading}
                        className="xl:col-span-4 col-span-6 overflow-auto"
                    />
                    <InboxTabs
                        message={message}
                        className="xl:col-span-8 col-span-6"
                    />
                </div>
            </div>
        </>
    );
};

export default PageNotification;
