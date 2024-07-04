import useAuth from "@/hooks/useAuth";
import ChatServices from "@/services/chat";
import {
    getListChatMessagesSuccess,
    readMessage,
    sendMessagesSuccess,
} from "@/store/chatSlice";
import { RootState } from "@/store/store";
import { ChatType, MessageType } from "@/type/chat";
import { FC, useEffect, useRef, useState } from "react";
import {
    PiArrowsOutLight,
    PiDotsThreeOutlineLight,
    PiDotsThreeOutlineVertical,
    PiImagesFill,
    PiX,
} from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
    ActionIcon,
    Avatar,
    Button,
    Empty,
    Popover,
    SearchNotFoundIcon,
} from "rizzui";
import SimpleBar from "simplebar-react";
import { Socket } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import DropdownOptionMessage from "./DropdownOptionMessage";
import DropdownEditMessage from "./DropdownEditMessage";
import { useModal } from "@/hooks/useModal";
import UploadModal from "@/components/modal/UploadModal";
import { pendingUpload, uploadSuccess } from "@/store/imageSlice";
import { TYPE_MESSAGE, TYPE_NOTI, TYPE_UPLOAD } from "@/utils/contants";
import toast from "react-hot-toast";

type ScreenChatProps = {
    chatId: string | undefined;
    socket: Socket | undefined;
    dataChat: ChatType | undefined;
};

