import { useModal } from "@/hooks/useModal";
import { useRef, useState, useEffect, Fragment, FC, useCallback } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import {
    Input,
    Button,
    Empty,
    SearchNotFoundIcon,
    Title,
    Loader,
    Avatar,
} from "rizzui";
import useAuth from "@/hooks/useAuth";
import { User } from "@/type/user";
import CategoriesServices from "@/services/categories";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";
import { TYPE_NOTI } from "@/utils/contants";

type ModalInviteMemberProps = {
    isCate: string;
    socket: Socket | undefined;
};

export const ModalInviteMember: FC<ModalInviteMemberProps> = ({
    isCate,
    socket,
}) => {
    const inputRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const { closeModal } = useModal();

    const [dataUser, setDataUser] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { axiosJWT, user } = useAuth();
    const [loadingRows, setLoadingRows] = useState<{ [key: string]: boolean }>(
        {}
    );

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

    const handleInviteMember = async (id: string) => {
        setLoadingRows((prevState) => ({ ...prevState, [id]: true }));
        const { body } = await CategoriesServices.addUserCategories(
            {
                categoryId: isCate,
                userId: id,
            },
            axiosJWT
        );
        if (body?.success) {
            toast.success(body?.message);
            socket?.emit("interaction", {
                fromUser: user.user._id,
                toUser: id,
                type: TYPE_NOTI.INVITE,
                data: user,
            });
            setLoadingRows((prevState) => ({ ...prevState, [id]: false }));
        } else {
            toast.error(body?.message || "Error");
            setLoadingRows((prevState) => ({ ...prevState, [id]: false }));
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
                                            <Button
                                                variant="text"
                                                disabled={
                                                    loadingRows[item?._id]
                                                }
                                                isLoading={
                                                    loadingRows[item?._id]
                                                }
                                                onClick={() =>
                                                    handleInviteMember(
                                                        item?._id
                                                    )
                                                }
                                            >
                                                Invite
                                            </Button>
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
            </div>
        </div>
    );
};
