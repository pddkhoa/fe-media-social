import ModalReportUser from "@/components/modal/ModalReportUser";
import { useModal } from "@/hooks/useModal";
import { UserWall } from "@/type/wall";
import { FC } from "react";

type DropdownOptionProps = {
    data: UserWall | undefined;
};

const DropdownOption: FC<DropdownOptionProps> = ({ data }) => {
    const { openModal } = useModal();

    return (
        <div className="w-64 text-left rtl:text-right text-sm">
            <div className="grid px-2 py-2 font-medium text-gray-700">
                <div
                    onClick={() => {
                        openModal({ view: <ModalReportUser data={data} /> });
                    }}
                    className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-slate-200 cursor-pointer"
                >
                    Report User
                </div>
            </div>
        </div>
    );
};

export default DropdownOption;
