import {
    PiChatCircleDotsFill,
    PiBellSimpleRingingFill,
    PiPlusBold,
} from "react-icons/pi";
import { ActionIcon, Badge, Button } from "rizzui";
import SearchWidget from "../search/SearchWidget";
import MessagesDropdown from "../module/message/MessagesDropdown";
import NotificationDropdown from "../module/notification/NotificationDropdown";
import ProfileMenu from "../dropdown/ProfileMenuDropdown";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import UserServices from "@/services/user";
import { useState, useCallback, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
    getListNotification,
    getListNotificationMess,
} from "@/store/notiSlice";
import { Socket } from "socket.io-client";
import { TYPE_NOTI } from "@/utils/contants";
import Sidebar from "../sidebar/Sidebar";
import HamburgerButton from "./HamburgerButton";

function HeaderMenuRight(socket: HeaderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const dataNoti = useSelector(
        (state: RootState) => state.noti.listNotification
    );
    const dataNotiMess = useSelector(
        (state: RootState) => state.noti.listNotificationMess
    );
    const [isRead, setIsRead] = useState(false);

    const { axiosJWT, user } = useAuth();

    const isAdmin = user.user.roles === "Admin" ? true : false;

    const fetchNoti = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await UserServices.getNotification(axiosJWT);
            if (body?.success) {
                dispatch(getListNotification(body?.result));
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [dispatch]);

    const fetchNotiMess = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await UserServices.getNotificationByType(
                TYPE_NOTI.CHAT,
                axiosJWT
            );
            if (body?.success) {
                dispatch(getListNotificationMess(body?.result));
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        setIsRead(false);
        fetchNoti();
        fetchNotiMess();
    }, [fetchNotiMess, fetchNoti, isRead, socket]);
    const hasUnreadNotification = dataNoti?.some(
        (notification) => !notification.isRead
    );

    const hasUnreadNotificationMess = dataNotiMess?.some(
        (notification) => !notification.isRead
    );

    return (
        <div className="flex  ml-auto shrink-0  items-center gap-7  text-gray-700 ">
            {!isAdmin && (
                <>
                    <Link to={"/create-post"}>
                        <Button
                            variant="outline"
                            className="relative col-span-1 shadow  md:h-9 flex gap-3"
                            size="sm"
                        >
                            New Post
                            <PiPlusBold />
                        </Button>
                    </Link>
                    <MessagesDropdown
                        dataNotiMess={dataNotiMess}
                        isLoading={isLoading}
                        setIsRead={setIsRead}
                    >
                        <ActionIcon
                            aria-label="Messages"
                            variant="text"
                            className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
                        >
                            <PiChatCircleDotsFill className="h-[18px] w-auto" />
                            {hasUnreadNotificationMess && (
                                <Badge
                                    renderAsDot
                                    color="success"
                                    enableOutlineRing
                                    className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
                                />
                            )}
                        </ActionIcon>
                    </MessagesDropdown>
                    <NotificationDropdown
                        dataNoti={dataNoti}
                        isLoading={isLoading}
                        setIsRead={setIsRead}
                    >
                        <ActionIcon
                            aria-label="Notification"
                            variant="text"
                            className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
                        >
                            <PiBellSimpleRingingFill className="h-[18px] w-auto" />
                            {hasUnreadNotification && (
                                <Badge
                                    renderAsDot
                                    color="warning"
                                    enableOutlineRing
                                    className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
                                />
                            )}
                        </ActionIcon>
                    </NotificationDropdown>
                </>
            )}
            <ProfileMenu />
        </div>
    );
}

type HeaderProps = {
    socket: Socket | undefined;
};

const Header: FC<HeaderProps> = ({ socket }) => {
    const { user } = useAuth();

    const isAdmin = user.user.roles === "Admin" ? true : false;
    return (
        <header
            className={
                "sticky top-0 z-50 flex items-center bg-gray-0/80 px-4 py-4 backdrop-blur-xl dark:bg-white md:px-5 lg:px-6 xl:pl-4 2xl:py-5 2xl:pl-6 3xl:px-8 3xl:pl-6 4xl:px-10 4xl:pl-9"
            }
        >
            <HamburgerButton
                view={<Sidebar className="static w-full 2xl:w-full" />}
            />
            {!isAdmin && (
                <div className="flex w-full max-w-2xl items-center">
                    <SearchWidget className="[&_.search-command]:lg:bg-gray-900 [&_.search-command]:lg:text-gray-0" />
                </div>
            )}
            <HeaderMenuRight socket={socket} />
        </header>
    );
};

export default Header;
