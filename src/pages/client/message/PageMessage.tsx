import ListChat from "@/components/module/message/ListChat";
import { ScreenChat } from "@/components/module/message/ScreenChat";
import { User } from "@/type/user";
import { useState } from "react";

const PageMessage = () => {
    const [chatId, setChatId] = useState<string>();
    const [userYou, setUserYou] = useState<User>();

    return (
        <>
            <div className=" w-full grid grid-cols-12 border-t -mx-6 -mt-2 ">
                <div className="col-span-3">
                    <ListChat setChatId={setChatId} setUserYou={setUserYou} />
                </div>
                <div className=" col-span-9 p-2">
                    <ScreenChat chatId={chatId} userYou={userYou} />
                </div>
            </div>
        </>
    );
};

export default PageMessage;
