import { PiTrash, PiPencilDuotone } from "react-icons/pi";

const DropdownOther = () => {
    return (
        <div className="text-left rtl:text-right w-48  grid px-3.5 py-3.5 font-medium text-gray-700">
            <div className="p-1 py-1.5 my-0.5 flex items-center rounded-md  hover:bg-gray-200 cursor-pointer">
                <PiTrash className="mr-2 h-5 w-5" /> Other
            </div>
            <div className="p-1 py-1.5 my-0.5 flex items-center rounded-md  hover:bg-gray-200 cursor-pointer">
                <PiPencilDuotone className="mr-2 h-5 w-5" /> Bookmark
            </div>
        </div>
    );
};

export default DropdownOther;
