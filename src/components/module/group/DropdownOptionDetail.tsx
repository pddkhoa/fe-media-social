import { useModal } from "@/hooks/useModal";
import { ModalDeleteGroup } from "./ModalDeleteGroup";
import { CategoryDetail } from "@/type/category";
import { FC, useCallback, useEffect, useState } from "react";
import UploadModal from "@/components/modal/UploadModal";
import { ModalAddTags } from "@/components/modal/AddTagsModal";
import { Tag } from "@/type/tag";
import ClientServices from "@/services/client";

type DropdownOptionDetailProps = {
    data: CategoryDetail;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownOptionDetail: FC<DropdownOptionDetailProps> = ({
    data,
    setIsActive,
}) => {
    const { openModal } = useModal();
    const [dataTag, setDataTag] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDataTag = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await ClientServices.getAllTags();
            if (body?.success) {
                setDataTag(body?.result);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataTag]);

    useEffect(() => {
        fetchDataTag();
    }, [fetchDataTag]);

    return (
        <div className="w-52 text-left rtl:text-right">
            <div className="grid px-2 py-2 font-medium text-gray-700">
                <div
                    onClick={() => {
                        dataTag &&
                            openModal({
                                view: (
                                    <ModalAddTags
                                        data={dataTag}
                                        isCate={data._id}
                                        setIsActive={setIsActive}
                                        isLoading={isLoading}
                                    />
                                ),
                            });
                    }}
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Edit Tag
                </div>
                <div className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer">
                    Edit Information
                </div>
                <div
                    onClick={() => {
                        openModal({
                            view: (
                                <UploadModal
                                    data={data?.avatar?.url}
                                    isCate={data?._id}
                                />
                            ),
                        });
                    }}
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Change Avatar
                </div>
                <div
                    onClick={() => {
                        openModal({ view: <ModalDeleteGroup data={data} /> });
                    }}
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Delete Group
                </div>
            </div>
        </div>
    );
};

export default DropdownOptionDetail;
