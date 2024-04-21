import useAuth from "@/hooks/useAuth";
import ChatServices from "@/services/chat";
import { FC } from "react";
import toast from "react-hot-toast";

type DropdownOptionProps = {
    chatId: string;
    setIsEvalute: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

const DropdownOption: FC<DropdownOptionProps> = ({ chatId, setIsEvalute }) => {
    const { axiosJWT } = useAuth();

    const handleEvalute = async (status: boolean) => {
        if (chatId && setIsEvalute) {
            const { body } = await ChatServices.evaluteMessageRequest(
                {
                    chatId: chatId,
                    status: status,
                },
                axiosJWT
            );

            if (body?.success) {
                toast.success(body.message);
                setIsEvalute(true);
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
                        handleEvalute(true);
                    }}
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Accept Message
                </div>
                <div
                    onClick={() => {
                        handleEvalute(false);
                    }}
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Delete Message
                </div>
            </div>
        </div>
    );
};

export default DropdownOption;
