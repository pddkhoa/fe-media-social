import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import AdminServices from "@/services/admin";
import { formatDate } from "@/utils/format-date";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiCalendarCheck, PiXBold } from "react-icons/pi";
import { Title, ActionIcon, cn, Button } from "rizzui";

export default function DetailsEvents({
    event,
    setAction,
}: {
    event: any;
    setAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const { closeModal } = useModal();
    const { axiosJWT } = useAuth();

    async function handleDelete(eventID: string) {
        setIsLoading(true);
        const { body } = await AdminServices.deleteSetting(
            {
                settingId: eventID,
            },
            axiosJWT
        );
        if (body?.success) {
            toast.success(body.message);
            setIsLoading(false);
            setAction(true);
            closeModal();
        } else {
            setIsLoading(false);

            toast.error(body?.message || "Error");
        }
    }

    return (
        <div className="m-auto p-4 md:px-7 md:pb-10 md:pt-6">
            <div className="mb-6 flex items-center justify-between">
                <Title as="h3" className="text-xl xl:text-2xl">
                    Event Details
                </Title>
                <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={() => closeModal()}
                    className="p-0 text-gray-500 hover:!text-gray-900"
                >
                    <PiXBold className="h-[18px] w-[18px]" />
                </ActionIcon>
            </div>

            <div>
                <Title
                    as="h4"
                    className="text-lg font-medium xl:text-xl xl:leading-7"
                >
                    {event?.title}
                </Title>
                <Title
                    as="h4"
                    className="text-lg font-medium xl:text-xl xl:leading-7 mt-7"
                >
                    Value Setting:{" "}
                    <span className="font-normal text-gray-600">
                        {event?.value}
                    </span>
                </Title>

                <ul className="mt-7 flex flex-col gap-[18px] text-gray-600">
                    <li className="flex gap-2 items-center">
                        <PiCalendarCheck className="h-5 w-5" />
                        <span>Event Start:</span>
                        <span className="font-medium text-gray-1000">
                            {formatDate(event?.start, "MMMM D, YYYY")} at{" "}
                            {formatDate(event?.start, "h:mm A")}
                        </span>
                    </li>
                    <li className="flex gap-2 items-center">
                        <PiCalendarCheck className="h-5 w-5" />

                        <span>Event End:</span>
                        <span className="font-medium text-gray-1000">
                            {formatDate(event?.end, "MMMM D, YYYY")} at{" "}
                            {formatDate(event?.end, "h:mm A")}
                        </span>
                    </li>
                </ul>

                <div className={cn("grid grid-cols-2 gap-4 pt-5 ")}>
                    <Button
                        variant="outline"
                        onClick={() => {
                            closeModal();
                        }}
                        className="dark:hover:border-gray-400"
                    >
                        Close
                    </Button>
                    <Button
                        variant="solid"
                        onClick={() => handleDelete(event?.id as string)}
                        className="dark:hover:border-gray-400"
                        color="danger"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
