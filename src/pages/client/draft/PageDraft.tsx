import PageHeader from "@/components/breadcrumb/PageHeader";
import ListDraft from "@/components/module/draft/ListDraft";
import GroupHeader from "@/components/module/group/GroupHeader";
import BlogServices from "@/services/blog";
import { Post } from "@/type/post";
import { useCallback, useEffect, useState } from "react";

const pageHeader = {
    title: "My Draft",
    breadcrumb: [
        {
            href: "/draft",
            name: "My Draft",
        },
    ],
};

const PageDraft = () => {
    const [layout, setLayout] = useState<string>("grid");
    const [blog, setBlog] = useState<Post[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await BlogServices.getAllBlogDraft();
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
                title="All Draft"
                layout={layout}
                setLayout={setLayout}
            />
            {blog && (
                <ListDraft
                    data={blog}
                    layout={layout}
                    loader={isLoading}
                    setIsDelete={setIsDelete}
                />
            )}
        </div>
    );
};

export default PageDraft;
