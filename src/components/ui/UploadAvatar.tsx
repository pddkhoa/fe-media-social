import { cn } from "@/utils/class-name";
import { UploadIcon } from "./Icon";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useModal } from "@/hooks/useModal";
import UploadModal from "../modal/UploadModal";

export default function AvatarUpload() {
  const { openModal } = useModal();
  const avatar = useSelector((state: RootState) => state.auth.userToken);

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
                    view: <UploadModal data={avatar?.user?.avatar?.url} />,
                  })
                }
                className="absolute inset-0 w-full h-full group-hover:bg-black/30 rounded-full cursor-pointer"
              >
                <UploadIcon className="mx-auto h-12 w-12 opacity-80 text-white hidden group-hover:block" />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              openModal({ view: <UploadModal /> });
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
