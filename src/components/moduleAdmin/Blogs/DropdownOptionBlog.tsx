import { Post } from "@/type/post";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "rizzui";

type DropdownOptionBlogProps = {
    data: Post;
    handleDelete: (idBlog: string) => Promise<void>;
};
const DropdownOptionBlog: FC<DropdownOptionBlogProps> = ({
    data,
    handleDelete,
}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const onDelete = async (id: string) => {
        setLoading(true);
        try {
            await handleDelete(id);
        } catch (error) {
            console.error("Error deleting post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-64 text-left rtl:text-right text-sm">
            <div className="grid px-2 py-2 font-medium text-gray-700">
                <Button
                    variant="text"
                    onClick={() =>
                        navigate("/admin/blog/detail", { state: data })
                    }
                    className="group my-0.5 flex justify-start items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    View Detail
                </Button>
                <Button
                    variant="text"
                    onClick={() =>
                        navigate("/admin/blog/edit", {
                            state: {
                                key: data,
                            },
                        })
                    }
                    className="group my-0.5 flex justify-start items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Edit Blog
                </Button>
                <Button
                    variant="text"
                    disabled={loading}
                    isLoading={loading}
                    onClick={() => onDelete(data._id)}
                    className="group my-0.5 flex items-center justify-start rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Delete Blog
                </Button>
            </div>
        </div>
    );
};

export default DropdownOptionBlog;
