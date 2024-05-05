import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import AdminServices from "@/services/admin";
import { User } from "@/type/user";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { PiXBold } from "react-icons/pi";
import { Button, Select } from "rizzui";
type options = {
    label: string;
    value: string;
};

type ModalChangeRolesProps = {
    data: User;
    setIsChangeRole: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalChangeRoles: FC<ModalChangeRolesProps> = ({
    data,
    setIsChangeRole,
}) => {
    const optionsRoles = [
        { label: "Admin", value: "Admin" },
        { label: "Support", value: "Editor" },
        { label: "User", value: "Client" },
    ];
    const getObjectGender = (item: string) => {
        return (
            optionsRoles.find((option) => option.value === item) ||
            optionsRoles[0]
        );
    };

    const [valueRoles, setValueRoles] = useState<options>(
        getObjectGender(data?.roles || (optionsRoles[0] as any))
    );
    const { closeModal } = useModal();
    const { axiosJWT } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeRole = async () => {
        setIsLoading(true);
        const { body } = await AdminServices.changeRole(
            { userId: data._id, role: valueRoles.value },
            axiosJWT
        );
        if (body?.success) {
            toast.success(body.message);
            setIsLoading(false);
            setIsChangeRole(true);
            closeModal();
        } else {
            toast.error(body?.message || "Error");
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 flex flex-col gap-5">
            <div className="flex justify-end">
                <button
                    onClick={closeModal}
                    className="hover:bg-gray-200 rounded-md p-1.5"
                >
                    <PiXBold />
                </button>
            </div>
            <Select
                id="roles"
                name="roles"
                label="Select"
                options={optionsRoles}
                value={valueRoles}
                onChange={setValueRoles}
                className={"col-span-2"}
                optionClassName="hover:bg-gray-300/90"
            />
            <Button
                onClick={() => {
                    handleChangeRole();
                }}
                disabled={isLoading}
                isLoading={isLoading}
                variant="solid"
            >
                Save
            </Button>
        </div>
    );
};

export default ModalChangeRoles;
