import { HeaderCell } from "@/components/ui/Table";
import dayjs from "dayjs";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { Popover, ActionIcon } from "rizzui";
import { User } from "@/type/user";
import AvatarCard from "@/components/ui/AvatarCard";
import DropdownOptionAccount from "./DropdownOptionAccount";

type Columns = {
    setIsChangeRole: React.Dispatch<React.SetStateAction<boolean>>;
};

export const getColumnsAccount = ({ setIsChangeRole }: Columns) => [
    {
        title: <HeaderCell title="User" />,
        dataIndex: "user",
        key: "user",
        width: 100,
        render: (_: string, row: User) => (
            <AvatarCard
                src={row?.avatar?.url}
                name={row?.name}
                description={row?.email}
                avatarProps={{
                    name: row?.name,
                    size: "sm",
                    className: "rounded-lg",
                }}
            />
        ),
    },
    {
        title: <HeaderCell title="Role" />,
        dataIndex: "roles",
        key: "roles",
        width: 50,
        render: (value: string) => <p className="text-sm">{value}</p>,
    },
    {
        title: <HeaderCell title="Phone" />,
        dataIndex: "phone",
        key: "phone",
        width: 50,
        render: (value: string) => <p className="text-sm">{value}</p>,
    },
    {
        title: <HeaderCell title="Gender" />,
        dataIndex: "gender",
        key: "gender",
        width: 50,
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
        render: (_: string, row: User) => (
            <>
                <div className="flex items-center justify-end gap-3 pe-4">
                    <Popover placement="bottom-end">
                        <Popover.Trigger>
                            <ActionIcon variant="flat" size="sm">
                                <PiDotsThreeOutlineVertical />
                            </ActionIcon>
                        </Popover.Trigger>
                        <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                            <DropdownOptionAccount
                                data={row}
                                setIsChangeRole={setIsChangeRole}
                            />
                        </Popover.Content>
                    </Popover>
                </div>
            </>
        ),
    },
];
