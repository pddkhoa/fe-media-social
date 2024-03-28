import {
    PiArrowsClockwiseFill,
    PiCheckCircleFill,
    PiDotsThreeOutlineVertical,
    PiPlus,
    PiUserCirclePlus,
    PiUserList,
} from "react-icons/pi";
import {
    ActionIcon,
    Badge,
    Button,
    Empty,
    Loader,
    Popover,
    Title,
} from "rizzui";
import PostCard from "../post/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { CategoryDetail } from "@/type/category";
import ClientServices from "@/services/client";
import { getBadgeStatus } from "@/components/ui/BadgeStatus";
import { useModal } from "@/hooks/useModal";
import FollowerModal from "@/components/modal/FollowModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DropdownOptionDetail from "./DropdownOptionDetail";
import toast from "react-hot-toast";
import { pendingUpload, uploadSuccess } from "@/store/imageSlice";
import CategoriesServices from "@/services/categories";
import { User } from "@/type/user";
import {
    getAllBlogCategories,
    getLoadmoreBlogCategories,
    likeBlogSuccess,
    postCommentSuccess,
    saveBlogSuccess,
} from "@/store/categorySlice";
import BlogServices from "@/services/blog";
import { doneCommentSuccess, pendingCommentSuccess } from "@/store/blogSlice";

