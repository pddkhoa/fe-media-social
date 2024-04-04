import { atom, useAtom } from "jotai";
import { useTransition } from "react";
import { Badge } from "rizzui";
import SimpleBar from "simplebar-react";
import { cn } from "@/utils/class-name";

export const supportNavItems = [
    {
        value: "all-open",
        label: "All Notification",
        count: 1603,
    },
    {
        value: "Like",
        label: "Like",
        count: 88,
    },
    {
        value: "Comment",
        label: "Comment",
        count: 1515,
    },

    {
        value: "Follow",
        label: "Follow",
        count: 991,
    },
    {
        value: "Invited",
        label: "Invited",
        count: 991,
    },
];

export const tabAtom = atom(supportNavItems[0].value);

// export default function InboxTabs({ className }: { className?: string }) {
//     return <MessageDetails className={cn(className)} />;
// }

export function TabList() {
    const [tab, setTab] = useAtom(tabAtom);
    const [isPending, startTransition] = useTransition();

    function selectTab(nextTab: string) {
        startTransition(() => {
            setTab(nextTab);
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
        count: number;
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
            <Badge
                size="sm"
                variant={isActive ? "solid" : "flat"}
                className={cn(!isActive && "bg-gray-100")}
            >
                {item.count}
            </Badge>
            <span
                className={cn(
                    "absolute -bottom-px left-0 h-0.5 w-full",
                    isActive ? "bg-gray-900" : "bg-transparent"
                )}
            />
        </button>
    );
}
