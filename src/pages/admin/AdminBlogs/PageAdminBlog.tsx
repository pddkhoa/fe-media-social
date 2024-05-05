import PageHeader from "@/components/breadcrumb/PageHeader";
import TableListBlogs from "@/components/moduleAdmin/Blogs/TableListBlog";
import useAuth from "@/hooks/useAuth";
import AdminServices from "@/services/admin";
import { Post } from "@/type/post";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Empty, Loader } from "rizzui";

const pageHeader = {
    title: "Blogs",
    breadcrumb: [
        {
            href: "/",
            name: "Dashboard",
        },
        {
            href: "/admin/blog",
            name: "Blog Management",
        },
    ],
};

const PageAdminBlog = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataPost, setDataPost] = useState<Post[]>([]);
    // const { openModal } = useModal();
    const [isDelete, setIsDelete] = useState(false);
    const { axiosJWT } = useAuth();
    const navigate = useNavigate();

    const fetchPost = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await AdminServices.getAllBlog(axiosJWT);
            if (body?.success) {
                setDataPost(body?.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataPost]);

    useEffect(() => {
        setIsDelete(false);
        fetchPost();
    }, [fetchPost, isDelete]);

    return (
        <>
            <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
            >
                <Button
                    onClick={() => {
                        navigate("/admin/blog/create");
                    }}
                    variant="solid"
                    size="sm"
                >
                    Add New Blog
                </Button>
            </PageHeader>

            {isLoading ? (
                <Loader />
            ) : dataPost && dataPost.length > 0 ? (
                <div className="p-4 border rounded">
                    <TableListBlogs
                        data={dataPost}
                        setIsDelete={setIsDelete}
                        className="overflow-hidden overflow-x-hidden"
                    />
                </div>
            ) : (
                <Empty />
            )}
        </>
    );
};

export default PageAdminBlog;
