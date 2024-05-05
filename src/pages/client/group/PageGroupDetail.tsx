import GroupDetail from "@/components/module/group/GroupDetail";
import { FC } from "react";
import { Socket } from "socket.io-client";

type PageGroupDetailProps = {
    socket?: Socket | undefined;
};

const PageGroupDetail: FC<PageGroupDetailProps> = ({ socket }) => {
    return <GroupDetail socket={socket} />;
};

export default PageGroupDetail;
