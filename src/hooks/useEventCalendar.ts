import { SettingType } from "@/type/report";
import { useState } from "react";

export default function useEventCalendar(initialData: SettingType[]) {
    const [events, setEvents] = useState(
        initialData && initialData.length > 0 ? initialData : []
    );

    console.log(events);
    function createEvent(event: SettingType) {
        setEvents((prev) => [...prev, event]);
    }

    function updateEvent(updatedEvent: SettingType) {
        const updatedEvents = events?.map((event) => {
            if (event._id === updatedEvent._id) {
                return updatedEvent;
            }
            return event;
        });
        setEvents(updatedEvents);
    }

    function deleteEvent(eventID: string) {
        // Use filter to create a new array without the event to be deleted
        const updatedEvents = events?.filter((event) => event._id !== eventID);

        // Update the state with the new array of events
        setEvents(updatedEvents);
    }

    return { events, setEvents, createEvent, updateEvent, deleteEvent };
}
