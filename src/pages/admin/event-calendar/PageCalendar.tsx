import PageHeader from "@/components/breadcrumb/PageHeader";
import EventCalendarView from "@/components/moduleAdmin/Calendar/SettingCalendar";
import { Button } from "rizzui";
import "react-big-calendar/lib/css/react-big-calendar.css";

const pageHeader = {
    title: "Setting Calendar",
    breadcrumb: [
        {
            href: "/",
            name: "Home",
        },
        {
            href: "/setting-calendar",
            name: "Setting Calendar",
        },
    ],
};

const PageCalendar = () => {
    return (
        <>
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
            >
                <div className="mt-4 flex items-center gap-3 @lg:mt-0">
                    {/* <ModalButton
        label="Create Event"
        view={<EventForm />}
        customSize="900px"
        className="mt-0 w-full hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
    /> */}
                    <Button size="sm" variant="solid">
                        Setting Calendar
                    </Button>
                </div>
            </PageHeader>
            <EventCalendarView />
        </>
    );
};

export default PageCalendar;
