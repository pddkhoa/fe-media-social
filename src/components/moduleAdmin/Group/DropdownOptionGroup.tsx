import ModalEditCategory from "@/components/module/group/ModalEditCategory";
import { useModal } from "@/hooks/useModal";
import { CategoryDetail } from "@/type/category";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "rizzui";

type DropdownOptionGroupProps = {
    data: CategoryDetail;
    handleDelete: (idBlog: string) => Promise<void>;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};
const DropdownOptionGroup: FC<DropdownOptionGroupProps> = ({
    data,
    handleDelete,
    setIsActive,
}) => {
    const navigate = useNavigate();
    const { openModal } = useModal();
    const [loading, setLoading] = useState<boolean>(false);

    const onDelete = async (id: string) => {
        setLoading(true);
        try {
            await handleDelete(id);
        } catch (error) {
            console.error("Error deleting post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-64 text-left rtl:text-right text-sm">
            <div className="grid px-2 py-2 font-medium text-gray-700">
                <Button
                    onClick={() => {
                        navigate(`/admin/group/detail/${data._id}`);
                    }}
                    variant="text"
                    className="group my-0.5 flex justify-start items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    View Group
                </Button>
                <Button
                    variant="text"
                    onClick={() => {
                        openModal({
                            view: (
                                <ModalEditCategory
                                    data={data}
                                    setActive={setIsActive}
                                />
                            ),
                            customSize: "1000px",
                        });
                    }}
                    className="group my-0.5 flex justify-start items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Edit Group
                </Button>
                <Button
                    variant="text"
                    disabled={loading}
                    isLoading={loading}
                    onClick={() => onDelete(data._id)}
                    className="group my-0.5 flex items-center justify-start rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Delete Group
                </Button>
            </div>
        </div>
    );
};

export default DropdownOptionGroup;
