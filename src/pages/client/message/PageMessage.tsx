import ListChat from "@/components/module/message/ListChat";
import { ScreenChat } from "@/components/module/message/ScreenChat";
import { ChatType } from "@/type/chat";
import { FC, useState } from "react";
import { Socket } from "socket.io-client";

type PageMessageProps = {
    socket: Socket | undefined;
};

const PageMessage: FC<PageMessageProps> = ({ socket }) => {
    const [chatId, setChatId] = useState<string>();
    const [dataChat, setDataChat] = useState<ChatType>();

    return (
        <>
            <div className=" w-full grid grid-cols-12 border-t -mx-6 -mt-2 ">
                <div className="col-span-3">
                    <ListChat
                        setChatId={setChatId}
                        setDataChat={setDataChat}
                        socket={socket}
                    />
                </div>
                <div className=" col-span-9 p-2">
                    <ScreenChat
                        chatId={chatId}
                        dataChat={dataChat}
                        socket={socket}
                    />
                </div>
            </div>
        </>
    );
};

export default PageMessage;
