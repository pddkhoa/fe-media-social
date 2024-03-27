import { useModal } from "@/hooks/useModal";
import { Post } from "@/type/post";
import { FC } from "react";
import { PiTrash, PiPencilDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { ModalDeletePost } from "./ModalDeletePost";

type DropdownAuthorProps = {
    data: Post;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownAuthor: FC<DropdownAuthorProps> = ({ data, setIsDelete }) => {
    const navigate = useNavigate();
    const { openModal } = useModal();
    return (
        <div className="text-left rtl:text-right w-48  grid px-3.5 py-3.5 font-medium text-gray-700">
            <div
                onClick={() => {
                    openModal({
                        view: (
                            <ModalDeletePost
                                data={data}
                                setDelete={setIsDelete}
                            />
                        ),
                    });
                }}
                className="p-1 py-1.5 my-0.5 flex items-center rounded-md  hover:bg-gray-200 cursor-pointer"
            >
                <PiTrash className="mr-2 h-5 w-5" /> Delete
            </div>
            <div
                onClick={() => {
                    navigate("/edit-post", {
                        state: {
                            key: data,
                        },
                    });
                }}
                className="p-1 py-1.5 my-0.5 flex items-center rounded-md  hover:bg-gray-200 cursor-pointer"
            >
                <PiPencilDuotone className="mr-2 h-5 w-5" /> Edit
            </div>
        </div>
    );
};

export default DropdownAuthor;
