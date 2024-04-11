import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import CategoriesServices from "@/services/categories";
import { User } from "@/type/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiXBold } from "react-icons/pi";
import { Avatar, Button, Title } from "rizzui";

type RowUserRequestProps = {
    row: User;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    idCategory: string;
};

type ModalUserRequestProps = {
    data: User[];
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    idCategory: string;
};

export default function ModalUserRequest({
    data,
    setIsActive,
    idCategory,
}: ModalUserRequestProps) {
    const { closeModal } = useModal();
    return (
        <>
            <div className="flex items-center justify-between pb-2   rounded-md p-5 lg:p-6">
                <Title
                    as="h3"
                    className="text-lg font-semibold text-gray-900 xl:text-xl"
                >
                    Followers
                </Title>
                <Button
                    variant="text"
                    onClick={closeModal}
                    className="h-auto px-1 py-1"
                >
                    <PiXBold className="h-5 w-5 text-base" />
                </Button>
            </div>
            <div className="h-[400px] pr-3  overflow-y-auto">
                {data?.map((item) => (
                    <UserRequestRow
                        row={item}
                        key={item._id}
                        setIsActive={setIsActive}
                        idCategory={idCategory}
                    />
                ))}
            </div>
        </>
    );
}

function UserRequestRow({ row, setIsActive, idCategory }: RowUserRequestProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [stateActice, setStateActive] = useState(false);
    const { axiosJWT } = useAuth();

    const handleEvalute = async (data: {
        categoryId: string;
        user_id: string;
        status: number;
    }) => {
        setIsLoading(true);
        const { body } = await CategoriesServices.evaluteRequestCate(
            data,
            axiosJWT
        );
        if (body?.success) {
            toast.success(body?.message);
            setIsActive(true);
            setIsLoading(false);
            setStateActive(true);
        } else {
            setIsLoading(false);
            toast.error(body?.message || "Error");
        }
    };

    return (
        <div className="flex items-center justify-between pb-3 pt-2 p-4">
            <div className="flex items-center justify-between gap-2">
                <Avatar size="md" name={row?.name} src={row?.avatar?.url} />
                <p className="font-lexend text-md font-medium capitalize text-gray-900">
                    {row?.name}
                </p>
            </div>
            <div className="flex items-center gap-3">
                {stateActice ? (
                    <Button variant="text" disabled>
                        Completed
                    </Button>
                ) : (
                    <>
                        <Button
                            size="sm"
                            rounded="pill"
                            variant="flat"
                            isLoading={isLoading}
                            disabled={isLoading}
                            onClick={() => {
                                handleEvalute({
                                    categoryId: idCategory,
                                    user_id: row._id,
                                    status: 0,
                                });
                            }}
                            className="font-medium capitalize md:h-9 md:px-4"
                        >
                            Reject
                        </Button>
                        <Button
                            size="sm"
                            rounded="pill"
                            isLoading={isLoading}
                            disabled={isLoading}
                            onClick={() => {
                                handleEvalute({
                                    categoryId: idCategory,
                                    user_id: row._id,
                                    status: 1,
                                });
                            }}
                            className="font-medium capitalize md:h-9 md:px-4"
                        >
                            Accept
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
