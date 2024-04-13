import ModalReportComment from "@/components/modal/ModalReportComment";
import { useModal } from "@/hooks/useModal";
import { RootState } from "@/store/store";
import { Comment } from "@/type/comment";
import { Post } from "@/type/post";
import { formatDate } from "@/utils/format-date";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import {
    PiArrowBendDoubleUpRight,
    PiBookmarkSimple,
    PiBookmarkSimpleFill,
    PiCaretUp,
    PiChatCentered,
    PiDotsThreeOutlineFill,
    PiFireFill,
    PiFireLight,
    PiShareNetwork,
    PiXBold,
} from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Empty, Popover, Textarea } from "rizzui";
import SimpleBar from "simplebar-react";
import DropdownSharePost from "./DropdownSharePost";
import UserServices from "@/services/user";
import useAuth from "@/hooks/useAuth";
import { Socket } from "socket.io-client";
import { TYPE_NOTI } from "@/utils/contants";

type PostsModalProps = {
    data: Post;
    onClose: () => void;
    actionDispatchLike: {
        payload: any;
        type: any;
    };
    actionDispatchSave: {
        payload: any;
        type: any;
    };
    handleCommentPost?: (
        data: {
            blogId: string;
            replyToCommentId: string | null;
            content: string;
        },
        userID: any
    ) => Promise<void>;
    handleDeleteComment?: (data: {
        blogId: string;
        commentId: string;
    }) => Promise<void>;
    socket: Socket | undefined;
};

