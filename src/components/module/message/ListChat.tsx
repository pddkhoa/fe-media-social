import useAuth from "@/hooks/useAuth";
import ChatServices from "@/services/chat";
import {
    getListChatRequestSuccess,
    getListChatSuccess,
} from "@/store/chatSlice";
import { RootState } from "@/store/store";
import { ChatType } from "@/type/chat";
import { User } from "@/type/user";
import { FC, useCallback, useEffect, useState } from "react";
import {
    PiDotsThreeOutlineVertical,
    PiMagnifyingGlassBold,
} from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Avatar, Button, Empty, Input, Popover, Tab } from "rizzui";
import DropdownOption from "./DropdownOptionChat";

type ListChatProps = {
    setChatId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setUserYou: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const ListChat: FC<ListChatProps> = ({ setChatId, setUserYou }) => {
    const listChat = useSelector((state: RootState) => state.chat.getListChat);
    const listChatRequest = useSelector(
        (state: RootState) => state.chat.getListChatRequest
    );

    const dispatch = useDispatch();
    const { axiosJWT } = useAuth();
    const [activeUserId, setActiveUserId] = useState<string | null>(null);

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
        fetchChat();
        fetchChatRequest();
    }, [fetchChat, fetchChatRequest]);

    const handleUserClick = (userId: any) => {
        setActiveUserId((prevUserId) =>
            prevUserId === userId ? null : userId
        );
    };

    return (
        <div className="absolute  h-[calc(100%-85px)] w-[20%] mx-2  border-r   overflow-auto flex flex-col gap-3 p-2">
            <Input
                variant="flat"
                placeholder="Search here"
                className=""
                prefix={
                    <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
                }
            />

            <Tab>
                <Tab.List>
                    <Tab.ListItem className={"text-sm"}>Mailbox</Tab.ListItem>
                    <Tab.ListItem className={"text-sm"}>
                        Message Request
                    </Tab.ListItem>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        {listChat && listChat.length > 0 ? (
                            listChat.map((item) => (
                                <RowUserListChat
                                    key={item._id}
                                    data={item}
                                    onClick={() => {
                                        setChatId(item?._id.toString());
                                        setUserYou(item?.userReceived);
                                        handleUserClick(
                                            item?.userReceived?._id
                                        );
                                    }}
                                    isActive={
                                        activeUserId ===
                                        item?.userReceived?._id?.toString()
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
                                        setUserYou(item?.userReceived);
                                        handleUserClick(
                                            item?.userReceived._id?.toString()
                                        );
                                    }}
                                    isActive={
                                        activeUserId ===
                                        item?.userReceived?._id?.toString()
                                    }
                                />
                            ))
                        ) : (
                            <Empty />
                        )}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab>
        </div>
    );
};

type RowUserListChatProps = {
    data: ChatType;
    onClick: () => void;
    isActive: boolean;
};

const RowUserListChat: FC<RowUserListChatProps> = ({
    onClick,
    isActive,
    data,
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
                {" "}
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
                        <DropdownOption />
                    </Popover.Content>
                </Popover>
            </div>
        </div>
    );
};

export default ListChat;
