import { cn } from "@/utils/class-name";
import { FC } from "react";
import { PiXBold } from "react-icons/pi";
import { Button } from "rizzui";

type ModalDraftProps = {
    onClose: () => void;
};

const ModalDraft: FC<ModalDraftProps> = ({ onClose }) => {
    return (
        <div
            className={cn(
                "rounded-2xl border border-gray-100 bg-white @container dark:bg-gray-100"
            )}
        >
            <div className="flex justify-end p-4">
                <button
                    onClick={onClose}
                    className="hover:bg-gray-200 rounded-md p-1.5"
                >
                    <PiXBold />
                </button>
            </div>
            <div className="relative flex h-full w-full flex-col items-center justify-center p-6 @2xl:p-12 3xl:px-16 4xl:px-28">
                <div className="w-full max-w-[640px]">
                    <div className="mb-8 text-center @2xl:mb-12">
                        <h2 className="mb-2 text-xl @2xl:mb-3 @2xl:text-2xl">
                            This is draft post!!!
                        </h2>
                        <p className="mt-3 text-sm leading-loose text-gray-500 lg:mt-6 lg:text-base lg:leading-loose">
                            You do not have permission to access to post.
                        </p>
                    </div>
                    <div className="flex justify-around">
                        <Button size="md" variant="outline" onClick={onClose}>
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDraft;