export default function PostsModal({
    data,
    onClose,
    actionDispatchLike,
    actionDispatchSave,
    handleCommentPost,
    handleDeleteComment,
    socket,
}: PostsModalProps) {
    const [activeComment, setActiveComment] = useState<any>();
    //Root Comment
    const rootComment = data?.comments?.filter(
        (comment) => comment?.replyToCommentId === null
    );
    // Child Comment
    const childComment = (commentId: string) => {
        return data.comments?.filter(
            (comment: any) => comment?.replyToCommentId?._id === commentId
        );
    };

    return (
        <div className="round grid grow grid-cols-1 gap-0  h-full w-full overflow-hidden rounded-none  dark:backdrop-blur-xl lg:grid-cols-12 lg:rounded-xl">
            <div className=" h-full col-span-7">
                <Button
                    rounded="pill"
                    className="absolute right-5 top-5 z-10 h-[30px] w-[30px] p-1 lg:left-5 "
                    onClick={onClose}
                >
                    <PiXBold className="w-5" />
                </Button>
                <div className="h-full w-full">
                    {data?.avatar ? (
                        <img
                            src={data?.avatar}
                            alt="random images"
                            className="w-full h-full object-cover "
                        />
                    ) : (
                        <div className="flex justify-center items-center h-full ">
                            <Empty />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex w-full flex-col gap-1 p-4 col-span-5">
                <ModalCardText
                    data={data}
                    actionDispatchLike={actionDispatchLike}
                    actionDispatchSave={actionDispatchSave}
                    socket={socket}
                />
                {handleCommentPost && (
                    <>
                        <SimpleBar className="h-96 p-2 py-3">
                            {rootComment && rootComment.length > 0 ? (
                                rootComment?.map((item: Comment) => (
                                    <ModalCardComment
                                        key={item._id}
                                        commentData={item}
                                        child={childComment(item._id) as any}
                                        childComment={childComment}
                                        activeComment={activeComment}
                                        setActiveComment={setActiveComment}
                                        nestingLevel={0}
                                        idBlog={data._id}
                                        handleCommentPost={handleCommentPost}
                                        handleDeleteComment={
                                            handleDeleteComment as any
                                        }
                                        isModal={true}
                                    />
                                ))
                            ) : (
                                <Empty text="Not found comment" />
                            )}
                            <ModalCommentBox
                                userId={data.user._id}
                                idBlog={data?._id}
                                parentId={null}
                                handleCommentPost={handleCommentPost}
                            />
                        </SimpleBar>
                    </>
                )}
            </div>
        </div>
    );
}

type ModalCardTextProps = {
    data: Post;
    actionDispatchLike: {
        payload: any;
        type: any;
    };
    actionDispatchSave: {
        payload: any;
        type: any;
    };
    socket: Socket | undefined;
};

function ModalCardText({
    data,
    actionDispatchLike,
    actionDispatchSave,
    socket,
}: ModalCardTextProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { axiosJWT, user } = useAuth();

    const handleSaveBlog = async (id: string) => {
        if (id) {
            const { body } = await UserServices.saveBlog(id, axiosJWT);
            if (body?.success) {
                toast.success(body.message);
                dispatch(actionDispatchSave);
            } else {
                toast.error(body?.message || "Error");
            }
        }
    };

    const handleLikeBlog = async (id: string) => {
        if (id) {
            const { body } = await UserServices.likeBlog(id, axiosJWT);
            if (body?.success) {
                toast.success(body.message);
                dispatch(actionDispatchLike);
                if (!data.isLiked)
                    socket?.emit("interaction", {
                        fromUser: user.user._id,
                        toUser: data.user._id,
                        type: TYPE_NOTI.LIKE,
                        data: user,
                    });
            } else {
                toast.error(body?.message || "Error");
            }
        }
    };

    return (
        <>
            <div className="flex gap-2">
                {data.category ? (
                    <div className="relative inline-flex gap-5 w-[80%] cursor-pointer group ">
                        {data?.category?.avatar?.url ? (
                            <img
                                onClick={() => {
                                    navigate(
                                        `/group/detail/${data.category._id}`
                                    );
                                }}
                                src={data?.category?.avatar?.url}
                                className="object-cover h-12 w-12 rounded-lg group-hover:brightness-95"
                            />
                        ) : (
                            <div
                                title="visit group"
                                onClick={() => {
                                    navigate(
                                        `/group/detail/${data.category._id}`
                                    );
                                }}
                                className="bg-gradient-to-r h-12 w-12 rounded-lg from-[#F8E1AF] to-[#F6CFCF] bg-opacity-30 group-hover:brightness-95"
                            />
                        )}
                        <p
                            onClick={() => {
                                navigate(`/group/detail/${data.category._id}`);
                            }}
                            className="font-semibold mt-1 group-hover:text-gray-800 truncate"
                        >
                            {data?.category?.name}
                        </p>
                        <div className="absolute top-8 left-8 -translate-y-[25%] group">
                            <Link
                                className="flex gap-2 items-center hover:brightness-105"
                                to={`/profile/${data?.user?._id}`}
                            >
                                <Avatar
                                    name={data?.user?.name}
                                    src={data?.user?.avatar?.url}
                                    customSize={30}
                                    className="object-cover w-12 h-12 rounded-full shadow"
                                />
                                <div className="flex flex-col mt-2">
                                    <div className="text-xs font-semibold">
                                        {data?.user?.name}
                                    </div>
                                    <span className="text-[10px] text-gray-400 pointer-events-none">
                                        {formatDate(data?.createdAt as any)}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="relative inline-flex gap-5 w-[80%]">
                        <Link
                            className="flex gap-2 items-center"
                            to={`/profile/${data?.user?._id}`}
                        >
                            <Avatar
                                name={data?.user?.name}
                                src={data?.user?.avatar?.url}
                                size="md"
                                className="object-cover w-12 h-12 rounded-full shadow"
                            />
                            <div className="flex flex-col mt-2">
                                <div className="text-sm font-semibold">
                                    {data?.user?.name}
                                </div>
                                <span className="text-[10px] text-gray-400 pointer-events-none">
                                    {formatDate(data?.createdAt as any)}
                                </span>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
            <p className="text-sm leading-6 text-gray-500 mt-6">
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
                    to={`/post`}
                    state={data}
                    className="font-medium flex gap-2 items-center text-black hover:underline hover:text-blue-600"
                >
                    More Detail <PiArrowBendDoubleUpRight />
                </Link>
            </p>
            <div className="flex items-center justify-between gap-4 border-b border-b-gray-100  dark:border-b-gray-400">
                <div className="flex items-center gap-5">
                    <Button
                        variant="text"
                        onClick={() => {
                            handleLikeBlog(data?._id);
                        }}
                        className="font-500 group ms-auto h-auto p-0 "
                    >
                        {data?.isLiked ? (
                            <PiFireFill className="h-5 w-5" />
                        ) : (
                            <PiFireLight className="h-5 w-5" />
                        )}
                        <span className="ms-1.5 inline-block">Like</span>
                    </Button>
                    <Button
                        variant="text"
                        className="font-500 group ms-auto h-auto p-0 "
                    >
                        <PiChatCentered className="h-5 w-5" />
                        <span className="ms-1.5 inline-block">Comment</span>
                    </Button>
                </div>
                <div className="space-x-2">
                    <Popover placement="bottom-end">
                        <Popover.Trigger>
                            <Button
                                variant="text"
                                type="button"
                                className="p-2 text-center"
                            >
                                <PiShareNetwork className="w-5 h-5" />
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content className="p-5 [&>svg]:dark:fill-gray-200">
                            <DropdownSharePost data={data} />
                        </Popover.Content>
                    </Popover>

                    <Button
                        onClick={() => {
                            handleSaveBlog(data?._id);
                        }}
                        variant="text"
                        type="button"
                        className="p-2"
                    >
                        {data?.isSave ? (
                            <PiBookmarkSimpleFill className="w-5 h-5" />
                        ) : (
                            <PiBookmarkSimple className="w-5 h-5" />
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}
type CommentPropsType = {
    commentData: Comment;
    child?: ((commentId: string) => any) | undefined;
    childComment: (commentId: string) => any[];
    setActiveComment: React.Dispatch<React.SetStateAction<any>>;
    activeComment: any;
    nestingLevel: number;
    idBlog: string;
    handleCommentPost: (
        data: {
            blogId: string;
            replyToCommentId: string | null;
            content: string;
        },
        userID: any
    ) => Promise<void>;
    handleDeleteComment: (data: {
        blogId: string;
        commentId: string;
    }) => Promise<void>;
    isModal: boolean;
};

export function ModalCardComment({
    commentData,
    childComment,
    setActiveComment,
    activeComment,
    nestingLevel,
    idBlog,
    handleCommentPost,
    handleDeleteComment,
    isModal,
}: CommentPropsType) {
    const isReplying =
        activeComment &&
        activeComment.type === "replying" &&
        activeComment.id === commentData._id;

    const MAX_NESTING = 3;
    const [hideChildComment, setHideChildComment] = useState(false);
    const replies: Comment[] = childComment(commentData._id);
    const sumChildComment = replies.length;

    return (
        <>
            <div className="flex items-start gap-4 pr-3  p-2">
                <Avatar
                    name={commentData?.user?.name}
                    src={commentData?.user?.avatar?.url}
                />

                <div>
                    <span className="mt-1.5 block text-sm font-normal text-gray-800 [&_a]:text-primary-light">
                        {commentData?.content}
                    </span>
                    <div className="mt-3 flex gap-5 items-center">
                        {nestingLevel <= MAX_NESTING ? (
                            <>
                                <Button
                                    variant="text"
                                    size="sm"
                                    className="h-auto p-0 font-medium"
                                    onClick={() => {
                                        setActiveComment({
                                            id: commentData?._id,
                                            type: "replying",
                                        });
                                    }}
                                >
                                    Reply
                                </Button>
                                <p className="text-xs font-normal">
                                    {formatDate(commentData?.createdAt as any)}
                                </p>
                                {sumChildComment > 0 ? (
                                    <div className="text-xs flex items-center gap-2">
                                        <PiCaretUp
                                            onClick={() => {
                                                setHideChildComment(
                                                    !hideChildComment
                                                );
                                            }}
                                            className={`w-4 h-4 duration-150 cursor-pointer  ${
                                                hideChildComment
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                        <span className="flex gap-2 items-center ">
                                            {sumChildComment}
                                        </span>
                                    </div>
                                ) : null}
                            </>
                        ) : null}
                    </div>
                </div>
                {!isModal && (
                    <div className="ml-auto flex items-center ">
                        <DropdownOption
                            parentId={commentData._id}
                            idBlog={idBlog}
                            dataComment={commentData}
                            handleDeleteComment={handleDeleteComment}
                        />
                    </div>
                )}
            </div>
            {isReplying && (
                <div className=" ml-5 mx-4 ">
                    <ModalCommentBox
                        parentId={commentData._id}
                        idBlog={idBlog}
                        handleCommentPost={handleCommentPost}
                    />
                </div>
            )}

            {hideChildComment
                ? replies &&
                  replies?.length > 0 && (
                      <div className="pt-1  ml-10">
                          {replies?.map((commentChild) => (
                              <ModalCardComment
                                  childComment={childComment}
                                  commentData={commentChild}
                                  key={commentChild._id}
                                  setActiveComment={setActiveComment}
                                  activeComment={activeComment}
                                  nestingLevel={nestingLevel + 1}
                                  idBlog={idBlog}
                                  handleCommentPost={handleCommentPost}
                                  handleDeleteComment={handleDeleteComment}
                                  isModal={true}
                              />
                          ))}
                      </div>
                  )
                : null}
        </>
    );
}

type ModalCommentBoxProps = {
    parentId: string | null;
    idBlog: string;
    userId?: string;
    handleCommentPost: (
        data: {
            blogId: string;
            replyToCommentId: string | null;
            content: string;
        },
        userID: any
    ) => Promise<void>;
};

export function ModalCommentBox({
    parentId,
    idBlog,
    handleCommentPost,
    userId,
}: ModalCommentBoxProps) {
    const isPending = useSelector(
        (state: RootState) => state.post.pendingComment
    );

    const formik = useFormik({
        initialValues: {
            blogId: idBlog,
            replyToCommentId: parentId,
            content: "",
        },

        validateOnChange: true,
        onSubmit: async (values, { resetForm }) => {
            handleCommentPost(values, userId);
            resetForm();
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="relative mt-8">
            <Textarea
                variant="flat"
                size="sm"
                name="content"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content}
                placeholder="Share your thoughts"
                className="w-full resize-none"
                textareaClassName="resize-none py-2 text-sm h-[90px]"
            />
            <Button
                variant="text"
                type="submit"
                color="primary"
                isLoading={isPending}
                disabled={isPending}
                className="absolute bottom-2 end-2"
            >
                Post
            </Button>
        </form>
    );
}

type DropdownOptionProps = {
    handleDeleteComment: (data: {
        blogId: string;
        commentId: string;
    }) => Promise<void>;
    parentId: string;
    idBlog: string;
    dataComment: Comment;
};

function DropdownOption({
    handleDeleteComment,
    parentId,
    idBlog,
    dataComment,
}: DropdownOptionProps) {
    const { openModal } = useModal();

    const handleDelete = () => {
        handleDeleteComment({
            blogId: idBlog,
            commentId: parentId,
        });
    };

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <PiDotsThreeOutlineFill className="w-4 h-4 cursor-pointer" />
            </Dropdown.Trigger>
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={handleDelete}
                    className="hover:bg-gray-300"
                >
                    Delete
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        openModal({
                            view: <ModalReportComment data={dataComment} />,
                        });
                    }}
                    className="hover:bg-gray-300"
                >
                    Report
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
