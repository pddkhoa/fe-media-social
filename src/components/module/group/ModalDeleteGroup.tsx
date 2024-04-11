import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import CategoriesServices from "@/services/categories";
import { CategoryDetail } from "@/type/category";
import { cn } from "@/utils/class-name";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { PiXBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Button } from "rizzui";

type ModalDeleteGroupProps = {
    data: CategoryDetail;
};

export const ModalDeleteGroup: FC<ModalDeleteGroupProps> = ({ data }) => {
    const { closeModal } = useModal();
    const [isDelete, setIsDelete] = useState(false);
    const navigate = useNavigate();
    const { axiosJWT } = useAuth();

    const handleDeleteGroup = async (id: string) => {
        try {
            setIsDelete(true);
            const { body } = await CategoriesServices.deleteCategories(
                id,
                axiosJWT
            );
            if (body?.success) {
                setIsDelete(false);
                toast.success(body.message);
                closeModal();
                navigate("/group/my");
            } else {
                setIsDelete(false);
                toast.error(body?.message || "Error");
            }
        } catch (error) {
            setIsDelete(false);
            console.log(error);
        }
    };

    return (
        <div
            className={cn(
                "rounded-2xl border border-gray-100 bg-white @container dark:bg-gray-100"
            )}
        >
            <div className="flex justify-end p-4">
                <button
                    onClick={closeModal}
                    className="hover:bg-gray-200 rounded-md p-1.5"
                >
                    <PiXBold />
                </button>
            </div>
            <div className="relative flex h-full w-full flex-col items-center justify-center p-6 @2xl:p-12 3xl:px-16 4xl:px-28">
                <div className="w-full max-w-[640px]">
                    <div className="mb-8 text-center @2xl:mb-12">
                        <h2 className="mb-2 text-xl @2xl:mb-3 @2xl:text-2xl">
                            Are you sure delete '{data.name}'?
                        </h2>
                        <p className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aspernatur tenetur sit dolor! Quam, amet
                            magnam itaque autem voluptas inventore animi
                            assumenda dolores et vero ratione adipisci
                            necessitatibus sint illo ut?
                        </p>
                    </div>
                    <div className="flex justify-around">
                        <Button
                            size="md"
                            variant="outline"
                            onClick={closeModal}
                        >
                            No
                        </Button>

                        <Button
                            variant="flat"
                            isLoading={isDelete}
                            color="danger"
                            size="md"
                            onClick={() => {
                                handleDeleteGroup(data._id);
                            }}
                        >
                            Yes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
