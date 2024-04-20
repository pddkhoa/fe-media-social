import useAuth from "@/hooks/useAuth";
import ChatServices from "@/services/chat";
import {
    getListChatMessagesSuccess,
    sendMessagesSuccess,
} from "@/store/chatSlice";
import { RootState } from "@/store/store";
import { MessageType } from "@/type/chat";
import { User } from "@/type/user";
import { FC, useCallback, useEffect, useState } from "react";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ActionIcon, Avatar, Button, Empty, SearchNotFoundIcon } from "rizzui";

type ScreenChatProps = {
    chatId: string | undefined;
    userYou: User | undefined;
};

export const ScreenChat: FC<ScreenChatProps> = ({ chatId, userYou }) => {
    const dispatch = useDispatch();
    const { axiosJWT, user } = useAuth();
    const listMessage = useSelector(
        (state: RootState) => state.chat.getChatMessages
    );
    const [contentMessage, setContentMessage] = useState("");

    const fetchChat = useCallback(async () => {
        try {
            if (chatId) {
                const { body } = await ChatServices.getMessage(
                    chatId?.toString(),
                    axiosJWT
                );
                if (body?.success) {
                    dispatch(getListChatMessagesSuccess(body.result));
                } else {
                    toast.error(body?.message);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchChat();
    }, [fetchChat, chatId]);

    const handleSendMessage = async () => {
        if (chatId) {
            const { body } = await ChatServices.sendMessage(
                {
                    chatId: chatId,
                    message: contentMessage,
                },
                axiosJWT
            );
            if (body?.success) {
                dispatch(sendMessagesSuccess(body.result));
                setContentMessage("");
            } else {
                toast.error(body?.message);
            }
        }
    };

    return userYou ? (
        <div className="pl-8 ">
            <div className="flex justify-between items-center mb-2 p-1">
                <div className="flex gap-3 ">
                    <div className="relative inline-flex">
                        <Avatar
                            size="md"
                            name={userYou?.name}
                            src={userYou.avatar.url}
                        />
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm font-semibold">
                            {userYou?.name}
                        </span>
                    </div>
                </div>
                <ActionIcon size="sm" variant="flat">
                    <PiDotsThreeOutlineLight />
                </ActionIcon>
            </div>
            <div className="flex flex-col justify-between ">
                <div className="flex flex-col h-[30.5rem] rounded bg-gray-200 overflow-y-auto">
                    <div className="grid grid-cols-12 gap-y-2 w-full h-fit rounded-md   ">
                        {listMessage && listMessage.length > 0 ? (
                            listMessage.map((item) => (
                                <>
                                    {item?.user?._id === user?.user?._id ? (
                                        <MeChat data={item} key={item?._id} />
                                    ) : (
                                        <UserChat data={item} key={item?._id} />
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
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div>
                        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-grow ml-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={contentMessage}
                                onChange={(e) =>
                                    setContentMessage(e.target.value)
                                }
                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            />
                            <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
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
                        </div>
                    </div>
                    <div className="ml-4">
                        <Button
                            disabled={contentMessage === "" ? true : false}
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
        <div className="flex justify-center items-center w-full h-full opacity-85">
            <Empty image={<SearchNotFoundIcon />} text="No Chat Found" />
        </div>
    );
};

type ChatProps = {
    data: MessageType;
};

const MeChat: FC<ChatProps> = ({ data }) => {
    return (
        <div className="col-start-6 col-end-13 h-fit p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                <Avatar
                    size="md"
                    name={data?.user?.name}
                    src={data?.user?.avatar?.url}
                />
                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <div>{data?.message}</div>
                </div>
            </div>
        </div>
    );
};

const UserChat: FC<ChatProps> = ({ data }) => {
    return (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-center">
                <Avatar
                    size="md"
                    name={data?.user?.name}
                    src={data?.user?.avatar?.url}
                />
                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <div>{data?.message}</div>
                </div>
            </div>
        </div>
    );
};