export const ScreenChat: FC<ScreenChatProps> = ({
    chatId,
    dataChat,
    socket,
}) => {
    const dispatch = useDispatch();
    const { axiosJWT, user } = useAuth();
    const { openModal, closeModal } = useModal();
    const listMessage = useSelector(
        (state: RootState) => state.chat.getChatMessages
    );
    const [contentMessage, setContentMessage] = useState("");
    const [messages, setMessages] = useState<any>([]);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (socket) {
            socket.on("getMessage", (message) => {
                if (message.chatId === dataChat?._id)
                    dispatch(sendMessagesSuccess(message.text));
            });
            return () => {
                socket.off("getMessage");
            };
        }
    }, [socket, dispatch, messages]);

    const fetchChat = async () => {
        try {
            if (chatId) {
                const { body } = await ChatServices.getMessage(
                    chatId?.toString(),
                    axiosJWT
                );
                if (body?.success) {
                    dispatch(getListChatMessagesSuccess(body.result));
                } else {
                    toast.error(body?.message || "Error");
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        setIsDelete(false);
        setIsSend(false);
        fetchChat();
    }, [isDelete, dispatch, chatId, setMessages, isSend]);

    const handleSendMessage = async () => {
        if (chatId) {
            const { body } = await ChatServices.sendMessage(
                {
                    chatId: chatId,
                    message: imageUrl ? imageUrl : contentMessage,
                    type: imageUrl ? "Image" : "Text",
                },
                axiosJWT
            );
            if (body?.success) {
                socket?.emit("sendMessage", {
                    fromUser: user.user._id,
                    chatId: dataChat?._id,
                    toUser: dataChat?.userReceived?._id,
                    text: body?.result,
                });

                socket?.emit("interactionMessage", {
                    fromUser: user.user._id,
                    chatId: dataChat?._id,
                    toUser: dataChat?.userReceived?._id,
                    type: TYPE_NOTI.CHAT,
                    data: dataChat?.listUser,
                });
                setContentMessage("");
                setImageUrl("");
                setIsSend(true);
            } else {
                toast.error(body?.message || "Error");
            }
        }
    };

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const readMess = async () => {
        if (chatId && !dataChat?.isRead) {
            const { body } = await ChatServices.readChat(
                { chatId: chatId },
                axiosJWT
            );
            if (body?.success) {
                dispatch(readMessage(chatId));
            }
        }
    };

    useEffect(() => {
        if (chatId) setMessages(listMessage);
    }, [listMessage, chatId]);

    const handleUploadIamgeMessage = async (files: FileList) => {
        if (files) {
            dispatch(pendingUpload());
            const formData = new FormData();
            formData.append("image", files[0]);
            const { body } = await ChatServices.uploadImageMessage(
                formData,
                axiosJWT
            );
            if (body?.success) {
                toast.success(body?.message);
                setImageUrl(body?.result);
                closeModal();
                dispatch(uploadSuccess());
            } else {
                toast.error(body?.message || "Error");
                dispatch(uploadSuccess());
            }
        }
    };

    return dataChat ? (
        dataChat?.isGroup ? (
            <div className="pl-8 w-full">
                <div className="flex justify-between items-center mb-2 p-1">
                    <div className="flex gap-3 ">
                        <div className="relative inline-flex">
                            <Avatar
                                size="md"
                                name={dataChat?.chatName as any}
                                src={dataChat.avatar.url}
                            />
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm font-semibold">
                                {dataChat?.chatName}
                            </span>
                        </div>
                    </div>
                    <Popover placement="bottom-start">
                        <Popover.Trigger>
                            <ActionIcon size="sm" variant="outline">
                                <PiDotsThreeOutlineLight />
                            </ActionIcon>
                        </Popover.Trigger>
                        <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                            <DropdownEditMessage idChat={chatId} />
                        </Popover.Content>
                    </Popover>
                </div>
                <div className="flex flex-col justify-between ">
                    <SimpleBar
                        scrollableNodeProps={{ ref: messagesContainerRef }}
                        className="flex flex-col h-[30.5rem] rounded bg-gray-200 overflow-y-auto"
                    >
                        <div className="grid grid-cols-12 gap-y-2 w-full h-fit rounded-md">
                            {messages && messages?.length > 0 ? (
                                messages.map((item: any) => (
                                    <>
                                        {item?.user?._id === user?.user?._id ? (
                                            <MeChat
                                                data={item}
                                                key={item?._id}
                                                setIsDelete={setIsDelete}
                                            />
                                        ) : (
                                            <UserChat
                                                data={item}
                                                key={item?._id}
                                            />
                                        )}
                                    </>
                                ))
                            ) : (
                                <div className="col-span-12 h-[30.5rem]">
                                    <Empty
                                        image={<SearchNotFoundIcon />}
                                        text="No Chat Found"
                                    />
                                </div>
                            )}
                        </div>
                    </SimpleBar>

                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 ">
                        <div>
                            <Button
                                onClick={() => {
                                    openModal({
                                        view: (
                                            <UploadModal
                                                handleUploadImage={
                                                    handleUploadIamgeMessage
                                                }
                                                type={TYPE_UPLOAD.MESSAGE}
                                                isPost={true}
                                            />
                                        ),
                                    });
                                }}
                                variant="outline"
                            >
                                <PiImagesFill className="h-6 w-6" />
                            </Button>
                        </div>
                        <div className="flex-grow ml-4">
                            <div className="relative w-full">
                                {showEmoji && (
                                    <div className="absolute -top-[30rem] right-0">
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setContentMessage(
                                                    (input) => input + e.emoji
                                                );
                                                setShowEmoji(false);
                                            }}
                                        />
                                    </div>
                                )}

                                <>
                                    <div
                                        className={`flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 ${
                                            !imageUrl ? "h-10" : "h-18 mt-4"
                                        }`}
                                    >
                                        {imageUrl ? (
                                            <div className="flex items-center">
                                                <img
                                                    src={imageUrl}
                                                    className="h-16 w-20 p-1 object-cover rounded-xl"
                                                />
                                                <Button
                                                    onClick={() => {
                                                        setImageUrl("");
                                                    }}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Clear
                                                    <PiX className="h-4 w-4 ml-2" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                value={contentMessage}
                                                onChange={(e) =>
                                                    setContentMessage(
                                                        e.target.value
                                                    )
                                                }
                                                onFocus={() => readMess()}
                                                onKeyPress={handleKeyPress}
                                                className="ring-0 w-full rounded-xl"
                                            />
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setShowEmoji(!showEmoji)}
                                        className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </button>
                                </>
                            </div>
                        </div>
                        <div className="ml-4">
                            <Button
                                disabled={
                                    contentMessage === "" && imageUrl === ""
                                        ? true
                                        : false
                                }
                                onClick={() => {
                                    handleSendMessage();
                                }}
                                className="flex items-center justify-center "
                            >
                                <span>Send</span>
                                <span className="ml-2">
                                    <svg
                                        className="w-4 h-4 transform rotate-45 -mt-px"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        />
                                    </svg>
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="pl-8 ">
                <div className="flex justify-between items-center mb-2 p-1">
                    <div className="flex gap-3 ">
                        <div className="relative inline-flex">
                            <Avatar
                                size="md"
                                name={dataChat?.userReceived.name}
                                src={dataChat?.userReceived.avatar.url}
                            />
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm font-semibold">
                                {dataChat?.userReceived?.name}
                            </span>
                        </div>
                    </div>
                    <Popover placement="bottom-start">
                        <Popover.Trigger>
                            <ActionIcon size="sm" variant="outline">
                                <PiDotsThreeOutlineLight />
                            </ActionIcon>
                        </Popover.Trigger>
                        <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                            <DropdownEditMessage idChat={chatId} />
                        </Popover.Content>
                    </Popover>
                </div>
                <div className="flex flex-col justify-between ">
                    <SimpleBar
                        scrollableNodeProps={{ ref: messagesContainerRef }}
                        className="flex flex-col h-[30.5rem] rounded bg-gray-200 overflow-y-auto"
                    >
                        <div className="grid grid-cols-12 gap-y-2 w-full h-fit rounded-md">
                            {messages && messages?.length > 0 ? (
                                messages.map((item: any) => (
                                    <>
                                        {item?.user?._id === user?.user?._id ? (
                                            <MeChat
                                                data={item}
                                                key={item?._id}
                                                setIsDelete={setIsDelete}
                                            />
                                        ) : (
                                            <UserChat
                                                data={item}
                                                key={item?._id}
                                            />
                                        )}
                                    </>
                                ))
                            ) : (
                                <div className="col-span-12 h-[30.5rem]">
                                    <Empty
                                        image={<SearchNotFoundIcon />}
                                        text="No Chat Found"
                                    />
                                </div>
                            )}
                        </div>
                    </SimpleBar>

                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 ">
                        <div>
                            <Button
                                onClick={() => {
                                    openModal({
                                        view: (
                                            <UploadModal
                                                handleUploadImage={
                                                    handleUploadIamgeMessage
                                                }
                                                type={TYPE_UPLOAD.MESSAGE}
                                                isPost={true}
                                            />
                                        ),
                                    });
                                }}
                                variant="outline"
                            >
                                <PiImagesFill className="h-6 w-6" />
                            </Button>
                        </div>
                        <div className="flex-grow ml-4">
                            <div className="relative w-full">
                                {showEmoji && (
                                    <div className="absolute -top-[30rem] right-0">
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setContentMessage(
                                                    (input) => input + e.emoji
                                                );
                                                setShowEmoji(false);
                                            }}
                                        />
                                    </div>
                                )}

                                <>
                                    <div
                                        className={`flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 ${
                                            !imageUrl ? "h-10" : "h-18 mt-4"
                                        }`}
                                    >
                                        {imageUrl ? (
                                            <div className="flex items-center">
                                                <img
                                                    src={imageUrl}
                                                    className="h-16 w-20 p-1 object-cover rounded-xl"
                                                />
                                                <Button
                                                    onClick={() => {
                                                        setImageUrl("");
                                                    }}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Clear
                                                    <PiX className="h-4 w-4 ml-2" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                value={contentMessage}
                                                onKeyPress={handleKeyPress}
                                                onChange={(e) =>
                                                    setContentMessage(
                                                        e.target.value
                                                    )
                                                }
                                                onFocus={() => readMess()}
                                                className="ring-0 w-full rounded-xl"
                                            />
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setShowEmoji(!showEmoji)}
                                        className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </button>
                                </>
                            </div>
                        </div>
                        <div className="ml-4">
                            <Button
                                disabled={
                                    contentMessage === "" && imageUrl === ""
                                        ? true
                                        : false
                                }
                                onClick={() => {
                                    handleSendMessage();
                                }}
                                className="flex items-center justify-center "
                            >
                                <span>Send</span>
                                <span className="ml-2">
                                    <svg
                                        className="w-4 h-4 transform rotate-45 -mt-px"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        />
                                    </svg>
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    ) : (
        <div className="flex justify-center items-center w-full h-full opacity-85">
            <Empty image={<SearchNotFoundIcon />} text="No Chat Found" />
        </div>
    );
};

