import { useState, useEffect } from "react";
import { PiArrowsClockwiseFill } from "react-icons/pi";
import { Button, Empty, EmptyProductBoxIcon, Modal } from "rizzui";
import PostsModal from "../modal/PostModal";
import { useLocation } from "react-router-dom";
import { Post } from "@/type/post";
import { SkeletonPost } from "../ui/SkeletonLoader";

type PostFeedProps = {
    postData: Post[] | undefined;
    isLoadingPost: boolean;
};

export default function PostFeed({ postData, isLoadingPost }: PostFeedProps) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [postLimit, setPostLimit] = useState(3);
    const [loading, setLoading] = useState(false);
    // const [currentPostID, setCurrentPostID] = useState(100);

    const isFeed = location.pathname === "/feed";

    useEffect(() => {
        setOpen(() => false);
    }, [location.pathname]);

    function handleLoadMore() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setPostLimit(postLimit + 3);
        }, 600);
    }

    let currentPost: any;
    // postData.forEach((item) => {
    //   if (item._id === currentPostID) {
    //     currentPost = item;
    //   }
    // });

    return (
        <>
            <div className="pt-5 container ">
                <div
                    className={`grid ${
                        !isFeed ? "grid-cols-3 gap-5" : "grid-cols-1 gap-12"
                    }`}
                >
                    {isLoadingPost ? (
                        <>
                            <SkeletonPost />
                            <SkeletonPost />
                            <SkeletonPost />
                        </>
                    ) : (
                        <Empty
                            image={<EmptyProductBoxIcon />}
                            text="No Product Available"
                        />
                    )}
                </div>
            </div>

            {postData && postData.length > postLimit ? (
                <div className="mt-8 flex justify-center">
                    <Button
                        variant="text"
                        size="lg"
                        isLoading={loading}
                        className="flex items-center"
                        onClick={handleLoadMore}
                    >
                        <PiArrowsClockwiseFill className="text-xl" />
                        <span className="ms-2">Load More</span>
                    </Button>
                </div>
            ) : null}

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                className="[&>div]:p-0 lg:[&>div]:p-4"
                overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
                containerClassName="dark:bg-gray-100 max-w-[460px] max-w-[1200px] lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[1200px] relative"
            >
                {/* {currentPostID > 100 && (
          <Button
            variant="text"
            className="absolute -left-12 top-1/2 -mt-4 hidden p-0 text-gray-50 dark:text-white lg:inline-block"
            onClick={() => setCurrentPostID(currentPostID - 1)}
          >
            <PiCaretLeftBold className="text-3xl" />
          </Button>
        )}

        {currentPostID < postData[postData.length - 1].id && (
          <Button
            variant="text"
            className="absolute -right-12 top-1/2 -mt-4 hidden p-0 text-gray-50 dark:text-white lg:inline-block"
            onClick={() => setCurrentPostID(currentPostID + 1)}
          >
            <PiCaretRightBold className="text-3xl" />
          </Button>
        )} */}

                {currentPost && (
                    <PostsModal
                        data={currentPost}
                        onClose={() => setOpen(false)}
                    />
                )}
            </Modal>
        </>
    );
}
