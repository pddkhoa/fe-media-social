import FormCreateAccount from "@/components/form/FormCreateAccount";
import { useModal } from "@/hooks/useModal";
import { PiXBold } from "react-icons/pi";

const ModalCreateAccount = () => {
    const { closeModal } = useModal();
    return (
        <div className="p-6">
            <div className="flex justify-end">
                <button
                    onClick={closeModal}
                    className="hover:bg-gray-200 rounded-md p-1.5"
                >
                    <PiXBold />
                </button>
            </div>
            <FormCreateAccount />
        </div>
    );
};

export default ModalCreateAccount;
