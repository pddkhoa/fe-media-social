import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import CategoriesServices from "@/services/categories";
import ChatServices from "@/services/chat";
import { User } from "@/type/user";
import { useFormik } from "formik";
import { FC, Fragment, useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import {
    Input,
    Button,
    Loader,
    Empty,
    SearchNotFoundIcon,
    Title,
    Checkbox,
    Avatar,
} from "rizzui";
import * as Yup from "yup";

type ModalCreateGroupChatProps = {
    setIsAddGroup: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalCreateGroupChat: FC<ModalCreateGroupChatProps> = ({
    setIsAddGroup,
}) => {
    const inputRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const { closeModal } = useModal();
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [dataUser, setDataUser] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { axiosJWT } = useAuth();
    const [isCreating, setIsCreating] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await CategoriesServices.getUserFriend(axiosJWT);
            if (body?.success) {
                setDataUser(body?.result);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataUser]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    let menuItemsFiltered = dataUser;
    if (searchText.length > 0) {
        menuItemsFiltered = dataUser?.filter((item: any) => {
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

    const formik = useFormik({
        initialValues: {
            chatName: "",
            userIds: "",
        },
        validationSchema: Yup.object().shape({
            chatName: Yup.string().required("Group name is required."),
        }),

        validateOnChange: true,
        onSubmit: async (values) => {
            const report = {
                ...values,
                userIds: selectedMembers,
            };
            setIsCreating(true);
            const { body } = await ChatServices.createGroupChat(
                {
                    userIds: report.userIds,
                    chatName: report.chatName,
                },
                axiosJWT
            );
            if (body?.success) {
                toast.success(body?.message);
                closeModal();
                setIsCreating(false);
                setIsAddGroup(true);
            } else {
                toast.error(body?.message || "Error");
                setIsCreating(false);
            }
        },
    });

    const handleCheckboxChange = (userId: string) => {
        setSelectedMembers((prevSelectedMembers: any) => {
            if (prevSelectedMembers.includes(userId)) {
                return prevSelectedMembers.filter(
                    (id: string) => id !== userId
                );
            } else {
                return [...prevSelectedMembers, userId];
            }
        });
    };

    return (
        <form onSubmit={formik.handleSubmit} className="p-2">
            <div className="flex flex-col items-center gap-3 px-5 py-4">
                <Input
                    name="chatName"
                    variant="flat"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.chatName}
                    placeholder="Group Name"
                    label="Group Chat Name"
                    className="w-full"
                />
                <Input
                    variant="flat"
                    label="Search Name"
                    value={searchText}
                    ref={inputRef}
                    onChange={(e) => setSearchText(() => e.target.value)}
                    placeholder="Search here"
                    className="w-full"
                    prefix={
                        <PiMagnifyingGlassBold className="h-4 w-4 text-gray-600" />
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
                                Friends
                            </Title>
                        )}
                        {menuItemsFiltered?.map((item, index) => {
                            return (
                                <Fragment key={item.name + "-" + index}>
                                    <div className="relative  my-0.5 flex items-center rounded-lg px-3 py-2 text-sm hover:bg-gray-200 focus:outline-none focus-visible:bg-gray-100 dark:hover:bg-gray-200 dark:hover:backdrop-blur-lg">
                                        <span className="w-12 items-center justify-center rounded-md ">
                                            <Avatar
                                                size="md"
                                                src={item.avatar.url}
                                                name={item.name}
                                            />
                                        </span>
                                        <div className="flex items-center justify-between ms-3 w-full  gap-0.5">
                                            <span className="font-medium capitalize text-gray-900 dark:text-gray-700">
                                                {item.name}
                                            </span>
                                            <Checkbox
                                                className="m-2"
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        item._id
                                                    )
                                                }
                                                checked={selectedMembers.includes(
                                                    item?._id
                                                )}
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
                    isLoading={isCreating}
                    disabled={isCreating}
                    type="submit"
                    size="sm"
                    variant="solid"
                >
                    Create Group Chat
                </Button>
            </div>
        </form>
    );
};

export default ModalCreateGroupChat;
