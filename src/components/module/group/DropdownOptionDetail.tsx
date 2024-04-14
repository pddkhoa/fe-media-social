import { useModal } from "@/hooks/useModal";
import { ModalDeleteGroup } from "./ModalDeleteGroup";
import { CategoryDetail } from "@/type/category";
import { FC } from "react";
import UploadModal from "@/components/modal/UploadModal";
import { ModalAddTags } from "@/components/modal/AddTagsModal";
import ModalRemoveTag from "./ModalRemoveTag";
import { TYPE_UPLOAD } from "@/utils/contants";
import ModalEditCategory from "./ModalEditCategory";
import { User } from "@/type/user";
import { Badge } from "rizzui";
import ModalUserRequest from "./ModalUserRequest";
import { Socket } from "socket.io-client";

type DropdownOptionDetailProps = {
    data: CategoryDetail;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    handleUploadAvatarCategories: (files: FileList) => Promise<void>;
    dataUserReq: User[];
    socket: Socket | undefined;
};

const DropdownOptionDetail: FC<DropdownOptionDetailProps> = ({
    data,
    setIsActive,
    handleUploadAvatarCategories,
    dataUserReq,
    socket,
}) => {
    const { openModal } = useModal();

    return (
        <div className="w-64 text-left rtl:text-right text-sm">
            <div className="grid px-2 py-2 font-medium text-gray-700">
                <div
                    onClick={() => {
                        openModal({
                            view: (
                                <ModalRemoveTag
                                    data={data?.tags}
                                    isCate={data?._id}
                                    setIsActive={setIsActive}
                                />
                            ),
                        });
                    }}
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Remove Tag
                </div>
                <div
                    onClick={() => {
                        openModal({
                            view: (
                                <ModalAddTags
                                    isCate={data?._id}
                                    setIsActive={setIsActive}
                                />
                            ),
                        });
                    }}
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Add Tag
                </div>
                <div
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
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Edit Information
                </div>
                <div
                    onClick={() => {
                        openModal({
                            view: (
                                <UploadModal
                                    data={data?.avatar?.url}
                                    type={TYPE_UPLOAD.CATEGORIES}
                                    handleUploadImage={
                                        handleUploadAvatarCategories
                                    }
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
                        dataUserReq &&
                            openModal({
                                view: (
                                    <ModalUserRequest
                                        data={dataUserReq}
                                        setIsActive={setIsActive}
                                        idCategory={data?._id}
                                        socket={socket}
                                    />
                                ),
                            });
                    }}
                    className="group my-0.5 flex items-center justify-between rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    <span>List User Request</span>
                    {dataUserReq && dataUserReq.length > 0 && (
                        <span>
                            <Badge size="sm" rounded="pill">
                                {dataUserReq.length}
                            </Badge>
                        </span>
                    )}
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
