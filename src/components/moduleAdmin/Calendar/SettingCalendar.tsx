import { useModal } from "@/hooks/useModal";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { cn } from "rizzui";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import useEventCalendar from "@/hooks/useEventCalendar";

const localizer = dayjsLocalizer(dayjs);

const calendarToolbarClassName =
    "[&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900";

export default function EventCalendarView() {
    const { events } = useEventCalendar();
    const { openModal } = useModal();

    // const handleSelectSlot = useCallback(
    //     ({ start, end }: { start: Date; end: Date }) => {
    //         openModal({
    //             view: <EventForm startDate={start} endDate={end} />,
    //             customSize: "650px",
    //         });
    //     },
    //     [openModal]
    // );

    // const handleSelectEvent = useCallback(
    //     (event: CalendarEvent) => {
    //         openModal({
    //             view: <DetailsEvents event={event} />,
    //             customSize: "500px",
    //         });
    //     },
    //     [openModal]
    // );

    const { views, scrollToTime, formats } = useMemo(
        () => ({
            views: {
                month: true,
                week: true,
                day: true,
                agenda: true,
            },
            scrollToTime: new Date(2023, 10, 27, 6),
            formats: {
                dateFormat: "D",
                weekdayFormat: (date: Date, culture: any, localizer: any) =>
                    localizer.format(date, "ddd", culture),
                dayFormat: (date: Date, culture: any, localizer: any) =>
                    localizer.format(date, "ddd M/D", culture),
                timeGutterFormat: (date: Date, culture: any, localizer: any) =>
                    localizer.format(date, "hh A", culture),
            },
        }),
        []
    );

    return (
        <div className="h-full">
            <Calendar
                localizer={localizer}
                events={events}
                views={views}
                formats={formats}
                startAccessor="start"
                endAccessor="end"
                dayLayoutAlgorithm="no-overlap"
                // onSelectEvent={handleSelectEvent}
                // onSelectSlot={handleSelectSlot}
                selectable
                scrollToTime={scrollToTime}
                className={cn("overflow-auto")}
            />
        </div>
    );
}
