import useAuth from "@/hooks/useAuth";
import AdminServices from "@/services/admin";
import { User } from "@/type/user";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "rizzui";

type DropdownAccountBlockedProps = {
    data: User;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownAccountBlocked: FC<DropdownAccountBlockedProps> = ({
    data,
    setIsDelete,
}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { axiosJWT } = useAuth();

    const handleOpenUser = async (id: string) => {
        setIsLoading(true);
        const { body } = await AdminServices.openUser({ userId: id }, axiosJWT);

        if (body?.success) {
            setIsDelete(true);
            setIsLoading(false);
            toast.success(body.message);
        } else {
            toast.error(body?.message || "Error");
            setIsLoading(false);
        }
    };

    return (
        <div className="w-64 text-left rtl:text-right text-sm">
            <div className="grid px-2 py-2 font-medium text-gray-700">
                <Button
                    variant="text"
                    onClick={() => {
                        navigate(`/admin/account/edit/${data._id}`);
                    }}
                    className="group my-0.5 flex justify-start items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    View Account
                </Button>

                {data.status === "locked" && (
                    <Button
                        variant="text"
                        onClick={() => {
                            handleOpenUser(data._id);
                        }}
                        disabled={isLoading}
                        isLoading={isLoading}
                        className="group my-0.5 flex justify-start items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                    >
                        Open Account
                    </Button>
                )}
            </div>
        </div>
    );
};

export default DropdownAccountBlocked;
