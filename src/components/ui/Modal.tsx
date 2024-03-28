import { Modal } from "rizzui";
import { useModal } from "@/hooks/useModal";

export default function GlobalModal() {
    const { isOpen, view, customSize, closeModal } = useModal();

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            customSize={customSize}
            overlayClassName="bg-opacity-40 backdrop-blur-lg"
            containerClassName="dark:bg-gray-100"
        >
            {view}
        </Modal>
    );
}
