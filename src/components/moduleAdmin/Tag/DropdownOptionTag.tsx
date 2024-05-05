import { Tag } from "@/type/tag";
import { FC, useState } from "react";
import { Button } from "rizzui";

type DropdownOptionTagProps = {
    handleDelete: (tagId: string) => Promise<void>;
    data: Tag;
};

const DropdownOptionTag: FC<DropdownOptionTagProps> = ({
    handleDelete,
    data,
}) => {
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
                    variant="text"
                    disabled={loading}
                    isLoading={loading}
                    onClick={() => onDelete(data._id)}
                    className="group my-0.5 flex items-center justify-start rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Delete Tag
                </Button>
            </div>
        </div>
    );
};

export default DropdownOptionTag;
