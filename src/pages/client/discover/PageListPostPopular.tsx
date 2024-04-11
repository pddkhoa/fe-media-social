import PageHeader from "@/components/breadcrumb/PageHeader";
import ListPostPopular from "@/components/module/discover/ListPostPopular";
import GroupHeader from "@/components/module/group/GroupHeader";
import useAuth from "@/hooks/useAuth";
import BlogServices from "@/services/blog";
import { doneCommentSuccess, pendingCommentSuccess } from "@/store/blogSlice";
import {
    getBlogPopularFirst,
    getMoreBlogPopular,
    postCommentToPostPopular,
} from "@/store/discoverSlice";
import { RootState } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Loader } from "rizzui";

const pageHeader = {
    title: "Popular",
    breadcrumb: [
        {
            href: "/popular",
            name: "All Popular",
        },
    ],
};

const PageListPostPopular = () => {
    const [layout, setLayout] = useState<string>("grid");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<number>();
    const [isDelete, setIsDelete] = useState(false);

    const listBlog = useSelector(
        (state: RootState) => state.discover.listPostPopular
    );
    const { axiosJWT } = useAuth();

    const fetchData = useCallback(
        async (page: number) => {
            try {
                setIsLoading(true);
                const { body } = await BlogServices.getBlogPopular(
                    page.toString(),
                    axiosJWT
                );
                if (body?.success) {
                    if (page === 1) {
                        dispatch(getBlogPopularFirst(body?.result?.posts));
                    } else {
                        dispatch(getMoreBlogPopular(body?.result?.posts));
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

    const handleCommentPost = async (data: {
        blogId: string;
        replyToCommentId: string | null;
        content: string;
    }) => {
        dispatch(pendingCommentSuccess());
        const { body } = await BlogServices.addComment(data, axiosJWT);
        try {
            if (body?.success) {
                toast.success(body.message);
                dispatch(
                    postCommentToPostPopular({
                        postId: data.blogId,
                        comment: body?.result,
                    })
                );
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
        <>
            <PageHeader
                breadcrumb={pageHeader.breadcrumb}
                title={pageHeader.title}
            ></PageHeader>
            <GroupHeader
                title="Popular"
                layout={layout}
                setLayout={setLayout}
            />
            {isLoading ? (
                <div className="flex justify-center items-center mt-10">
                    <Loader />
                </div>
            ) : listBlog && totalPage && listBlog?.length > 0 ? (
                <ListPostPopular
                    data={listBlog}
                    layout={layout}
                    loader={isLoading}
                    totalPage={totalPage}
                    currentPage={currentPage}
                    handleLoadMore={handleLoadMore}
                    handleCommentPost={handleCommentPost}
                    setIsDelete={setIsDelete}
                />
            ) : (
                <div className="flex justify-center items-center mt-10">
                    <Empty />
                </div>
            )}
        </>
    );
};

export default PageListPostPopular;