const GroupDetail = () => {
    const categoriesId = useParams();
    const checkUser = useSelector(
        (state: RootState) => state.auth.userToken.user._id
    );
    const [dataCate, setDataCate] = useState<CategoryDetail>();
    const [dataUserReq, setDataUserReq] = useState<User[]>([]);
    const { openModal, closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [totalPage, setTotalPage] = useState<number>(0);
    const listBlog = useSelector(
        (state: RootState) => state.category.blogOfCategories
    );
    const [isDelete, setIsDelete] = useState(false);
    const [userOfGroup, setUserOfGroup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchCate = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await CategoriesServices.getCategoriesById(
                categoriesId.id as string
            );
            if (body?.success) {
                setDataCate(body?.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataCate]);

    const fetchBlog = useCallback(
        async (page: number) => {
            try {
                setIsLoading(true);
                const { body } = await CategoriesServices.getBlogByCategories(
                    categoriesId.id as string,
                    page
                );
                if (body?.success) {
                    setIsLoading(false);
                    if (page === 1) {
                        dispatch(getAllBlogCategories(body?.result?.posts));
                    } else {
                        dispatch(
                            getLoadmoreBlogCategories(body?.result?.posts)
                        );
                    }
                    setTotalPage(body?.result?.size);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        },
        [dispatch, isDelete]
    );
    const fetchUserRequest = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await CategoriesServices.getUserRequestCate(
                categoriesId.id as string
            );
            if (body?.success) {
                setIsLoading(false);
                setDataUserReq(body?.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setDataUserReq]);

    useEffect(() => {
        setIsActive(false);
        fetchCate();
        fetchBlog(currentPage);
        fetchUserRequest();
    }, [fetchCate, fetchBlog, isActive, fetchUserRequest]);

    useEffect(() => {
        if (
            dataCate &&
            dataCate?.users?.some((user) => user._id === checkUser)
        ) {
            setUserOfGroup(true);
        } else {
            setUserOfGroup(false);
        }
    }, [checkUser, categoriesId, dataCate]);

    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleUploadAvatarCategories = async (files: FileList) => {
        if (files && dataCate) {
            dispatch(pendingUpload());
            const formData = new FormData();
            formData.append("image", files[0]);
            const { body } = await ClientServices.uploadAvatarCate(
                formData,
                dataCate._id
            );
            if (body?.success) {
                dispatch(uploadSuccess());

                toast.success(body.message);
                setIsActive(true);
                closeModal();
            } else {
                toast.error(body?.message || "Error");
                dispatch(uploadSuccess());
            }
        }
    };
    const handleCommentPost = async (data: {
        blogId: string;
        replyToCommentId: string | null;
        content: string;
    }) => {
        dispatch(pendingCommentSuccess());

        const { body } = await BlogServices.addComment(data);
        try {
            if (body?.success) {
                toast.success(body.message);
                dispatch(
                    postCommentSuccess({
                        postId: data.blogId,
                        comment: body?.result,
                    })
                );
                dispatch(doneCommentSuccess());
            } else {
                dispatch(doneCommentSuccess());

                toast.error(body?.message || "Error");
            }
        } catch (error) {
            dispatch(doneCommentSuccess());

            console.log(error);
        }
    };

    if (isLoading)
        return (
            <div className="flex justify-center mt-16">
                <Loader size="lg" />
            </div>
        );

    return (
        <div className="-mt-2">
            {dataCate && (
                <>
                    <div className="-mx-6 h-[200px] bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF] bg-opacity-30" />
                    <div className="mx-auto w-full max-w-full  p-2 sm:flex sm:justify-between border-b">
                        <div className="flex h-auto w-full gap-4 @5xl:gap-6">
                            <div className=" pt-2.5 w-1/2">
                                <div className="flex gap-3 items-center">
                                    <div className="h-24 w-24 p-1">
                                        {dataCate?.avatar.url ? (
                                            <img
                                                src={dataCate?.avatar?.url}
                                                className="object-cover h-full w-full"
                                            />
                                        ) : (
                                            <div className="bg-gradient-to-r h-full w-full rounded-lg from-[#F8E1AF] to-[#F6CFCF] bg-opacity-30" />
                                        )}
                                    </div>
                                    <div>
                                        <Title
                                            as="h1"
                                            className="text-lg flex justify-center gap-2 font-bold capitalize leading-normal text-gray-900 @3xl:!text-xl 3xl:text-2xl"
                                        >
                                            {dataCate?.name}
                                            {getBadgeStatus(dataCate?.status)}
                                        </Title>
                                        <p className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base mt-2">
                                            {dataCate.description}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base mt-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex-grow">
                                            <div className="flex gap-3">
                                                <PiCheckCircleFill className="icon hidden h-6 w-6 flex-shrink-0 text-gray-900" />
                                                <div className="flex flex-wrap gap-3 items-center">
                                                    <span>Tags:</span>

                                                    {dataCate?.tags?.map(
                                                        (item) => (
                                                            <Badge
                                                                key={item._id}
                                                                rounded="md"
                                                                className="shadow"
                                                                size="sm"
                                                            >
                                                                #{item.name}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </p>
                            </div>
                            <div className="pt-2.5 w-1/2 flex justify-end">
                                <p className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base mt-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex-grow">
                                            <div className="flex gap-3 justify-center items-center">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex gap-3"
                                                    onClick={() => {
                                                        openModal({
                                                            view: (
                                                                <FollowerModal
                                                                    data={
                                                                        dataCate?.users
                                                                    }
                                                                />
                                                            ),
                                                        });
                                                    }}
                                                >
                                                    List Members{" "}
                                                    <PiUserList className="h-5 w-5" />
                                                </Button>

                                                {userOfGroup ? (
                                                    <>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex gap-3"
                                                        >
                                                            Invite Members{" "}
                                                            <PiUserCirclePlus className="h-5 w-5" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex gap-3"
                                                            onClick={() => {
                                                                navigate(
                                                                    "/create-post",
                                                                    {
                                                                        state: {
                                                                            key: dataCate,
                                                                        },
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            Create Post{" "}
                                                            <PiPlus className="h-3 w-3" />
                                                        </Button>
                                                    </>
                                                ) : null}

                                                {checkUser ===
                                                dataCate?.isAdmin._id ? (
                                                    <Popover placement="bottom-end">
                                                        <Popover.Trigger>
                                                            <ActionIcon
                                                                variant="flat"
                                                                size="sm"
                                                            >
                                                                <PiDotsThreeOutlineVertical />
                                                            </ActionIcon>
                                                        </Popover.Trigger>
                                                        <Popover.Content className="z-50 p-0 dark:bg-gray-50 [&>svg]:dark:fill-gray-50">
                                                            <DropdownOptionDetail
                                                                data={dataCate}
                                                                handleUploadAvatarCategories={
                                                                    handleUploadAvatarCategories
                                                                }
                                                                setIsActive={
                                                                    setIsActive
                                                                }
                                                                dataUserReq={
                                                                    dataUserReq
                                                                }
                                                            />
                                                        </Popover.Content>
                                                    </Popover>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 mt-10  w-full  @2xl:mt-7 @6xl:mt-0">
                        <div className="grid grid-cols-3 gap-5">
                            {listBlog && listBlog.length > 0 ? (
                                listBlog.map((item) => (
                                    <PostCard
                                        key={item._id}
                                        data={item}
                                        setIsDelete={setIsDelete}
                                        actionDispatchLike={likeBlogSuccess(
                                            item._id
                                        )}
                                        actionDispatchSave={saveBlogSuccess(
                                            item._id
                                        )}
                                        handleCommentPost={handleCommentPost}
                                    />
                                ))
                            ) : (
                                <div className="col-span-3">
                                    <Empty />
                                </div>
                            )}
                        </div>
                        {currentPage < totalPage && (
                            <div className="mt-8 flex justify-center">
                                <Button
                                    variant="text"
                                    size="lg"
                                    className="flex items-center"
                                    onClick={() => handleLoadMore()}
                                >
                                    <PiArrowsClockwiseFill className="text-xl" />
                                    <span className="ms-2">Load More</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default GroupDetail;
