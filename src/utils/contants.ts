export const UNVERIFIED = "unverified";
export const COMPLETED = "completed";
export const BLOCKED = "blocked";

export const STATUS_USER_GROUP = {
    JOINED: "Join",
    UNJOIN: "UnJoin",
    PENDING: "Pending",
    INVITED: "Invited",
};

export const TYPE_UPLOAD = {
    CATEGORIES: "categories",
    POST: "post",
    PROFILE: "profile",
    MESSAGE: "message",
};

export const TYPE_NOTI = {
    LIKE: "Like",
    COMMENT: "Comment",
    FOLLOW: "Follow",
    INVITE: "Invite",
    ACCEPT: "Accept",
    CHAT: "Chat",
    ACCEPT_BLOG: "AcceptBlog",
    DECLINE_BLOG: "DeclineBlog",
};

export const TYPE_MESSAGE = {
    TEXT: "Text",
    IMAGE: "Image",
};

export const TYPE_SEARCH = {
    BLOG: "Blog",
    CATEGORY: "Category",
    User: "User",
};

export const SOCKET_URL = process.env.SOCKET_IO_URL;

export const ROLES = {
    Administrator: "Administrator",
    Support: "Support",
    Customer: "User",
} as const;

export const TYPE_REPORT = {
    BLOG: "Blog",
    COMMENT: "Comment",
    TAG: "Tag",
    USER: "User",
};
