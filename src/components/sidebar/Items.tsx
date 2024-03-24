import {
    PiAsteriskSimpleFill,
    PiBellRingingBold,
    PiBookBookmark,
    PiBookmarkSimpleLight,
    PiBracketsAngleFill,
    PiChartDonutFill,
    PiChatCenteredFill,
    PiGlobeHemisphereWestFill,
    PiMessengerLogo,
    PiNewspaper,
} from "react-icons/pi";

export const menuItemsAdmin: any = [
    {
        name: "Analytics",
        href: "/",
        icon: <PiChartDonutFill />,
    },
];

export const menuItems = [
    // label start
    {
        name: "Overview",
    },
    // label end
    {
        name: "My Feed",
        href: "/",
        icon: <PiNewspaper />,
    },
    {
        name: "Connection",
        href: "/connection",
        icon: <PiGlobeHemisphereWestFill />,
    },
    {
        name: "Messenger",
        href: "/messenger",
        icon: <PiMessengerLogo />,
    },

    // label start
    {
        name: "Discover",
    },
    // label end
    {
        name: "Lastest",
        href: "/lastest",
        icon: <PiBellRingingBold />,
    },
    {
        name: "Popular",
        href: "/popular",
        icon: <PiChatCenteredFill />,
    },
    {
        name: "Best Discussion",
        href: "/discussion",
        icon: <PiBracketsAngleFill />,
    },

    // label start
    {
        name: "Groups",
    },
    // label end

    {
        name: "Groups",
        href: "#",
        icon: <PiAsteriskSimpleFill />,
        dropdownItems: [
            {
                name: "All Group",
                href: "/group",
            },
            {
                name: "My Group",
                href: "/group/my",
            },
        ],
    },

    // label start
    {
        name: "Manage",
    },
    // label end
    {
        name: "Bookmarks",
        href: "/bookmark",
        icon: <PiBookmarkSimpleLight />,
    },
    {
        name: "My Drafts",
        href: "/draft",
        icon: <PiBookBookmark />,
    },
];
