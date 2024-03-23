import { followersData, followingData } from "@/data/ProfileData";
import { useState, useEffect } from "react";
import { PiXBold } from "react-icons/pi";
import { Badge, Modal, Title, Button, Empty, Loader } from "rizzui";
import { cn } from "@/utils/class-name";
import { useLocation } from "react-router-dom";
import { Post } from "@/type/post";
import BlogServices from "@/services/blog";
import PostCard from "@/components/post/PostCard";

export default function ProfileDetails() {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState({
        title: "Followers",
        data: followersData,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [postData, setPostData] = useState<Post[]>();
    const [isDelete, setIsDelete] = useState(false);

    const tabs = [
        { id: "posts", count: postData?.length },
        { id: "followers", count: followersData.length },
        { id: "following", count: followingData.length },
    ];
    const [active, setActive] = useState(tabs[0].id);

    useEffect(() => {
        setIsDelete(false);

        const fetchPostData = async () => {
            try {
                setIsLoading(true);
                const { body } = await BlogServices.getAllBlogByUser();
                if (body?.success) {
                    setPostData(body.result);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        fetchPostData();
    }, [isDelete]);

    useEffect(() => {
        setOpen(() => false);
    }, [location.pathname]);

    function handleTabClick(id: string) {
        if (id === "followers") {
            setModalData({ title: "Followers", data: followersData });
            setOpen(() => true);
        } else if (id === "following") {
            setModalData({ title: "Following", data: followingData });
            setOpen(() => true);
        }
        setActive(() => id);
    }

    return (
        <>
            <div className="mx-auto mt-10 w-full max-w-[1294px] @2xl:mt-7 @6xl:mt-0">
                <div className="-mx-4 flex items-center justify-around border-b-2  border-b-gray-200 font-medium sm:mx-0 md:justify-start md:gap-8">
                    {tabs.map((item) => (
                        <button
                            key={item.id}
                            className={cn(
                                "relative pb-4 font-semibold capitalize text-gray-500 p-2  focus:outline-none @4xl:pb-5 md:px-4",
                                active === item.id && "text-black"
                            )}
                            onClick={() => handleTabClick(item.id)}
                        >
                            <span>{item.id}</span>
                            <Badge
                                variant="flat"
                                className="ms-2 border border-gray-300 bg-gray-200 p-0.5 px-1.5"
                            >
                                {item.count}
                            </Badge>
                            {active === "posts" && item.id === "posts" && (
                                <span className="absolute inset-x-0 -bottom-0.5 z-10 h-0.5 bg-black"></span>
                            )}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-5 p-4">
                    {isLoading ? (
                        <div className="col-span-3 mx-auto mt-5">
                            <Loader />
                        </div>
                    ) : postData && postData.length > 0 ? (
                        postData.map((item) => (
                            <PostCard
                                key={item._id}
                                data={item}
                                setIsDelete={setIsDelete}
                            />
                        ))
                    ) : (
                        <div className="col-span-3">
                            <Empty />
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={open}
                onClose={() => {
                    setOpen(false);
                    setActive(() => "posts");
                }}
                overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
                containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
            >
                <div className="flex items-center justify-between pb-2 lg:pb-3">
                    <Title
                        as="h3"
                        className="text-lg font-semibold text-gray-900 xl:text-xl"
                    >
                        {modalData.title}
                    </Title>
                    <Button
                        variant="text"
                        onClick={() => {
                            setOpen(false);
                            setActive(() => "posts");
                        }}
                        className="h-auto px-1 py-1"
                    >
                        <PiXBold className="h-5 w-5 text-base" />
                    </Button>
                </div>
                {/* {modalData && <FollowerModal data={modalData.data} />} */}
            </Modal>
        </>
    );
}
