import { useModal } from "@/hooks/useModal";
import { useRef, useState, useEffect, Fragment, FC, useCallback } from "react";
import { PiMagnifyingGlassBold, PiTagChevronLight } from "react-icons/pi";
import {
    Input,
    Button,
    Empty,
    SearchNotFoundIcon,
    Title,
    Checkbox,
    Loader,
} from "rizzui";
import { Tag } from "@/type/tag";
import { Link } from "react-router-dom";
import ClientServices from "@/services/client";
import toast from "react-hot-toast";

type ModalAddTagsProps = {
    data?: Tag[];
    onAddTag?: (tag: Tag) => void;
    isCate?: string;
    setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalAddTags: FC<ModalAddTagsProps> = ({
    data,
    onAddTag,
    isCate,
    setIsActive,
}) => {
    const inputRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const { closeModal } = useModal();
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [checkedTags, setCheckedTags] = useState<Tag[]>([]);
    const [isAdd, setIsAdd] = useState(false);

    const [dataTag, setDataTag] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDataTag = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await ClientServices.getAllTags();
            if (body?.success) {
                setDataTag(body?.result);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataTag]);

    useEffect(() => {
        if (!data) fetchDataTag();
    }, [fetchDataTag, data]);

    let menuItemsFiltered =
        dataTag !== null && dataTag !== undefined && dataTag.length > 0
            ? dataTag
            : data;

    if (searchText.length > 0) {
        menuItemsFiltered = menuItemsFiltered?.filter((item: any) => {
            const label = item.name;
            return (
                label.match(searchText.toLowerCase()) ||
                (label.toLowerCase().match(searchText.toLowerCase()) && label)
            );
        });
    }

    useEffect(() => {
        if (inputRef?.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            inputRef.current.focus();
        }
        return () => {
            inputRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const dataNew =
            dataTag !== null && dataTag !== undefined && dataTag.length > 0
                ? dataTag
                : data;
        // Kiểm tra mỗi tag trong data xem có nằm trong danh sách đã chọn không
        const updatedCheckedTags = dataNew?.filter((tag) =>
            selectedTags.some((selectedTag) => selectedTag.name === tag.name)
        );

        if (updatedCheckedTags) setCheckedTags(updatedCheckedTags);
    }, [selectedTags, data, dataTag]);

    const handleCheckboxChange = (tag: Tag) => {
        // Logic xác định trạng thái checkbox
        const isChecked = checkedTags.some(
            (checkedTag) => checkedTag.name === tag.name
        );

        if (isChecked) {
            setSelectedTags((prevTags) =>
                prevTags.filter((t) => t.name !== tag.name)
            );
        } else {
            setSelectedTags((prevTags) => [...prevTags, tag]);
        }
    };

    const handleAddButtonClick = () => {
        selectedTags.forEach((tag) => {
            if (onAddTag) onAddTag(tag);
        });
        closeModal();
    };

    const arrayIdTag = selectedTags && selectedTags?.map((item) => item._id);

    const handleAddTagsToCate = async () => {
        try {
            setIsAdd(true);
            if (isCate && setIsActive && arrayIdTag) {
                const { body } = await ClientServices.addTagToCate({
                    categoryId: isCate,
                    tagIds: arrayIdTag,
                });
                if (body?.success) {
                    setIsAdd(false);

                    toast.success(body?.message);
                    setIsActive(true);
                    closeModal();
                } else {
                    setIsAdd(false);
                    toast.error(body?.message || "Error");
                }
            }
        } catch (error) {
            setIsAdd(false);
            console.log(error);
        }
    };

    return (
        <div className="p-2">
            <div className="flex items-center gap-3 px-5 py-4">
                <Input
                    variant="flat"
                    value={searchText}
                    ref={inputRef}
                    onChange={(e) => setSearchText(() => e.target.value)}
                    placeholder="Search here"
                    className="w-3/4"
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
                <Button variant="outline" size="sm" className="w-1/4 ms-2">
                    <Link to={"/tags"}>Add New Tags</Link>
                </Button>
            </div>
            <div className="custom-scrollbar max-h-[60vh] overflow-y-auto border-t border-gray-300 px-2 py-4">
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {menuItemsFiltered?.length === 0 ? (
                            <Empty
                                className="scale-75"
                                image={<SearchNotFoundIcon />}
                                text="No Result Found"
                                textClassName="text-xl"
                            />
                        ) : (
                            <Title
                                as="h6"
                                className="mb-5 px-3 font-semibold dark:text-gray-700"
                            >
                                Quick Page Tags
                            </Title>
                        )}
                        {menuItemsFiltered?.map((item, index) => {
                            const isChecked = checkedTags.some(
                                (checkedTag) => checkedTag.name === item.name
                            );

                            return (
                                <Fragment key={item.name + "-" + index}>
                                    <div className="relative my-0.5 flex items-center rounded-lg px-3 py-2 text-sm hover:bg-gray-200 focus:outline-none focus-visible:bg-gray-100 dark:hover:bg-gray-200 dark:hover:backdrop-blur-lg">
                                        <span className="inline-flex items-center justify-center rounded-md border border-gray-300 p-2 text-gray-500">
                                            <PiTagChevronLight className="h-5 w-5" />
                                        </span>
                                        <div className="flex items-center justify-between ms-3 w-full  gap-0.5">
                                            <span className="font-medium capitalize text-gray-900 dark:text-gray-700">
                                                {item.name}
                                            </span>
                                            <Checkbox
                                                className="m-2"
                                                checked={isChecked}
                                                onChange={() =>
                                                    handleCheckboxChange(item)
                                                }
                                            />
                                        </div>
                                    </div>
                                </Fragment>
                            );
                        })}
                    </>
                )}
            </div>
            <div className="flex justify-end w-full gap-5 p-2">
                <Button size="sm" onClick={closeModal} variant="flat">
                    Close
                </Button>
                <Button
                    size="sm"
                    variant="solid"
                    onClick={() => {
                        isCate ? handleAddTagsToCate() : handleAddButtonClick();
                    }}
                    isLoading={isAdd}
                    disabled={isAdd}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};
