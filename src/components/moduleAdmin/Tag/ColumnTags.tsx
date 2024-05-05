import AvatarCard from "@/components/ui/AvatarCard";
import { HeaderCell } from "@/components/ui/Table";
import { Tag } from "@/type/tag";
import dayjs from "dayjs";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { Popover, ActionIcon } from "rizzui";
import DropdownOptionTag from "./DropdownOptionTag";

type Columns = {
    handleDelete: (tagId: string) => Promise<void>;
};

export const getColumnsTagAdmin = ({ handleDelete }: Columns) => [
    {
        title: <HeaderCell title="Tag's Name" />,
        dataIndex: "name",
        key: "name",
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
        title: <HeaderCell title="Author" />,
        dataIndex: "author",
        key: "author",
        width: 100,
        render: (_: string, row: Tag) => (
            <AvatarCard
                src={row?.user?.avatar?.url}
                name={row?.user.name}
                description={row?.user.email}
                avatarProps={{
                    name: row?.user.name,
                    size: "sm",
                    className: "rounded-lg",
                }}
            />
        ),
    },
    {
        title: <HeaderCell title="" className="opacity-0" />,
        dataIndex: "action",
        key: "action",
        width: 50,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render: (_: string, row: Tag) => (
            <>
                <div className="flex items-center justify-end gap-3 pe-4">
                    <Popover placement="bottom-end">
                        <Popover.Trigger>
                            <ActionIcon variant="flat" size="sm">
                                <PiDotsThreeOutlineVertical />
                            </ActionIcon>
                        </Popover.Trigger>
                        <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                            <DropdownOptionTag
                                handleDelete={handleDelete}
                                data={row}
                            />
                        </Popover.Content>
                    </Popover>
                </div>
            </>
        ),
    },
];
