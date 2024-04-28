import { useState, useTransition } from "react";
import { Badge } from "rizzui";
import SimpleBar from "simplebar-react";
import { cn } from "@/utils/class-name";

type TabListProps = {
    setValueTab: React.Dispatch<any>;
    dataTotal: number;
};

export function TabList({ setValueTab, dataTotal }: TabListProps) {
    const supportNavItems = [
        {
            value: "All",
            label: "All Notification",
            count: dataTotal,
        },
        // {
        //     value: "Like",
        //     label: "Like",
        // },
        // {
        //     value: "Comment",
        //     label: "Comment",
        // },

        // {
        //     value: "Follow",
        //     label: "Follow",
        // },
        // {
        //     value: "Invite",
        //     label: "Invite",
        // },
        // {
        //     value: "Accept",
        //     label: "Accept",
        // },
    ];
    const [tab, setTab] = useState(supportNavItems[0].value);
    const [isPending, startTransition] = useTransition();

    function selectTab(nextTab: string) {
        startTransition(() => {
            setTab(nextTab);
            setValueTab(nextTab);
        });
    }

    return (
        <SimpleBar>
            <nav className="flex items-center gap-5 border-b border-gray-300">
                {supportNavItems.map((nav) => (
                    <TabButton
                        item={nav}
                        key={nav.value}
                        isActive={tab === nav.value}
                        onClick={() => selectTab(nav.value)}
                        disabled={isPending}
                    />
                ))}
            </nav>
        </SimpleBar>
    );
}

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    item: {
        value: string;
        label: string;
        count?: number;
    };
    isActive: boolean;
    onClick: () => void;
}
export function TabButton({
    item,
    isActive,
    onClick,
    ...props
}: TabButtonProps) {
    function handleClick() {
        onClick();
    }

    return (
        <button
            className={cn(
                "relative flex items-center gap-2 py-2 text-sm outline-none",
                isActive
                    ? "font-medium text-gray-900"
                    : "text-gray-500 hover:text-gray-800"
            )}
            onClick={handleClick}
            {...props}
        >
            <span className="whitespace-nowrap">{item.label}</span>
            {item.count && (
                <Badge
                    size="sm"
                    variant={isActive ? "solid" : "flat"}
                    className={cn(!isActive && "bg-gray-100")}
                >
                    {item.count}
                </Badge>
            )}
            <span
                className={cn(
                    "absolute -bottom-px left-0 h-0.5 w-full",
                    isActive ? "bg-gray-900" : "bg-transparent"
                )}
            />
        </button>
    );
}
