import { cn } from "@/utils/class-name";
import { UploadIcon } from "./Icon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useModal } from "@/hooks/useModal";
import UploadModal from "../modal/UploadModal";
import { TYPE_UPLOAD } from "@/utils/contants";
import ClientServices from "@/services/client";
import { uploadAvatarSuccess } from "@/store/authSlice";
import toast from "react-hot-toast";
import { pendingUpload, uploadSuccess } from "@/store/imageSlice";

export default function AvatarUpload() {
    const { openModal, closeModal } = useModal();
    const avatar = useSelector((state: RootState) => state.auth.userToken);
    const dispatch = useDispatch();

    const handleUploadAvatar = async (files: FileList) => {
        if (files) {
            dispatch(pendingUpload());
            const formData = new FormData();
            formData.append("image", files[0]);
            const { body } = await ClientServices.uploadAvatar(formData);
            if (body?.success) {
                toast.success(body.message);
                dispatch(uploadAvatarSuccess(body.result.url));
                closeModal();
                dispatch(uploadSuccess());
            } else {
                toast.error(body?.message || "Error");
                dispatch(uploadSuccess());
            }
        }
    };

    return (
        <div className={cn("flex items-center gap-8")}>
            <div
                className={cn(
                    "relative grid h-40 w-40 place-content-center rounded-full border group"
                )}
            >
                {avatar?.user?.avatar?.url ? (
                    <div className="flex">
                        <figure className="absolute inset-0 rounded-full overflow-hidden">
                            <img
                                src={avatar?.user?.avatar?.url}
                                alt="user avatar"
                                className="rounded-full object-cover w-full h-full"
                            />
                        </figure>
                        <div>
                            <button
                                onClick={() =>
                                    openModal({
                                        view: (
                                            <UploadModal
                                                data={avatar?.user?.avatar?.url}
                                                type={TYPE_UPLOAD.PROFILE}
                                                handleUploadImage={
                                                    handleUploadAvatar
                                                }
                                            />
                                        ),
                                    })
                                }
                                type="button"
                                className="absolute inset-0 w-full h-full group-hover:bg-black/30 rounded-full cursor-pointer"
                            >
                                <UploadIcon className="mx-auto h-12 w-12 opacity-80 text-white hidden group-hover:block" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            openModal({
                                view: (
                                    <UploadModal
                                        handleUploadImage={handleUploadAvatar}
                                        type={TYPE_UPLOAD.PROFILE}
                                    />
                                ),
                            });
                        }}
                        className={cn(
                            "absolute inset-0 z-10 grid cursor-pointer place-content-center"
                        )}
                    >
                        <UploadIcon className="mx-auto h-12 w-12" />
                    </div>
                )}
            </div>
        </div>
    );
}
