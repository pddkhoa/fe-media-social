import { useModal } from "@/hooks/useModal";
import { User } from "@/type/user";
import { FC, Fragment, useRef, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { Avatar, Button, Empty, Input, SearchNotFoundIcon } from "rizzui";

type ModalListUserProps = {
    data: User[];
};
const ModalListUser: FC<ModalListUserProps> = ({ data }) => {
    const inputRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const { closeModal } = useModal();

    let menuItemsFiltered = data;
    if (searchText.length > 0) {
        menuItemsFiltered = data?.filter((item: any) => {
            const label = item.name;
            return (
                label.match(searchText.toLowerCase()) ||
                (label.toLowerCase().match(searchText.toLowerCase()) && label)
            );
        });
    }

    return (
        <div className="p-2">
            <div className="flex items-center gap-3 px-5 py-4">
                <Input
                    variant="flat"
                    value={searchText}
                    ref={inputRef}
                    onChange={(e) => setSearchText(() => e.target.value)}
                    placeholder="Search here"
                    className="w-full"
                    prefix={
                        <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
                    }
                    suffix={
                        searchText && (
                            <Button
                                size="sm"
                                variant="text"
                                className="h-auto w-auto px-0"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSearchText(() => "");
                                }}
                            >
                                Clear
                            </Button>
                        )
                    }
                />
            </div>
            <div className="custom-scrollbar max-h-[60vh] overflow-y-auto border-t border-gray-300 px-2 py-4">
                <>
                    {menuItemsFiltered?.length === 0 ? (
                        <Empty
                            className="scale-75"
                            image={<SearchNotFoundIcon />}
                            text="No Result Found"
                            textClassName="text-xl"
                        />
                    ) : null}
                    {menuItemsFiltered?.map((item, index) => {
                        return (
                            <Fragment key={item.name + "-" + index}>
                                <div className="relative my-0.5 flex items-center rounded-lg px-3 py-2 text-sm hover:bg-gray-200 focus:outline-none focus-visible:bg-gray-100 dark:hover:bg-gray-200 dark:hover:backdrop-blur-lg">
                                    <span className="inline-flex items-center justify-center rounded-md ">
                                        <Avatar
                                            src={item.avatar.url}
                                            name={item.name}
                                        />
                                    </span>
                                    <div className="flex items-center justify-between ms-3 w-full  gap-0.5">
                                        <span className="font-medium capitalize text-gray-900 dark:text-gray-700">
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })}
                </>
            </div>
            <div className="flex justify-end w-full gap-5 p-2">
                <Button size="sm" onClick={closeModal} variant="flat">
                    Close
                </Button>
            </div>
        </div>
    );
};

export default ModalListUser;
