import PageHeader from "@/components/breadcrumb/PageHeader";
import EventForm from "@/components/moduleAdmin/Calendar/EventForm";
import EventCalendarView from "@/components/moduleAdmin/Calendar/SettingCalendar";
import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import AdminServices from "@/services/admin";
import { SettingType } from "@/type/report";
import { useCallback, useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "rizzui";

const pageHeader = {
    title: "Setting Calendar",
    breadcrumb: [
        {
            href: "/",
            name: "Home",
        },
        {
            href: "/setting-auto",
            name: "Setting Automation",
        },
    ],
};

const PageCalendar = () => {
    const { axiosJWT } = useAuth();
    const [dataSetting, setDataSetting] = useState<SettingType[]>([]);
    const { openModal } = useModal();
    const [isAction, setAction] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const { body } = await AdminServices.getListBlogSetting(axiosJWT);
            if (body?.success) {
                setDataSetting(body.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [setDataSetting]);

    useEffect(() => {
        setAction(false);
        fetchData();
    }, [fetchData, isAction]);

    return (
        <>
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
            >
                <Button
                    variant="solid"
                    onClick={() => {
                        openModal({
                            view: <EventForm setAction={setAction} />,
                        });
                    }}
                >
                    Add New Setting
                </Button>
            </PageHeader>

            <EventCalendarView data={dataSetting} setAction={setAction} />
        </>
    );
};

export default PageCalendar;
