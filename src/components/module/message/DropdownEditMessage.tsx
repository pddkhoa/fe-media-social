import useAuth from "@/hooks/useAuth";
import ChatServices from "@/services/chat";
import { deleteListChatSuccess } from "@/store/chatSlice";
import { FC } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type DropdownEditMessageProps = {
    idChat: string | undefined;
};

const DropdownEditMessage: FC<DropdownEditMessageProps> = ({ idChat }) => {
    const { axiosJWT } = useAuth();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (idChat) {
            const { body } = await ChatServices.deleteChat(idChat, axiosJWT);
            if (body?.success) {
                dispatch(deleteListChatSuccess(idChat));
                toast.success(body?.message);
            } else {
                toast.error(body?.message || "Error");
            }
        }
    };
    return (
        <div className="w-64 text-left rtl:text-right text-sm">
            <div className="grid px-2 py-2 font-medium text-gray-700">
                <div
                    onClick={() => {
                        handleDelete();
                    }}
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 text-red-500 hover:bg-slate-200 cursor-pointer"
                >
                    Delete Message
                </div>
            </div>
        </div>
    );
};

export default DropdownEditMessage;
