import { RefObject, useState } from "react";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { PiCheck } from "react-icons/pi";
import { Title, Badge, Popover } from "rizzui";

const data = [
  {
    id: 1,
    name: "Invitation for crafting engaging designs",
    icon: <FaFileCircleQuestion />,
    unRead: true,
    sendTime: "2023-06-01T09:35:31.820Z",
  },
  {
    id: 2,
    name: "Isomorphic dashboard redesign",
    icon: <FaFileCircleQuestion />,
    unRead: true,
    sendTime: "2023-05-30T09:35:31.820Z",
  },
  {
    id: 3,
    name: "3 New Incoming Project Files:",
    icon: <FaFileCircleQuestion />,
    unRead: false,
    sendTime: "2023-06-01T09:35:31.820Z",
  },
  {
    id: 4,
    name: "Swornak purchased isomorphic",
    icon: <FaFileCircleQuestion />,
    unRead: false,
    sendTime: "2023-05-21T09:35:31.820Z",
  },
  {
    id: 5,
    name: "Task #45890 merged with #45890 in “Ads Pro Admin Dashboard project:",
    icon: <FaFileCircleQuestion />,
    unRead: true,
    sendTime: "2023-06-01T09:35:31.820Z",
  },
  {
    id: 6,
    name: "3 new application design concepts added",
    icon: <FaFileCircleQuestion />,
    unRead: true,
    sendTime: "2023-05-15T09:35:31.820Z",
  },
  {
    id: 7,
    name: "Your order has been placed",
    icon: <FaFileCircleQuestion />,
    unRead: false,
    sendTime: "2023-05-16T09:35:31.820Z",
  },
  {
    name: "Order has been shipped to #123221",
    icon: <FaFileCircleQuestion />,
    unRead: false,
    sendTime: "2023-05-01T09:35:31.820Z",
  },
];

function NotificationsList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="w-[320px] text-left rtl:text-right sm:w-[360px] 2xl:w-[420px]">
      <div className="mb-3 flex items-center justify-between ps-6">
        <Title as="h5">Notifications</Title>
      </div>
      <div className="max-h-[420px] overflow-auto">
        <div className="grid cursor-pointer grid-cols-1 gap-1 ps-4">
          {data.map((item) => (
            <div
              key={item.name + item.id}
              className="group grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded bg-gray-100/70 p-1 dark:bg-gray-50/50 [&>svg]:h-auto [&>svg]:w-5">
                {item.icon}
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                <div className="w-full">
                  <Title
                    as="h6"
                    className="mb-0.5 w-11/12 truncate text-sm font-semibold"
                  >
                    {item.name}
                  </Title>
                  {/* <span className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                    {dayjs(item.sendTime).fromNow(true)}
                  </span> */}
                </div>
                <div className="ms-auto flex-shrink-0">
                  {item.unRead ? (
                    <Badge
                      renderAsDot
                      size="lg"
                      color="primary"
                      className="scale-90"
                    />
                  ) : (
                    <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                      <PiCheck className="h-auto w-[9px]" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className="-me-6 block px-6 pb-0.5 pt-3 text-center hover:underline"
      >
        View All Activity
      </div>
    </div>
  );
}

export default function NotificationDropdown({
  children,
}: {
  children: JSX.Element & { ref?: RefObject<unknown> };
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isOpen, setIsOpen] = useState(false);

  return (
    <Popover placement={"bottom-end"}>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="z-50 pb-6 pe-6 ps-0 pt-5 h-fit overflow-auto dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex">
        <NotificationsList setIsOpen={setIsOpen} />
      </Popover.Content>
    </Popover>
  );
}
