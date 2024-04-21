import useAuth from "@/hooks/useAuth";
import ChatServices from "@/services/chat";
import { MessageType } from "@/type/chat";
import { FC } from "react";
import toast from "react-hot-toast";

type DropdownOptionMessageProps = {
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    data: MessageType;
};

const DropdownOptionMessage: FC<DropdownOptionMessageProps> = ({
    setIsDelete,
    data,
}) => {
    const { axiosJWT } = useAuth();

    const handleDelete = async (id: string) => {
        if (setIsDelete) {
            const { body } = await ChatServices.deleteMessage(id, axiosJWT);
            if (body?.success) {
                toast.success(body.message);
                setIsDelete(true);
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
                        handleDelete(data?._id);
                    }}
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Delete
                </div>
            </div>
        </div>
    );
};

export default DropdownOptionMessage;
