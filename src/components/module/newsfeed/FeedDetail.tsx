import BlogServices from "@/services/blog";
import {
    doneCommentSuccess,
    getLoadmorePostFeed,
    getPostFeed,
    likePostFeedSuccess,
    pendingCommentSuccess,
    postCommentToPostFeed,
    savePostFeedSuccess,
} from "@/store/blogSlice";
import { RootState } from "@/store/store";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Empty, Loader } from "rizzui";
import PostCard from "../post/PostCard";
import toast from "react-hot-toast";
import { PiArrowsClockwiseFill, PiShareFat } from "react-icons/pi";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Socket } from "socket.io-client";

import { TYPE_NOTI } from "@/utils/contants";

type FeedDetailProps = {
    socket: Socket | undefined;
};

const FeedDetail: FC<FeedDetailProps> = ({ socket }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const listBlog = useSelector((state: RootState) => state.post.listPostFeed);
    const { axiosJWT, user } = useAuth();

    const fetchBlog = useCallback(
        async (page: number) => {
            try {
                setIsLoading(true);
                const { body } = await BlogServices.getBlogInFeed(
                    page.toString(),
                    axiosJWT
                );
                if (body?.success) {
                    if (page === 1) {
                        dispatch(getPostFeed(body?.result?.posts));
                    } else {
                        dispatch(getLoadmorePostFeed(body?.result?.posts));
                    }
                    setTotalPage(body?.result?.size);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        },
        [dispatch]
    );

    useEffect(() => {
        fetchBlog(currentPage);
    }, [fetchBlog, currentPage]);

    const handleLoadMore = () => {
        setCurrentPage((prevPage: number) => prevPage + 1);
    };

    const handleCommentPost = async (
        data: {
            blogId: string;
            replyToCommentId: string | null;
            content: string;
        },
        userID: any
    ) => {
        dispatch(pendingCommentSuccess());

        const { body } = await BlogServices.addComment(data, axiosJWT);
        try {
            if (body?.success) {
                toast.success(body.message);
                dispatch(
                    postCommentToPostFeed({
                        postId: data.blogId,
                        comment: body?.result,
                    })
                );
                dispatch(doneCommentSuccess());
                socket?.emit("interaction", {
                    fromUser: user.user._id,
                    toUser: userID,
                    type: TYPE_NOTI.COMMENT,
                    data: user,
                });
            } else {
                dispatch(doneCommentSuccess());

                toast.error(body?.message || "Error");
            }
        } catch (error) {
            dispatch(doneCommentSuccess());

            console.log(error);
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <Loader variant="spinner" />
                </div>
            ) : (
                <div className=" flex flex-col gap-12  -mt-10 mx-auto">
                    {listBlog && listBlog.length > 0 ? (
                        listBlog.map((item) => (
                            <>
                                {item.shareBy ? (
                                    <div className="flex flex-col max-w-xl p-5 space-y-2 overflow-hidden rounded-md bg-gray-100 border">
                                        <div className="border-b py-2 flex justify-between items-center">
                                            <Link
                                                to={`/profile/${item.shareBy._id}`}
                                                className="flex gap-2 items-center"
                                            >
                                                <Avatar
                                                    src={item.shareBy.name}
                                                    name={item.shareBy.name}
                                                    size="sm"
                                                />
                                                <p className="text-sm font-semibold">
                                                    {item.shareBy.name}
                                                </p>
                                                <p className="text-sm font-normal">
                                                    shared with you
                                                </p>
                                            </Link>
                                            <div>
                                                <PiShareFat />
                                            </div>
                                        </div>
                                        <PostCard
                                            data={item}
                                            key={item._id}
                                            actionDispatchLike={likePostFeedSuccess(
                                                item._id
                                            )}
                                            actionDispatchSave={savePostFeedSuccess(
                                                item._id
                                            )}
                                            handleCommentPost={
                                                handleCommentPost
                                            }
                                            socket={socket}
                                        />
                                    </div>
                                ) : (
                                    <PostCard
                                        data={item}
                                        key={item._id}
                                        actionDispatchLike={likePostFeedSuccess(
                                            item._id
                                        )}
                                        actionDispatchSave={savePostFeedSuccess(
                                            item._id
                                        )}
                                        handleCommentPost={handleCommentPost}
                                        socket={socket}
                                    />
                                )}
                            </>
                        ))
                    ) : (
                        <Empty />
                    )}
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
            )}
        </>
    );
};

export default FeedDetail;
