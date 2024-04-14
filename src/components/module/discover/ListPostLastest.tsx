import { Post } from "@/type/post";
import { FC } from "react";
import { PiArrowsClockwiseFill } from "react-icons/pi";
import { Empty, Button } from "rizzui";
import PostCard from "../post/PostCard";
import { likePostLastest, savePostLastest } from "@/store/discoverSlice";
import { Socket } from "socket.io-client";

type ListPostLastestProps = {
    data: Post[];
    layout: string;
    loader: false;
    totalPage: number;
    currentPage: number;
    handleLoadMore: () => void;
    handleCommentPost: (
        data: {
            blogId: string;
            replyToCommentId: string | null;
            content: string;
        },
        userID: any
    ) => Promise<void>;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
    socket: Socket | undefined;
};

const ListPostLastest: FC<ListPostLastestProps> = ({
    data,
    totalPage,
    currentPage,
    handleLoadMore,
    handleCommentPost,
    setIsDelete,
    socket,
}) => {
    return (
        <div className="px-2 mt-10  w-full  @2xl:mt-7 @6xl:mt-0">
            <div className="grid grid-cols-3 gap-5">
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <PostCard
                            key={item._id}
                            data={item}
                            setIsDelete={setIsDelete}
                            actionDispatchLike={likePostLastest(item._id)}
                            actionDispatchSave={savePostLastest(item._id)}
                            handleCommentPost={handleCommentPost}
                            socket={socket}
                        />
                    ))
                ) : (
                    <div className="col-span-3">
                        <Empty />
                    </div>
                )}
            </div>
            {currentPage < totalPage && (
                <div className="mt-8 flex justify-center">
                    <Button
                        variant="text"
                        size="lg"
                        className="flex items-center"
                        onClick={() => handleLoadMore()}
                    >
                        <PiArrowsClockwiseFill className="text-xl" />
                        <span className="ms-2">Load More</span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ListPostLastest;
