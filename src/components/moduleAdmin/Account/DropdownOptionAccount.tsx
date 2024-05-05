import { useModal } from "@/hooks/useModal";
import { User } from "@/type/user";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "rizzui";
import ModalChangeRoles from "./ModalChangeRoles";

type DropdownOptionAccountProps = {
    data: User;
    setIsChangeRole: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownOptionAccount: FC<DropdownOptionAccountProps> = ({
    data,
    setIsChangeRole,
}) => {
    const navigate = useNavigate();
    const { openModal } = useModal();

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

                <Button
                    variant="text"
                    onClick={() => {
                        openModal({
                            view: (
                                <ModalChangeRoles
                                    data={data}
                                    setIsChangeRole={setIsChangeRole}
                                />
                            ),
                        });
                    }}
                    className="group my-0.5 flex justify-start items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Edit Privacy
                </Button>
                <Button
                    variant="text"
                    className="group my-0.5 flex justify-start items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Block Account
                </Button>
            </div>
        </div>
    );
};

export default DropdownOptionAccount;
