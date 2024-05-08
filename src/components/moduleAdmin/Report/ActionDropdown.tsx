import useAuth from "@/hooks/useAuth";
import AdminServices from "@/services/admin";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiCheckCircle, PiTrashSimple, PiProhibitInset } from "react-icons/pi";
import { Button } from "rizzui";

type ActionDropdownProps = {
    data: any;
    type: string;
    setAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ActionDropdown({
    data,
    type,
    setAction,
}: ActionDropdownProps) {
    const [isLoadingEvalute, setIsLoadingEvalute] = useState(false);
    const [isLoadingBlockUser, setIsLoadingBlockUser] = useState(false);
    const { axiosJWT } = useAuth();

    const handleBlockUser = async (id: string) => {
        setIsLoadingBlockUser(true);
        const { body } = await AdminServices.blockUser(
            { userId: id },
            axiosJWT
        );

        if (body?.success) {
            setIsLoadingBlockUser(false);
            setAction(true);
            toast.success(body.message);
        } else {
            toast.error(body?.message || "Error");
            setIsLoadingBlockUser(false);
        }
    };

    const handleEvalute = async (id: string) => {
        setIsLoadingEvalute(true);
        const { body } = await AdminServices.evulateReport(
            { reportId: id, type: type, status: true },
            axiosJWT
        );

        if (body?.success) {
            setIsLoadingEvalute(false);
            setAction(true);
            toast.success(body.message);
        } else {
            toast.error(body?.message || "Error");
            setIsLoadingEvalute(false);
        }
    };

    return (
        <div className="w-64 text-left rtl:text-right text-sm">
            <div className="grid px-2 py-2 font-medium text-gray-700">
                <Button
                    variant="text"
                    className="group my-0.5 flex justify-between items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                    onClick={() => {
                        handleEvalute(data?._id);
                    }}
                    isLoading={isLoadingEvalute}
                    disabled={isLoadingEvalute}
                >
                    Evalute Conversation
                    <PiCheckCircle className="h-4 w-4" />
                </Button>
                <Button
                    variant="text"
                    className="group my-0.5 flex justify-between items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                    // onClick={action.actionHandler}
                    disabled={isLoadingBlockUser}
                >
                    Move to trash
                    <PiTrashSimple className="h-4 w-4" />
                </Button>{" "}
                <Button
                    variant="text"
                    className="group my-0.5 flex justify-between items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                    onClick={() => {
                        handleBlockUser(data?.userReport?._id);
                    }}
                    isLoading={isLoadingBlockUser}
                    disabled={isLoadingBlockUser}
                >
                    Block Sender
                    <PiProhibitInset className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
