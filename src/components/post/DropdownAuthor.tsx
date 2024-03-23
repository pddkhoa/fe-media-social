import BlogServices from "@/services/blog";
import { Post } from "@/type/post";
import { FC } from "react";
import toast from "react-hot-toast";
import { PiTrash, PiPencilDuotone } from "react-icons/pi";

type DropdownAuthorProps = {
    data: Post;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownAuthor: FC<DropdownAuthorProps> = ({ data, setIsDelete }) => {
    const handleDeletPost = async (id: string) => {
        if (id) {
            const { body } = await BlogServices.deletePost(id);
            if (body?.success) {
                toast.success(body?.message);
                setIsDelete(true);
            } else {
                toast.error(body?.message || "Error");
            }
        }
    };

    return (
        <div className="text-left rtl:text-right w-48  grid px-3.5 py-3.5 font-medium text-gray-700">
            <div
                onClick={() => handleDeletPost(data?._id)}
                className="p-1 py-1.5 my-0.5 flex items-center rounded-md  hover:bg-gray-200 cursor-pointer"
            >
                <PiTrash className="mr-2 h-5 w-5" /> Delete
            </div>
            <div className="p-1 py-1.5 my-0.5 flex items-center rounded-md  hover:bg-gray-200 cursor-pointer">
                <PiPencilDuotone className="mr-2 h-5 w-5" /> Edit
            </div>
        </div>
    );
};

export default DropdownAuthor;
