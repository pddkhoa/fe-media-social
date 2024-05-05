import AvatarCard from "@/components/ui/AvatarCard";
import { HeaderCell } from "@/components/ui/Table";
import { Post } from "@/type/post";
import dayjs from "dayjs";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { ActionIcon, Badge, Popover } from "rizzui";
import DropdownOptionBlog from "./DropdownOptionBlog";

type Columns = {
    handleDelete: (idBlog: string) => Promise<void>;
};

export const getColumnsBlog = ({ handleDelete }: Columns) => [
    {
        title: <HeaderCell title="Blog" />,
        dataIndex: "blog",
        key: "blog",
        width: 160,
        render: (_: string, row: Post) => (
            <AvatarCard
                src={row?.avatar}
                name={row.title}
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
        title: <HeaderCell title="Author" />,
        dataIndex: "author",
        key: "author",
        width: 100,
        render: (_: string, row: Post) => (
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
        title: <HeaderCell title="Status" />,
        dataIndex: "status",
        key: "status",
        width: 50,
        render: (value: string) => (
            <p className="text-sm">{getStatus(value)}</p>
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
        render: (_: string, row: Post) => (
            <>
                <div className="flex items-center justify-end gap-3 pe-4">
                    <Popover placement="bottom-end">
                        <Popover.Trigger>
                            <ActionIcon variant="flat" size="sm">
                                <PiDotsThreeOutlineVertical />
                            </ActionIcon>
                        </Popover.Trigger>
                        <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                            <DropdownOptionBlog
                                data={row}
                                handleDelete={handleDelete}
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
        case "Published":
            return (
                <Badge variant="solid" rounded="md" size="md" color="success">
                    Published
                </Badge>
            );
        case "Draft":
            return (
                <Badge variant="solid" rounded="md" size="md" color="danger">
                    Draft
                </Badge>
            );
        default:
            break;
    }
};
