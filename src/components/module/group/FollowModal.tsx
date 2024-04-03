import { useModal } from "@/hooks/useModal";
import { RootState } from "@/store/store";
import { User } from "@/type/user";
import { PiXBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Title } from "rizzui";

type FollowerRowProps = {
    row: User;
};

type FollowModalProps = {
    data: User[];
};

export default function FollowerModal({ data }: FollowModalProps) {
    const { closeModal } = useModal();
    return (
        <>
            <div className="flex items-center justify-between pb-2   rounded-md p-5 lg:p-6">
                <Title
                    as="h3"
                    className="text-lg font-semibold text-gray-900 xl:text-xl"
                >
                    Followers
                </Title>
                <Button
                    variant="text"
                    onClick={closeModal}
                    className="h-auto px-1 py-1"
                >
                    <PiXBold className="h-5 w-5 text-base" />
                </Button>
            </div>
            <div className="h-[400px] pr-3  overflow-y-auto">
                {data?.map((item) => (
                    <FollowerRow row={item} key={item._id} />
                ))}
            </div>
        </>
    );
}

function FollowerRow({ row }: FollowerRowProps) {
    const navigate = useNavigate();
    const isAuth = useSelector(
        (state: RootState) => state.auth.userToken.user._id
    );

    return (
        <div className="flex items-center justify-between pb-3 pt-2 p-4">
            <div className="flex items-center gap-2">
                <Avatar size="lg" name={row.name} src={row.avatar.url} />
                <p className="font-lexend font-medium capitalize text-gray-900">
                    {row.name}
                </p>
            </div>
            {isAuth !== row._id && (
                <Button
                    size="sm"
                    rounded="pill"
                    variant={"flat"}
                    onClick={() => {
                        navigate(`/profile/${row._id}`);
                    }}
                    className="font-medium capitalize md:h-9 md:px-4"
                >
                    Visit Site
                </Button>
            )}
        </div>
    );
}
