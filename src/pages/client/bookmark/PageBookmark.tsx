import PageHeader from "@/components/breadcrumb/PageHeader";
import ListBookmark from "@/components/module/bookmark/ListBookmark";
import GroupHeader from "@/components/module/group/GroupHeader";
import BlogServices from "@/services/blog";
import { getPostBookmark } from "@/store/blogSlice";
import { RootState } from "@/store/store";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Loader } from "rizzui";

const pageHeader = {
    title: "My Bookmark",
    breadcrumb: [
        {
            href: "/bookmark",
            name: "My Bookmark",
        },
    ],
};

const PageBookmark = () => {
    const [layout, setLayout] = useState<string>("grid");
    const [isLoading, setIsLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const dispatch = useDispatch();
    const listBlog = useSelector(
        (state: RootState) => state.post.listPostBookmark
    );

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await BlogServices.getAllBlogBookmark();
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
