import { HeaderCell } from "@/components/ui/Table";
import dayjs from "dayjs";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { ActionIcon, Badge, Popover } from "rizzui";
import DropdownOptionGroup from "./DropdownOptionGroup";
import { CategoryDetail } from "@/type/category";
import AvatarCard from "@/components/ui/AvatarCard";

type Columns = {
    handleDelete: (idBlog: string) => Promise<void>;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const getColumnsGroup = ({ handleDelete, setIsActive }: Columns) => [
    {
        title: <HeaderCell title="Group" />,
        dataIndex: "group",
        key: "group",
        width: 160,
        render: (_: string, row: CategoryDetail) => (
            <AvatarCard
                src={row?.avatar.url}
                name={row.name}
                description={row?.description}
                avatarProps={{
                    name: "Default",
                    size: "sm",
                    className: "rounded-lg",
                }}
            />
        ),
    },
    {
        title: <HeaderCell title="Admin" />,
        dataIndex: "admin",
        key: "admin",
        width: 100,
        render: (_: string, row: CategoryDetail) => (
            <AvatarCard
                src={row?.isAdmin?.avatar?.url}
                name={row?.isAdmin?.name}
                avatarProps={{
                    name: "Default",
                    size: "sm",
                    className: "rounded-lg",
                }}
            />
        ),
    },
    {
        title: <HeaderCell title="Status" />,
        dataIndex: "status",
        key: "status",
        width: 50,
        render: (value: string) => (
            <p className="text-sm">{getStatus(value)}</p>
        ),
    },
    {
        title: <HeaderCell align="center" title="Total Member" />,
        dataIndex: "sumUser",
        key: "sumUser",
        width: 70,
        render: (value: string) => (
            <p className="text-sm text-center">{value}</p>
        ),
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
        render: (_: string, row: CategoryDetail) => (
            <>
                <div className="flex items-center justify-end gap-3 pe-4">
                    <Popover placement="bottom-end">
                        <Popover.Trigger>
                            <ActionIcon variant="flat" size="sm">
                                <PiDotsThreeOutlineVertical />
                            </ActionIcon>
                        </Popover.Trigger>
                        <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                            <DropdownOptionGroup
                                data={row}
                                handleDelete={handleDelete}
                                setIsActive={setIsActive}
                            />
                        </Popover.Content>
                    </Popover>
                </div>
            </>
        ),
    },
];

const getStatus = (status: string) => {
    switch (status) {
        case "Publish":
            return (
                <Badge variant="solid" rounded="md" size="md" color="success">
                    Publish
                </Badge>
            );
        case "Private":
            return (
                <Badge variant="solid" rounded="md" size="md" color="danger">
                    Private
                </Badge>
            );
        default:
            break;
    }
};
