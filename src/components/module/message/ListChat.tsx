import useAuth from "@/hooks/useAuth";
import ChatServices from "@/services/chat";
import {
    getListChatRequestSuccess,
    getListChatSuccess,
    readMessage,
} from "@/store/chatSlice";
import { RootState } from "@/store/store";
import { ChatType } from "@/type/chat";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
    PiCheck,
    PiDotsThreeOutlineVertical,
    PiMagnifyingGlassBold,
    PiNotePencilFill,
} from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    Avatar,
    Badge,
    Button,
    Empty,
    Input,
    Popover,
    Tab,
    Title,
    Tooltip,
} from "rizzui";
import DropdownOption from "./DropdownOptionChat";
import { useModal } from "@/hooks/useModal";
import ModalCreateGroupChat from "./ModalCreateGroupChat";
import { Socket } from "socket.io-client";

type ListChatProps = {
    setChatId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setDataChat: React.Dispatch<React.SetStateAction<ChatType | undefined>>;
    socket: Socket | undefined;
};

const ListChat: FC<ListChatProps> = ({ setChatId, setDataChat, socket }) => {
    const listChat = useSelector((state: RootState) => state.chat.getListChat);
    const listChatRequest = useSelector(
        (state: RootState) => state.chat.getListChatRequest
    );

    const dispatch = useDispatch();
    const { axiosJWT } = useAuth();
    const [activeUserId, setActiveUserId] = useState<string | null>(null);
    const [isEvalute, setIsEvalute] = useState(false);
    const [isAddgroup, setIsAddGroup] = useState(false);
    const inputRef = useRef(null);
    const [searchText, setSearchText] = useState("");

    const { openModal } = useModal();

    const fetchChat = useCallback(async () => {
        try {
            const { body } = await ChatServices.getListChat(axiosJWT);
            if (body?.success) {
                dispatch(getListChatSuccess(body.result));
            } else {
                toast.error(body?.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [dispatch]);
    const fetchChatRequest = useCallback(async () => {
        try {
            const { body } = await ChatServices.getListChatRequest(axiosJWT);
            if (body?.success) {
                dispatch(getListChatRequestSuccess(body.result));
            } else {
                toast.error(body?.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [dispatch]);

    useEffect(() => {
        setIsAddGroup(false);
        setIsEvalute(false);
        fetchChat();
        fetchChatRequest();
    }, [fetchChat, fetchChatRequest, isEvalute, isAddgroup, socket]);

    useEffect(() => {
        socket?.on("notificationMessage", () => {
            fetchChat();
        });
    }, [socket, fetchChat]);

    const handleUserClick = async (IdChat: string) => {
        const { body } = await ChatServices.readChat(
            { chatId: IdChat },
            axiosJWT
        );
        if (body?.success) {
            dispatch(readMessage(IdChat));
        }
        setActiveUserId((prevId) => (prevId === IdChat ? null : IdChat));
    };

    let menuItemsFiltered = listChat;
    if (searchText.length > 0) {
        menuItemsFiltered = listChat?.filter((item: ChatType) => {
            const label = item?.userReceived?.name;
            return (
                label?.toLowerCase().match(searchText.toLowerCase()) && label
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

    return (
        <>
            <div className="absolute  h-[calc(100%-85px)] w-[20%] mx-2  border-r   overflow-auto flex flex-col gap-3 p-2">
                <div className="flex justify-between items-center">
                    <Title className="text-xl">Chat</Title>
                    <Tooltip content={"Create Group Chat"}>
                        <Button
                            onClick={() => {
                                openModal({
                                    view: (
                                        <ModalCreateGroupChat
                                            setIsAddGroup={setIsAddGroup}
                                        />
                                    ),
                                });
                            }}
                            variant="text"
                            size="sm"
                        >
                            <PiNotePencilFill className="h-6 w-6" />
                        </Button>
                    </Tooltip>
                </div>
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

                <Tab>
                    <Tab.List>
                        <Tab.ListItem
                            className={"text-sm flex gap-2 items-center"}
                        >
                            Mailbox <Badge size="sm">{listChat?.length}</Badge>
                        </Tab.ListItem>
                        <Tab.ListItem
                            className={"text-sm flex gap-2 items-center"}
                        >
                            Message Request
                            <Badge size="sm">{listChatRequest?.length}</Badge>
                        </Tab.ListItem>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            {menuItemsFiltered &&
                            menuItemsFiltered.length > 0 ? (
                                menuItemsFiltered.map((item) => (
                                    <RowUserListChat
                                        key={item._id}
                                        data={item}
                                        onClick={() => {
                                            setChatId(item?._id.toString());
                                            setDataChat(item);
                                            handleUserClick(item?._id);
                                        }}
                                        isActive={
                                            activeUserId ===
                                            item?._id?.toString()
                                        }
                                    />
                                ))
                            ) : (
                                <Empty />
                            )}
                        </Tab.Panel>
                        <Tab.Panel>
                            {" "}
                            {listChatRequest && listChatRequest.length > 0 ? (
                                listChatRequest.map((item) => (
                                    <RowUserListChat
                                        key={item._id}
                                        data={item}
                                        onClick={() => {
                                            setChatId(item?._id.toString());
                                            setDataChat(item);
                                            handleUserClick(
                                                item?.userReceived._id?.toString()
                                            );
                                        }}
                                        isActive={
                                            activeUserId ===
                                            item?.userReceived?._id?.toString()
                                        }
                                        setIsEvalute={setIsEvalute}
                                    />
                                ))
                            ) : (
                                <Empty />
                            )}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab>
            </div>
        </>
    );
};

type RowUserListChatProps = {
    data: ChatType;
    onClick: () => void;
    isActive: boolean;
    setIsEvalute?: React.Dispatch<React.SetStateAction<boolean>>;
};

const RowUserListChat: FC<RowUserListChatProps> = ({
    onClick,
    isActive,
    data,
    setIsEvalute,
}) => {
    const handleButtonClick = () => {
        onClick();
    };
    return (
        <div
            onClick={() => {
                handleButtonClick();
            }}
            className={`flex  justify-between items-center hover:bg-gray-200 p-1 rounded-md cursor-pointer ${
                isActive ? "bg-gray-200" : null
            }`}
        >
            {data.isGroup ? (
                <>
                    <div className="flex gap-3">
                        <div className="relative inline-flex">
                            {data?.avatar ? (
                                <Avatar
                                    size="md"
                                    name={data?.chatName as any}
                                    src={data?.avatar?.url}
                                />
                            ) : (
                                <Avatar size="md" name="Default" />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold truncate">
                                {data?.chatName}
                            </span>
                            <span className="text-[12px] text-gray-500">
                                Click to chat
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="ms-auto flex-shrink-0">
                            {!data.isRead ? (
                                <Badge
                                    renderAsDot
                                    size="lg"
                                    color="primary"
                                    className="scale-90"
                                />
                            ) : (
                                <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                                    <PiCheck className="h-auto w-[9px]" />
                                </span>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex gap-3">
                        <div className="relative inline-flex">
                            {data?.userReceived?.avatar ? (
                                <Avatar
                                    size="md"
                                    name={data?.userReceived?.name}
                                    src={data?.userReceived?.avatar?.url}
                                />
                            ) : (
                                <Avatar size="md" name="No Name" />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold truncate">
                                {data?.userReceived?.name}
                            </span>
                            <span className="text-[12px] text-gray-500">
                                Click to chat
                            </span>
                        </div>
                    </div>

                    <div>
                        {data?.isWait ? (
                            <Popover placement="bottom-start">
                                <Popover.Trigger>
                                    <Button
                                        variant="outline"
                                        className="col-span-2 mx-4"
                                        size="sm"
                                    >
                                        <PiDotsThreeOutlineVertical />
                                    </Button>
                                </Popover.Trigger>
                                <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                                    <DropdownOption
                                        chatId={data._id}
                                        setIsEvalute={setIsEvalute}
                                    />
                                </Popover.Content>
                            </Popover>
                        ) : !data.isRead ? (
                            <Badge
                                renderAsDot
                                size="lg"
                                color="primary"
                                className="scale-90"
                            />
                        ) : (
                            <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                                <PiCheck className="h-auto w-[9px]" />
                            </span>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ListChat;
