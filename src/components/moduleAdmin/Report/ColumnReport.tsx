import { HeaderCell } from "@/components/ui/Table";
import dayjs from "dayjs";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { Popover, ActionIcon } from "rizzui";
import OptionDropdown from "./OptionDropdown";
import { ReportType } from "@/type/report";

type Columns = {
    handleDelete: (id: string) => Promise<void>;
    setAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export const getColumnsReport = ({ handleDelete, setAction }: Columns) => [
    {
        title: <HeaderCell title="Report Name" />,
        dataIndex: "value",
        key: "value",
        width: 100,
        render: (value: string) => <p className="text-sm">{value}</p>,
    },
    {
        title: <HeaderCell title="Create At" />,
        dataIndex: "createdAt",
        key: "createdAt",
        width: 50,
        render: (value: string) => (
            <p className="text-sm">{dayjs(value).format("DD MMM YYYY")}</p>
        ),
    },
    {
        title: <HeaderCell title="Update At" />,
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 50,
        render: (value: string) => (
            <p className="text-sm">{dayjs(value).format("DD MMM YYYY")}</p>
        ),
    },

    {
        title: <HeaderCell title="" className="opacity-0" />,
        dataIndex: "action",
        key: "action",
        width: 50,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render: (_: string, row: ReportType) => (
            <>
                <div className="flex items-center justify-end gap-3 pe-4">
                    <Popover placement="bottom-end">
                        <Popover.Trigger>
                            <ActionIcon variant="flat" size="sm">
                                <PiDotsThreeOutlineVertical />
                            </ActionIcon>
                        </Popover.Trigger>
                        <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                            <OptionDropdown
                                handleDelete={handleDelete}
                                data={row}
                                setAction={setAction}
                            />
                        </Popover.Content>
                    </Popover>
                </div>
            </>
        ),
    },
];
