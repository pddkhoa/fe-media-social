import ModalReportPost from "@/components/modal/ModalReportPost";
import { useModal } from "@/hooks/useModal";
import { Post } from "@/type/post";
import { FC } from "react";
import { PiSealWarning } from "react-icons/pi";

type DropdownOtherProps = {
    data: Post;
};

const DropdownOther: FC<DropdownOtherProps> = ({ data }) => {
    const { openModal } = useModal();

    return (
        <div className="text-left rtl:text-right w-48  grid px-3.5 py-3.5 font-medium text-gray-700">
            <div
                onClick={() => {
                    openModal({ view: <ModalReportPost data={data} /> });
                }}
                className="p-1 py-1.5 my-0.5 flex items-center rounded-md  hover:bg-gray-200 cursor-pointer"
            >
                <PiSealWarning className="mr-2 h-5 w-5" /> Report
            </div>
        </div>
    );
};

export default DropdownOther;
