import UserServices from "@/services/user";
import { startLoadingPage, endLoadingPage } from "@/store/notiSlice";
import { RootState } from "@/store/store";
import { NotificationType } from "@/type/notification";
import { TYPE_NOTI } from "@/utils/contants";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "rizzui";

type DropdownOptionProps = {
    data: NotificationType | undefined;
};

const DropdownOption: FC<DropdownOptionProps> = ({ data }) => {
    const navigate = useNavigate();
    const loadingPage = useSelector(
        (state: RootState) => state.noti.loadingPage
    );
    const dispatch = useDispatch();

    const handleClickRead = async (noti: NotificationType) => {
        dispatch(startLoadingPage());

        const { body } = await UserServices.readNotification(noti._id);
        if (body?.success) {
            switch (noti.type) {
                case TYPE_NOTI.LIKE:
                    navigate("/post", { state: noti.blog });

                    break;
                case TYPE_NOTI.COMMENT:
                    navigate("/post", { state: noti.blog });

                    break;
                case TYPE_NOTI.INVITE:
                    navigate(`/group/detail/${noti.category?._id}`);

                    break;
                case TYPE_NOTI.FOLLOW:
                    navigate(`/profile/${noti.sender._id}`);

                    break;

                default:
                    break;
            }
            dispatch(endLoadingPage());
        }
    };
    return (
        <div className="w-64 text-left rtl:text-right text-sm">
            <div className="grid px-2 py-2 font-medium text-gray-700">
                {data && (
                    <>
                        <Button
                            isLoading={loadingPage}
                            disabled={loadingPage}
                            variant="text"
                            onClick={() => handleClickRead(data)}
                            className="group my-0.5 flex items-center justify-start  rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                        >
                            Read Notification
                        </Button>
                        <Button
                            variant="text"
                            onClick={() =>
                                navigate(`/profile/${data.sender._id}`)
                            }
                            className="group my-0.5 flex items-center justify-start rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                        >
                            Visit Profile
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default DropdownOption;
