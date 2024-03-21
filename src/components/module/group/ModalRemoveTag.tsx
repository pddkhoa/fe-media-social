import { useModal } from "@/hooks/useModal";
import TagServices from "@/services/tag";
import { Tag } from "@/type/tag";
import { useRef, useState, useEffect, Fragment, FC } from "react";
import toast from "react-hot-toast";
import { PiMagnifyingGlassBold, PiTagChevronLight } from "react-icons/pi";
import {
    Input,
    Button,
    Empty,
    SearchNotFoundIcon,
    Title,
    Loader,
    Checkbox,
} from "rizzui";

type ModalRemoveTagProps = {
    data?: Tag[];
    isCate?: string;
    setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading?: boolean;
};

const ModalRemoveTag: FC<ModalRemoveTagProps> = ({
    data,
    isCate,
    setIsActive,
    isLoading,
}) => {
    const inputRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const { closeModal } = useModal();
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [checkedTags, setCheckedTags] = useState<Tag[]>([]);
    const [isRemove, setIsRemove] = useState(false);

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

    useEffect(() => {
        if (inputRef?.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            inputRef.current.focus();
        }
        return () => {
            inputRef.current = null;
        };
    }, []);

    useEffect(() => {
        // Kiểm tra mỗi tag trong data xem có nằm trong danh sách đã chọn không
        const updatedCheckedTags = data?.filter((tag) =>
            selectedTags.some((selectedTag) => selectedTag.name === tag.name)
        );

        if (updatedCheckedTags)
            // Cập nhật trạng thái của checkbox
            setCheckedTags(updatedCheckedTags);
    }, [selectedTags, data]); // Thực hiện khi selectedTags hoặc data thay đổi

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

    const arrayIdTag = selectedTags && selectedTags?.map((item) => item._id);

    const handleRemoveTagsToCate = async () => {
        try {
            setIsRemove(true);
            if (isCate && setIsActive && arrayIdTag) {
                const { body } = await TagServices.removeTagFromCate({
                    categoryId: isCate,
                    tagIds: arrayIdTag,
                });
                if (body?.success) {
                    setIsRemove(false);

                    toast.success(body?.message);
                    setIsActive(true);
                    closeModal();
                } else {
                    setIsRemove(false);

                    toast.error(body?.message || "Error");
                }
            }
        } catch (error) {
            setIsRemove(false);

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
                    ) : (
                        <Title
                            as="h6"
                            className="mb-5 px-3 font-semibold dark:text-gray-700"
                        >
                            Quick Page Tags
                        </Title>
                    )}
                </>
                {isLoading ? (
                    <Loader />
                ) : (
                    menuItemsFiltered?.map((item, index) => {
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
                    })
                )}
            </div>
            <div className="flex justify-end w-full gap-5 p-2">
                <Button size="sm" onClick={closeModal} variant="flat">
                    Close
                </Button>
                <Button
                    size="sm"
                    onClick={handleRemoveTagsToCate}
                    variant="solid"
                    isLoading={isRemove}
                    disabled={isRemove}
                >
                    Remove
                </Button>
            </div>
        </div>
    );
};

export default ModalRemoveTag;
