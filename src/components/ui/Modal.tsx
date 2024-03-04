import { useEffect } from "react";
import { Modal } from "rizzui";
import { useLocation } from "react-router-dom";
import { useModal } from "@/hooks/useModal";

export default function GlobalModal() {
  const location = useLocation();
  const { isOpen, view, customSize, closeModal } = useModal();

  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
