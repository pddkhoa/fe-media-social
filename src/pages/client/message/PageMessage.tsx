import ListChat from "@/components/module/message/ListChat";
import { ScreenChat } from "@/components/module/message/ScreenChat";
import { socket } from "@/utils/socket";

const PageMessage = () => {
    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    return (
        <>
            <button onClick={connect}>Connect</button>
            <button onClick={disconnect}>Disconnect</button>
            <div className="grid grid-cols-12 border-t -mx-6 -mt-2 ">
                <div className="col-span-3 ">
                    <ListChat />
                </div>
                <div className="col-span-9 p-2 overflow-y-hidden">
                    <ScreenChat />
                </div>
            </div>
        </>
    );
};

export default PageMessage;