type ChatProps = {
    data: MessageType;
    setIsDelete?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MeChat: FC<ChatProps> = ({ data, setIsDelete }) => {
    const { openModal } = useModal();
    return (
        <div className="col-start-6 col-end-13 h-fit p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                {data?.user?.avatar ? (
                    <Avatar
                        size="md"
                        name={data?.user?.name}
                        src={data?.user?.avatar?.url}
                    />
                ) : (
                    <Avatar size="md" name="Default" />
                )}
                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    {data?.message?.type === TYPE_MESSAGE.TEXT && (
                        <div>{data?.message?.content}</div>
                    )}

                    {data?.message?.type === TYPE_MESSAGE.IMAGE && (
                        <div className="relative h-40 w-56 group">
                            <img
                                className="h-full w-full object-cover group-hover:opacity-80 cursor-pointer"
                                src={data?.message?.content}
                            />
                            <ActionIcon
                                variant="outline"
                                className="hidden group-hover:block pl-2.5 absolute top-1 right-1"
                                onClick={() => {
                                    openModal({
                                        view: (
                                            <ModalShowImage
                                                data={data.message.content}
                                            />
                                        ),
                                    });
                                }}
                            >
                                <PiArrowsOutLight />
                            </ActionIcon>
                        </div>
                    )}
                </div>
                <div className="relative mr-4">
                    <Popover placement="bottom-start">
                        <Popover.Trigger>
                            <Button variant="text" size="sm">
                                <PiDotsThreeOutlineVertical />
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                            <DropdownOptionMessage
                                setIsDelete={setIsDelete}
                                data={data}
                            />
                        </Popover.Content>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

const UserChat: FC<ChatProps> = ({ data }) => {
    const { openModal } = useModal();
    return (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-center">
                {data?.user?.avatar ? (
                    <Avatar
                        size="md"
                        name={data?.user?.name}
                        src={data?.user?.avatar?.url}
                    />
                ) : (
                    <Avatar size="md" name="Default" />
                )}
                <div className="relative ml-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    {data?.message?.type === TYPE_MESSAGE.TEXT && (
                        <div>{data?.message?.content}</div>
                    )}

                    {data?.message?.type === TYPE_MESSAGE.IMAGE && (
                        <div className="relative h-40 w-56 group">
                            <img
                                className="h-full w-full object-cover group-hover:opacity-80 cursor-pointer"
                                src={data?.message?.content}
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden group-hover:block absolute top-1 right-1"
                                onClick={() => {
                                    openModal({
                                        view: (
                                            <ModalShowImage
                                                data={data.message.content}
                                            />
                                        ),
                                    });
                                }}
                            >
                                <PiArrowsOutLight />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

type ModalShowImageProps = {
    data: string;
};

const ModalShowImage: FC<ModalShowImageProps> = ({ data }) => {
    return (
        <div className="h-full w-full">
            <img src={data} className="object-cover h-full w-full" />
        </div>
    );
};
