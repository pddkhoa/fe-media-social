import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Socket } from "socket.io-client";

type MainLayoutProps = {
    socket?: Socket | undefined;
};

const MainLayout: FC<MainLayoutProps> = ({ socket }) => {
    return (
        <>
            <main className="flex min-h-screen flex-grow overflow-hidden">
                <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
                <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
                    <Header socket={socket} />
                    <div className="flex flex-grow flex-col px-4 pb-6 pt-2 @container md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    );
};

export default MainLayout;
