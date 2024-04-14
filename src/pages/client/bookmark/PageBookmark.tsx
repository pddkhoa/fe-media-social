import PageHeader from "@/components/breadcrumb/PageHeader";
import ListBookmark from "@/components/module/bookmark/ListBookmark";
import GroupHeader from "@/components/module/group/GroupHeader";
import useAuth from "@/hooks/useAuth";
import BlogServices from "@/services/blog";
import {
    doneCommentSuccess,
    getPostBookmark,
    pendingCommentSuccess,
    postCommentToPostBookmark,
} from "@/store/blogSlice";
import { RootState } from "@/store/store";
import { TYPE_NOTI } from "@/utils/contants";
import { useState, useCallback, useEffect, FC } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Loader } from "rizzui";
import { Socket } from "socket.io-client";

const pageHeader = {
    title: "My Bookmark",
    breadcrumb: [
        {
            href: "/bookmark",
            name: "My Bookmark",
        },
    ],
};

type PageBookmarkProps = {
    socket: Socket | undefined;
};

const PageBookmark: FC<PageBookmarkProps> = ({ socket }) => {
    const [layout, setLayout] = useState<string>("grid");
    const [isLoading, setIsLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const dispatch = useDispatch();
    const listBlog = useSelector(
        (state: RootState) => state.post.listPostBookmark
    );
    const { axiosJWT, user } = useAuth();

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await BlogServices.getAllBlogBookmark(axiosJWT);
            if (body?.success) {
                setIsLoading(false);
                dispatch(getPostBookmark(body?.result));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData, isDelete]);

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
                    postCommentToPostBookmark({
                        postId: data.blogId,
                        comment: body?.result,
                    })
                );
                socket?.emit("interaction", {
                    fromUser: user.user._id,
                    toUser: userID,
                    type: TYPE_NOTI.COMMENT,
                    data: user,
                });
                dispatch(doneCommentSuccess());
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
        <div>
            {" "}
            <PageHeader
                breadcrumb={pageHeader.breadcrumb}
                title={pageHeader.title}
            ></PageHeader>
            <GroupHeader
                title="All Bookmark"
                layout={layout}
                setLayout={setLayout}
            />
            {isLoading ? (
                <div className="flex justify-center items-center mt-10">
                    <Loader />
                </div>
            ) : listBlog && listBlog?.length > 0 ? (
                <ListBookmark
                    data={listBlog}
                    layout={layout}
                    loader={isLoading}
                    setIsDelete={setIsDelete}
                    handleCommentPost={handleCommentPost}
                    socket={socket}
                />
            ) : (
                <div className="flex justify-center items-center mt-10">
                    <Empty />
                </div>
            )}
        </div>
    );
};
export default PageBookmark;
