import { RootState } from "@/store/store";
import { UserWall } from "@/type/wall";
import { FC } from "react";
import { useSelector } from "react-redux";
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
    const isLoading = useSelector(
        (state: RootState) => state.wall.pendingFollow
    );
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
                isLoading={isLoading}
                disabled={isLoading}
                variant={row.isfollow ? "solid" : "flat"}
                onClick={() => handleFollow(row._id)}
                className="font-medium capitalize md:h-9 md:px-4"
            >
                {row.isfollow ? "Unfollow" : "Follow"}
            </Button>
        </div>
    );
}

export default ModalListUser;
