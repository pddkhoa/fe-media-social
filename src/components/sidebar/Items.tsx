import {
    PiArrowCircleUpFill,
    PiAsteriskSimpleFill,
    PiBellRingingBold,
    PiBookBookmark,
    PiBookmarkSimpleLight,
    PiBracketsAngleFill,
    PiCalendarBold,
    PiChatCenteredFill,
    PiFolderUserFill,
    PiHashFill,
    PiMessengerLogo,
    PiNewspaper,
    PiProjectorScreenChartFill,
    PiReadCvLogo,
    PiSealWarningLight,
} from "react-icons/pi";

export const menuItemsAdmin: any = [
    // label start
    {
        name: "Overview",
    },
    // label end
    {
        name: "Dashboard",
        href: "/",
        icon: <PiProjectorScreenChartFill />,
    },
    // label start
    {
        name: "Manage",
    },
    // label end
    {
        name: "Blogs",
        href: "/admin/blog",
        icon: <PiReadCvLogo />,
    },
    {
        name: "Groups",
        href: "/admin/group",
        icon: <PiAsteriskSimpleFill />,
    },
    {
        name: "Tags",
        href: "/admin/tag",
        icon: <PiHashFill />,
    },
    {
        name: "Account",
        href: "#",
        icon: <PiFolderUserFill />,
        dropdownItems: [
            {
                name: "Account Active",
                href: "/admin/account",
            },
            {
                name: "Account Blocked",
                href: "/admin/account-block",
            },
        ],
    },
    {
        name: "Ticket Reports",
        href: "/admin/report",
        icon: <PiSealWarningLight />,
    },

    // label start
    {
        name: "Support",
    },
    // label end
    {
        name: "Report Issues",
        href: "#",
        icon: <PiAsteriskSimpleFill />,
        dropdownItems: [
            {
                name: "Blog",
                href: "/admin/report/blog",
            },
            {
                name: "Comment",
                href: "/admin/report/comment",
            },
            {
                name: "Tag",
                href: "/admin/report/tag",
            },
            {
                name: "User",
                href: "/admin/report/user",
            },
        ],
    },
    {
        name: "Calendar",
        href: "/setting-calendar",
        icon: <PiCalendarBold />,
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
        name: "Notification",
        href: "/notification",
        icon: <PiBellRingingBold />,
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
        icon: <PiArrowCircleUpFill />,
    },
    {
        name: "Popular",
        href: "/popular",
        icon: <PiChatCenteredFill />,
    },
    {
        name: "Best Discussion",
        href: "/discusstion",
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
            {
                name: "Group Created",
                href: "/group/my-created",
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
