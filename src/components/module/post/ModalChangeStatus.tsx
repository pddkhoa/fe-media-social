import { useModal } from "@/hooks/useModal";
import { cn } from "@/utils/class-name";
import { FC } from "react";
import { PiXBold } from "react-icons/pi";
import { Button } from "rizzui";

type ModalChangeStatusProps = {
    setStatusValue: React.Dispatch<React.SetStateAction<string>>;
    submit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    isLoading: boolean;
};

const ModalChangeStatus: FC<ModalChangeStatusProps> = ({
    setStatusValue,
    submit,
    isLoading,
}) => {
    const { closeModal } = useModal();

    return (
        <div
            className={cn(
                "rounded-2xl border border-gray-100 bg-white @container dark:bg-gray-100"
            )}
        >
            <div className="flex justify-end p-4">
                <button
                    onClick={closeModal}
                    className="hover:bg-gray-200 rounded-md p-1.5"
                >
                    <PiXBold />
                </button>
            </div>
            <div className="relative flex h-full w-full flex-col items-center justify-center p-6 @2xl:p-12 3xl:px-16 4xl:px-28">
                <div className="w-full max-w-[640px]">
                    <div className="mb-8 text-center @2xl:mb-12">
                        <h2 className="mb-2 text-xl @2xl:mb-3 @2xl:text-2xl">
                            Change Status Post
                        </h2>
                    </div>
                    <div className="flex justify-around ">
                        <Button
                            onClick={() => {
                                setStatusValue("Draft");
                                submit();
                                closeModal();
                            }}
                            isLoading={isLoading}
                            size="md"
                            variant="outline"
                        >
                            Draft
                        </Button>
                        <Button
                            onClick={() => {
                                setStatusValue("Published");
                                submit();
                                closeModal();
                            }}
                            size="md"
                            variant="flat"
                        >
                            Public
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalChangeStatus;
