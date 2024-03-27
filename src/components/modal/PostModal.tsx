import BlogServices from "@/services/blog";
import ClientServices from "@/services/client";
import { postCommentToPostByUser } from "@/store/blogSlice";
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
    PiFireFill,
    PiFireLight,
    PiShareNetwork,
    PiUsers,
    PiXBold,
} from "react-icons/pi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Button, Textarea, Title } from "rizzui";
import SimpleBar from "simplebar-react";

type PostsModalProps = {
    data: Post;
    onClose: () => void;
    actionDispatchLike: {
        payload: any;
        type:
            | "category/likeBlogSuccess"
            | "post/likePostBookmarkSuccess"
            | "post/likePostByUserSuccess";
    };
    actionDispatchSave: {
        payload: any;
        type:
            | "category/saveBlogSuccess"
            | "post/savePostBookmarkSuccess"
            | "post/savePostByUserSuccess";
    };
};

export default function PostsModal({
    data,
    onClose,
    actionDispatchLike,
    actionDispatchSave,
}: PostsModalProps) {
    const [activeComment, setActiveComment] = useState<any>();
    //Root Comment
    const rootComment = data?.comments?.filter(
        (comment) => comment?.replyToCommentId === null
    );
    // Child Comment
    const childComment = (commentId: string) => {
        return data.comments?.filter(
            (comment) => comment?.replyToCommentId?._id === commentId
        );
    };

    console.log(childComment);
    return (
        <div className="round grid grow grid-cols-1 gap-0 h-[600px] overflow-hidden rounded-none bg-white dark:bg-gray-100/90 dark:backdrop-blur-xl lg:grid-cols-12 lg:rounded-xl">
            <div className="relative h-full lg:col-span-7">
                <Button
                    rounded="pill"
                    className="absolute right-5 top-5 z-10 h-[30px] w-[30px] p-1 lg:left-5 "
                    onClick={onClose}
                >
                    <PiXBold className="w-5" />
                </Button>
                <div className="h-full w-full ">
                    <img
                        src={data?.avatar}
                        alt="random images"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            <div className="flex w-full flex-col gap-5 p-4 lg:col-span-5">
                <ModalCardText
                    data={data}
                    actionDispatchLike={actionDispatchLike}
                    actionDispatchSave={actionDispatchSave}
                />
                <SimpleBar className="lg:h-[190px]  py-1">
                    {rootComment &&
                        rootComment.length > 0 &&
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
                            />
                        ))}
                </SimpleBar>
                <ModalCommentBox idBlog={data?._id} parentId={null} />
            </div>
        </div>
    );
}

type ModalCardTextProps = {
    data: Post;
    actionDispatchLike: {
        payload: any;
        type:
            | "category/likeBlogSuccess"
            | "post/likePostBookmarkSuccess"
            | "post/likePostByUserSuccess";
    };
    actionDispatchSave: {
        payload: any;
        type:
            | "category/saveBlogSuccess"
            | "post/savePostBookmarkSuccess"
            | "post/savePostByUserSuccess";
    };
};

function ModalCardText({
    data,
    actionDispatchLike,
    actionDispatchSave,
}: ModalCardTextProps) {
    const dispatch = useDispatch();
    const handleSaveBlog = async (id: string) => {
        if (id) {
            const { body } = await ClientServices.saveBlog(id);
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
            const { body } = await ClientServices.likeBlog(id);
            if (body?.success) {
                toast.success(body.message);
                dispatch(actionDispatchLike);
            } else {
                toast.error(body?.message || "Error");
            }
        }
    };

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
                    <Button
                        variant="text"
                        type="button"
                        className="p-2 text-center"
                    >
                        <PiShareNetwork className="w-5 h-5" />
                    </Button>
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
};

function ModalCardComment({
    commentData,
    child,
    childComment,
    setActiveComment,
    activeComment,
    nestingLevel,
    idBlog,
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
            </div>
            {isReplying && (
                <div className=" ml-5 mx-4 ">
                    <ModalCommentBox
                        parentId={commentData._id}
                        idBlog={idBlog}
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
};

function ModalCommentBox({ parentId, idBlog }: ModalCommentBoxProps) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            blogId: idBlog,
            replyToCommentId: parentId,
            content: "",
        },

        validateOnChange: true,
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true);
            const { body } = await BlogServices.addComment(values);
            try {
                if (body?.success) {
                    setIsLoading(false);
                    toast.success(body.message);
                    dispatch(
                        postCommentToPostByUser({
                            postId: idBlog,
                            comment: body?.result,
                        })
                    );
                    resetForm();
                } else {
                    setIsLoading(false);
                    toast.error(body?.message || "Error");
                }
            } catch (error) {
                setIsLoading(false);
            }
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
                isLoading={isLoading}
                disabled={isLoading}
                className="absolute bottom-2 end-2"
            >
                Post
            </Button>
        </form>
    );
}
