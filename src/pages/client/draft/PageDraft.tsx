import PageHeader from "@/components/breadcrumb/PageHeader";
import ListDraft from "@/components/module/draft/ListDraft";
import GroupHeader from "@/components/module/group/GroupHeader";
import useAuth from "@/hooks/useAuth";
import BlogServices from "@/services/blog";
import { Post } from "@/type/post";
import { useCallback, useEffect, useState } from "react";
import { Empty, Loader } from "rizzui";

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
    const [blog, setBlog] = useState<Post[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const { axiosJWT } = useAuth();
    const [searchText, setSearchText] = useState("");

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await BlogServices.getAllBlogDraft(axiosJWT);
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

    let menuItemsFiltered = blog;
    if (searchText.length > 0) {
        menuItemsFiltered = blog?.filter((item: Post) => {
            const label = item?.title;
            return (
                label?.toLowerCase().match(searchText.toLowerCase()) && label
            );
        });
    }

    return (
        <div>
            {" "}
            <PageHeader
                breadcrumb={pageHeader.breadcrumb}
                title={pageHeader.title}
            ></PageHeader>
            <GroupHeader title="All Draft" setSearchText={setSearchText} />
            {isLoading ? (
                <div className="flex justify-center items-center mt-10">
                    <Loader />
                </div>
            ) : menuItemsFiltered && menuItemsFiltered?.length > 0 ? (
                <ListDraft
                    data={menuItemsFiltered}
                    layout={"grid"}
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

export default PageDraft;
