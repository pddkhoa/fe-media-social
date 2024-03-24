import PageHeader from "@/components/breadcrumb/PageHeader";
import ListBookmark from "@/components/module/bookmark/ListBookmark";
import GroupHeader from "@/components/module/group/GroupHeader";
import BlogServices from "@/services/blog";
import { Post } from "@/type/post";
import { useState, useCallback, useEffect } from "react";

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
    const [blog, setBlog] = useState<Post[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await BlogServices.getAllBlogBookmark();
            if (body?.success) {
                setBlog(body?.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setBlog]);

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
            {blog && (
                <ListBookmark
                    data={blog}
                    layout={layout}
                    loader={isLoading}
                    setIsDelete={setIsDelete}
                />
            )}
        </div>
    );
};
export default PageBookmark;
