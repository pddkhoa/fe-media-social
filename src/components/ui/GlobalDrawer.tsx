import { useDrawer } from "@/hooks/useDrawer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Drawer } from "rizzui";

export default function GlobalDrawer() {
    const { isOpen, view, placement, customSize, closeDrawer } = useDrawer();
    const pathname = useLocation().pathname;

    useEffect(() => {
        closeDrawer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <Drawer
            isOpen={isOpen}
            onClose={closeDrawer}
            placement={placement}
            customSize={customSize}
            overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
            containerClassName="dark:bg-gray-100"
        >
            {view}
        </Drawer>
    );
}
