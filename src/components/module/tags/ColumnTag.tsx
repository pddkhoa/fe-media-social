import AvatarCard from "@/components/ui/AvatarCard";
import { HeaderCell } from "@/components/ui/Table";
import { Tag } from "@/type/tag";
import dayjs from "dayjs";
import { PiTrash } from "react-icons/pi";
import { Button, Popover, Title } from "rizzui";

type Columns = {
    sortConfig?: any;
    isAuth: string;
    handleDelete: (tagId: string) => Promise<void>;
};

export const getColumnsTag = ({ isAuth, handleDelete }: Columns) => [
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
                {isAuth === row.user._id && (
                    <div className="flex items-center justify-end gap-3 pe-4">
                        <Popover>
                            <Popover.Trigger>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    color="danger"
                                >
                                    <PiTrash className="w-5 h-5" />
                                </Button>
                            </Popover.Trigger>
                            <Popover.Content>
                                {({ setOpen }) => (
                                    <div className="w-40">
                                        <Title as="h6">Delete the task</Title>
                                        <p className="text-sm">
                                            Are you sure you want to delete the
                                            task?
                                        </p>
                                        <div className="flex justify-end gap-3 mt-2">
                                            <Button
                                                size="sm"
                                                onClick={() => setOpen(false)}
                                                variant="outline"
                                            >
                                                No
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    setOpen(false);
                                                    handleDelete(row._id);
                                                }}
                                            >
                                                Yes
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Popover.Content>
                        </Popover>
                    </div>
                )}
            </>
        ),
    },
];
