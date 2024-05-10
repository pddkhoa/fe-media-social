import { useModal } from "@/hooks/useModal";
import { ReportType } from "@/type/report";
import { FC, useState } from "react";
import { PiPenDuotone, PiTrashSimple } from "react-icons/pi";
import { Button } from "rizzui";
import ModalAddNewReport from "./ModalAddNewReport";

type DropdownOptionProps = {
    handleDelete: (id: string) => Promise<void>;
    data: ReportType;
    setAction: React.Dispatch<React.SetStateAction<boolean>>;
};

const OptionDropdown: FC<DropdownOptionProps> = ({
    data,
    handleDelete,
    setAction,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { openModal } = useModal();

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
                    onClick={() => {
                        openModal({
                            view: (
                                <ModalAddNewReport
                                    data={data}
                                    setAction={setAction}
                                />
                            ),
                        });
                    }}
                    className="group my-0.5 flex justify-between items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Edit Report
                    <PiPenDuotone className="h-4 w-4" />
                </Button>{" "}
                <Button
                    variant="text"
                    disabled={loading}
                    isLoading={loading}
                    onClick={() => onDelete(data._id)}
                    className="group my-0.5 flex justify-between items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Move to trash
                    <PiTrashSimple className="h-4 w-4" />
                </Button>{" "}
            </div>
        </div>
    );
};

export default OptionDropdown;
