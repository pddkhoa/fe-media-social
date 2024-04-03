import { UserWall } from "@/type/wall";
import { FC, useState } from "react";
import { Avatar, Button, Empty } from "rizzui";

type ModalListUserProps = {
    data: UserWall[];
    handleFollow: (id: string) => Promise<void>;
};

const ModalListUser: FC<ModalListUserProps> = ({ data, handleFollow }) => {
    return (
        <div className="h-[400px] pr-3  overflow-y-auto">
            {data && data.length > 0 ? (
                data?.map((item) => (
                    <UserRow
                        row={item}
                        key={item._id}
                        handleFollow={handleFollow}
                    />
                ))
            ) : (
                <Empty text="Not found user" />
            )}
        </div>
    );
};

type UserRowProps = {
    row: UserWall;
    handleFollow: (id: string) => Promise<void>;
};

function UserRow({ row, handleFollow }: UserRowProps) {
    const [isRowPending, setIsRowPending] = useState(false);
    const [stateFollow, setStateFollow] = useState(row?.isfollow);
    const handleFollowClick = async () => {
        setIsRowPending(true);
        try {
            await handleFollow(row._id);
        } catch (error) {
            console.error("Error while following:", error);
        } finally {
            setIsRowPending(false);
        }
    };
    return (
        <div className="flex items-center justify-between pb-3 pt-2 p-4">
            <div className="flex items-center gap-2">
                <Avatar size="lg" name={row.name} src={row.avatar.url} />
                <p className="font-lexend font-medium capitalize text-gray-900">
                    {row.name}
                </p>
            </div>
            <Button
                size="sm"
                rounded="pill"
                isLoading={isRowPending}
                disabled={isRowPending}
                variant={stateFollow ? "solid" : "flat"}
                onClick={() => {
                    handleFollowClick();
                    setStateFollow(!stateFollow);
                }}
                className="font-medium capitalize md:h-9 md:px-4"
            >
                {stateFollow ? "Unfollow" : "Follow"}
            </Button>
        </div>
    );
}

export default ModalListUser;
