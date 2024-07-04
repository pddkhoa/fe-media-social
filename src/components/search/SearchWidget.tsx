import { useState, useEffect } from "react";
import { PiMagnifyingGlassBold, PiCommand } from "react-icons/pi";
import { Modal } from "rizzui";
import { useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";
import { cn } from "@/utils/class-name";

export default function SearchWidget({
    className,
    icon,
}: {
    className?: string;
    icon?: React.ReactNode;
}) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                setOpen(!open);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    useEffect(() => {
        setOpen(() => false);
    }, [location.pathname]);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={cn(
                    "group inline-flex items-center focus:outline-none active:translate-y-px xl:h-10 xl:w-full xl:max-w-sm xl:rounded-xl xl:border xl:border-gray-200 xl:py-2 xl:pe-2 xl:ps-3.5 xl:shadow-sm  xl:duration-200 xl:hover:border-gray-900 xl:hover:outline-double xl:hover:outline-[0.5px] xl:hover:outline-gray-900 xl:focus-visible:border-gray-900 xl:focus-visible:outline-double xl:focus-visible:outline-[0.5px] xl:focus-visible:outline-gray-900",
                    className
                )}
            >
                {icon ? (
                    icon
                ) : (
                    <PiMagnifyingGlassBold className="magnifying-glass me-2 h-[18px] w-[18px]" />
                )}
                <span className="placeholder-text hidden text-sm text-gray-600 group-hover:text-gray-900 xl:inline-flex">
                    Type what you are looking for...
                </span>
                <span className="search-command  ms-auto hidden items-center text-sm text-gray-600 lg:flex lg:rounded-md lg:bg-gray-200/70 lg:px-1.5 lg:py-1 lg:text-xs lg:font-semibold xl:justify-normal hover:brightness-150">
                    <PiCommand
                        strokeWidth={1.3}
                        className="h-[15px] w-[15px] text-white"
                    />
                    <p className="text-white">K</p>
                </span>
            </button>

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                overlayClassName="bg-opacity-20  dark:backdrop-blur-sm "
                containerClassName="bg-white  overflow-auto max-w-4xl"
            >
                <SearchBox />
            </Modal>
        </>
    );
}
