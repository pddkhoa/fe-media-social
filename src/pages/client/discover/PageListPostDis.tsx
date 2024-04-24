import PageHeader from "@/components/breadcrumb/PageHeader";
import ListPostDiscuss from "@/components/module/discover/ListPostDiscuss";
import GroupHeader from "@/components/module/group/GroupHeader";
import useAuth from "@/hooks/useAuth";
import BlogServices from "@/services/blog";
import { doneCommentSuccess, pendingCommentSuccess } from "@/store/blogSlice";
import {
    getBlogDisFirst,
    getMoreBlogDis,
    postCommentToPostDis,
} from "@/store/discoverSlice";
import { RootState } from "@/store/store";
import { Post } from "@/type/post";
import { TYPE_NOTI } from "@/utils/contants";
import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Loader } from "rizzui";
import { Socket } from "socket.io-client";

const pageHeader = {
    title: "Best Discusstion",
    breadcrumb: [
        {
            href: "/discusstion",
            name: "All Best Discusstion",
        },
    ],
};

type PageListPostDisProps = {
    socket: Socket | undefined;
};

const PageListPostDis: FC<PageListPostDisProps> = ({ socket }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<number>();
    const [isDelete, setIsDelete] = useState(false);
    const { axiosJWT, user } = useAuth();
    const [searchText, setSearchText] = useState("");

    const listBlog = useSelector(
        (state: RootState) => state.discover.listPostBestDis
    );

    const fetchData = useCallback(
        async (page: number) => {
            try {
                setIsLoading(true);
                const { body } = await BlogServices.getBlogDiscuss(
                    page.toString(),
                    axiosJWT
                );
                if (body?.success) {
                    if (page === 1) {
                        dispatch(getBlogDisFirst(body?.result?.posts));
                    } else {
                        dispatch(getMoreBlogDis(body?.result?.posts));
                    }
                    setIsLoading(false);
                    setTotalPage(body?.result?.size);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        },
        [dispatch]
    );

    useEffect(() => {
        fetchData(currentPage);
    }, [fetchData, currentPage, isDelete]);

    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
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
                    postCommentToPostDis({
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
    let menuItemsFiltered = listBlog;
    if (searchText.length > 0) {
        menuItemsFiltered = listBlog?.filter((item: Post) => {
            const label = item?.title;
            return (
                label?.toLowerCase().match(searchText.toLowerCase()) && label
            );
        });
    }

    return (
        <>
            <PageHeader
                breadcrumb={pageHeader.breadcrumb}
                title={pageHeader.title}
            ></PageHeader>
            <GroupHeader
                title="Best Discusstion"
                setSearchText={setSearchText}
            />
            {isLoading ? (
                <div className="flex justify-center items-center mt-10">
                    <Loader />
                </div>
            ) : listBlog && totalPage && listBlog?.length > 0 ? (
                <ListPostDiscuss
                    data={menuItemsFiltered}
                    layout={"grid"}
                    loader={isLoading}
                    totalPage={totalPage}
                    currentPage={currentPage}
                    handleLoadMore={handleLoadMore}
                    handleCommentPost={handleCommentPost}
                    setIsDelete={setIsDelete}
                    socket={socket}
                />
            ) : (
                <div className="flex justify-center items-center mt-10">
                    <Empty />
                </div>
            )}
        </>
    );
};

export default PageListPostDis;
