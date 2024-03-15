import { HeaderCell } from "@/components/ui/Table";
import dayjs from "dayjs";
import { PiTrash } from "react-icons/pi";
import { Button, Popover, Title } from "rizzui";

type Columns = {
  data: any[];
  sortConfig?: any;
};

export const getColumnsTag = ({ data }: Columns) => [
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
    title: <HeaderCell title="" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 50,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (_: string) => (
      <>
        <div className="flex items-center justify-end gap-3 pe-4">
          <Popover>
            <Popover.Trigger>
              <Button variant="outline" size="sm" color="danger">
                <PiTrash className="w-5 h-5" />
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              {({ setOpen }) => (
                <div className="w-40">
                  <Title as="h6">Delete the task</Title>
                  <p className="text-sm">
                    Are you sure you want to delete the task?
                  </p>
                  <div className="flex justify-end gap-3 mt-2">
                    <Button
                      size="sm"
                      onClick={() => setOpen(false)}
                      variant="outline"
                    >
                      No
                    </Button>
                    <Button size="sm" onClick={() => setOpen(false)}>
                      Yes
                    </Button>
                  </div>
                </div>
              )}
            </Popover.Content>
          </Popover>
        </div>
      </>
    ),
  },
];
