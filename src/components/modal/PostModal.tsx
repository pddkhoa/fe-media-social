import { Post } from "@/type/post";
import { formatDate } from "@/utils/format-date";
import { useState } from "react";
import {
    PiArrowBendDoubleUpRight,
    PiChatTextBold,
    PiHeartBold,
    PiUsers,
    PiXBold,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import { Avatar, Button, Textarea, Title } from "rizzui";

type PostsModalProps = {
    data: Post;
    onClose: () => void;
};

export default function PostsModal({ data, onClose }: PostsModalProps) {
    return (
        <div className="round grid grow grid-cols-1 gap-0 h-full overflow-hidden rounded-none bg-white dark:bg-gray-100/90 dark:backdrop-blur-xl lg:grid-cols-12 lg:rounded-xl">
            <div className="relative h-full lg:col-span-7">
                <Button
                    rounded="pill"
                    className="absolute right-5 top-5 z-10 h-[30px] w-[30px] p-1 lg:left-5 2xl:hidden"
                    onClick={onClose}
                >
                    <PiXBold className="w-5" />
                </Button>
                <div className=" h-full w-full ">
                    <img
                        src={data?.avatar}
                        alt="random images"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            <div className="flex w-full flex-col gap-10 p-5 lg:col-span-5 xl:p-6 2xl:p-8">
                <ModalCardText data={data} />
                {/* <div className="lg:h-[280px] overflow-auto">
                    {data.commentData.map((item: any) => (
                        <ModalCardComment key={item.user} commentData={item} />
                    ))}
                </div> */}
                <ModalCommentBox />
            </div>
        </div>
    );
}

type ModalCardTextProps = {
    data: Post;
};

function ModalCardText({ data }: ModalCardTextProps) {
    return (
        <>
            <div className="flex gap-4">
                <div className="flex gap-4">
                    <Avatar
                        name={data?.user?.name}
                        className="bg-[#F1A74F] tracking-wider text-white"
                        src={data?.user?.avatar?.url}
                    />
                    <div>
                        <Title as="h2" className="text-base text-gray-1000">
                            {data?.user?.name}
                        </Title>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            {formatDate(data?.createdAt as any)}
                        </p>
                    </div>
                </div>
                <Button color="primary" className="font-500 ms-auto text-white">
                    <PiUsers className="h-auto w-[18px]" />
                    <span className="ms-1.5 inline-block">Follow</span>
                </Button>
            </div>
            <p className="text-sm leading-6 text-gray-500 dark:text-gray-1000 ">
                {data?.description ? (
                    data.description
                ) : (
                    <>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Perferendis voluptates, nostrum, alias modi, aut
                        esse fugiat assumenda minima consequatur laborum enim
                        aliquid pariatur eum at officia. Ipsam iste a obcaecati!
                    </>
                )}
                <Link
                    to={"/post"}
                    state={data}
                    className="font-medium flex gap-2 items-center text-black hover:underline hover:text-blue-600"
                >
                    More Detail <PiArrowBendDoubleUpRight />
                </Link>
            </p>
            <div className="flex items-center justify-between gap-5 border-b border-b-gray-100 pb-6 dark:border-b-gray-400">
                <div className="flex items-center gap-5">
                    <Button
                        variant="text"
                        className="font-500 group ms-auto h-auto p-0 text-gray-700"
                    >
                        <PiHeartBold className="h-auto w-4 text-gray-500 dark:group-hover:text-white" />
                        <span className="ms-1.5 inline-block">Like</span>
                    </Button>
                    <Button
                        variant="text"
                        className="font-500 group ms-auto h-auto p-0 text-gray-700"
                    >
                        <PiChatTextBold className="h-auto w-4 text-gray-500 dark:group-hover:text-white" />
                        <span className="ms-1.5 inline-block">Comment</span>
                    </Button>
                </div>
                <div className="space-x-2">
                    <button
                        aria-label="Share this post"
                        type="button"
                        className="p-2 text-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-4 h-4 fill-current dark:text-black"
                        >
                            <path d="M404,344a75.9,75.9,0,0,0-60.208,29.7L179.869,280.664a75.693,75.693,0,0,0,0-49.328L343.792,138.3a75.937,75.937,0,1,0-13.776-28.976L163.3,203.946a76,76,0,1,0,0,104.108l166.717,94.623A75.991,75.991,0,1,0,404,344Zm0-296a44,44,0,1,1-44,44A44.049,44.049,0,0,1,404,48ZM108,300a44,44,0,1,1,44-44A44.049,44.049,0,0,1,108,300ZM404,464a44,44,0,1,1,44-44A44.049,44.049,0,0,1,404,464Z"></path>
                        </svg>
                    </button>
                    <button
                        aria-label="Bookmark this post"
                        type="button"
                        className="p-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-4 h-4 fill-current dark:text-black"
                        >
                            <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
export type CommentPropsType = {
    commentData: {
        user: string;
        userImg: string;
        userComment: string;
    };
};

function ModalCardComment({ commentData }: CommentPropsType) {
    const renderHtml = (data: string) => {
        return { __html: data };
    };
    return (
        <div className="flex items-start gap-4 pr-3 pt-6">
            <Avatar
                name="Marie Fanned"
                className="bg-[#F1A74F] font-medium tracking-wider text-white"
                src={commentData.userImg}
            />
            <div>
                <Title as="h2" className="text-sm font-medium text-gray-1000">
                    <Link to={"/"} className="inline-block hover:underline">
                        {commentData.user}
                    </Link>
                </Title>
                <span
                    className="mt-1.5 block text-sm font-normal text-gray-800 [&_a]:text-primary-light"
                    dangerouslySetInnerHTML={renderHtml(
                        commentData.userComment
                    )}
                />
                <div className="mt-3 flex gap-6">
                    <LikeCounter />
                    <Button
                        variant="text"
                        size="sm"
                        className="h-auto p-0 font-medium"
                    >
                        Reply
                    </Button>
                    <p className="text-xs font-normal">7 hours</p>
                </div>
            </div>
        </div>
    );
}

function ModalCommentBox() {
    return (
        <div className="relative mt-8">
            <Textarea
                variant="flat"
                size="sm"
                placeholder="Share your thoughts"
                className="w-full resize-none"
                textareaClassName="resize-none py-2 text-sm h-[90px]"
            />
            <Button
                variant="text"
                color="primary"
                className="absolute bottom-2 end-2"
            >
                Post
            </Button>
        </div>
    );
}

function LikeCounter() {
    const [count, setCount] = useState(false);
    return (
        <Button
            variant="text"
            size="sm"
            className="h-auto p-0 font-medium"
            onClick={() => setCount(() => !count)}
        >
            <span className="me-1.5">{count ? 2 : 1}</span> Like
        </Button>
    );
}
