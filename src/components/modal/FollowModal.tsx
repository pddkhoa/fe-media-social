import { useModal } from "@/hooks/useModal";
import { User } from "@/type/user";
import { useState } from "react";
import { PiXBold } from "react-icons/pi";
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
    const [state, setState] = useState(false);
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
                variant={state ? "solid" : "flat"}
                onClick={() => setState(() => !state)}
                className="font-medium capitalize md:h-9 md:px-4"
            >
                {/* {state ? row.buttonText[0] : row.buttonText[1]} */}
                Follow
            </Button>
        </div>
    );
}
