import PageHeader from "@/components/breadcrumb/PageHeader";
import FeedDetail from "@/components/module/newsfeed/FeedDetail";
import { FC } from "react";
import { Socket } from "socket.io-client";
// import FeedDetailRight from "@/components/module/newsfeed/FeedDetailRight";

const pageHeader = {
    title: "News Feed",
    breadcrumb: [
        {
            href: "/",
            name: "News Feed",
        },
    ],
};

type PageNewsFeedProps = {
    socket: Socket | undefined;
};

const PageNewsFeed: FC<PageNewsFeedProps> = ({ socket }) => {
    return (
        <>
            <PageHeader
                breadcrumb={pageHeader.breadcrumb}
                title={pageHeader.title}
            />
            <div className="grid grid-cols-12 gap-5 p-4">
                <div className="col-span-12 p-4 flex flex-col">
                    <FeedDetail socket={socket} />
                </div>
                {/* <div className="col-span-4 ">
          <FeedDetailRight />
        </div> */}
            </div>
        </>
    );
};

export default PageNewsFeed;
