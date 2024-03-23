import { Empty, EmptyProductBoxIcon } from "rizzui";

const FeedDetail = () => {
    return (
        <>
            <div className=" flex flex-col gap-12 p-4 -mt-10 mx-auto">
                <Empty
                    image={<EmptyProductBoxIcon />}
                    text="No Product Available"
                />
            </div>
        </>
    );
};

export default FeedDetail;
