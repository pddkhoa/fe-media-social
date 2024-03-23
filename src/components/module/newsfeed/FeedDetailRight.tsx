import { Empty, EmptyProductBoxIcon, Title } from "rizzui";
import ListMembers from "./ListMembers";

const FeedDetailRight = () => {
    return (
        <div className="flex flex-col gap-5 p-4 -mt-10 mx-auto divide-y-2 divide-dashed">
            <div className="flex flex-col gap-2">
                <Title as="h6" className="font-medium">
                    Contact Members
                </Title>
                <ListMembers />
            </div>
            <div className="flex flex-col gap-2  pt-4">
                <Title as="h6" className="font-medium">
                    Popular Group
                </Title>
                <div className="flex flex-col gap-5">
                    <Empty
                        image={<EmptyProductBoxIcon />}
                        text="No Product Available"
                    />
                </div>
            </div>
        </div>
    );
};

export default FeedDetailRight;
