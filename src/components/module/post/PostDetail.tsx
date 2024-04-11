import { formatDate } from "@/utils/format-date";
import { Avatar, Badge, Empty, Loader } from "rizzui";
import Output from "editorjs-blocks-react-renderer";
import { Post } from "@/type/post";
import { FC, useState } from "react";
import convertHTMLToEditorJS from "../../editor/Convert";
import "./PostDetail.css";
import { ModalCardComment, ModalCommentBox } from "./PostModal";
import BlogServices from "@/services/blog";
import {
    pendingCommentSuccess,
    doneCommentSuccess,
    addCommentToPostDetail,
    deleteCommentToPostDetail,
} from "@/store/blogSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/useAuth";

type PostDetailProps = {
    data: Post;
};

const PostDetail: FC<PostDetailProps> = ({ data }) => {
    const [activeComment, setActiveComment] = useState<any>();
    const dispatch = useDispatch();
    const [isDelete, setIsDelete] = useState(false);

    const { axiosJWT } = useAuth();

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

    const handleCommentPost = async (data: {
        blogId: string;
        replyToCommentId: string | null;
        content: string;
    }) => {
        dispatch(pendingCommentSuccess());
        const { body } = await BlogServices.addComment(data, axiosJWT);
        try {
            if (body?.success) {
                toast.success(body.message);
                dispatch(
                    addCommentToPostDetail({
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

    const handleDeleteComment = async (data: any) => {
        setIsDelete(true);
        const { body } = await BlogServices.deleteComment(data, axiosJWT);
        if (body?.success) {
            toast.success(body.message);
            console.log(data.commentId);
            dispatch(
                deleteCommentToPostDetail({
                    postId: data.blogId,
                    commentId: data.commentId,
                })
            );
            setIsDelete(false);
        } else {
            toast.error(body?.message || "Error");
            setIsDelete(false);
        }
    };

    return (
        <div className="max-w-5xl py-8 mx-auto space-y-12">
            <article className="space-y-8">
                <div className="space-y-6">
                    <h1 className="text-4xl font-semibold md:tracki md:text-4xl">
                        {data?.title}
                    </h1>
                    <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center ">
                        <div className="flex items-center md:space-x-2">
                            {data?.user?.avatar ? (
                                <Avatar
                                    initials={data?.user?.name}
                                    src={data?.user?.avatar?.url}
                                    name={data?.user?.name}
                                />
                            ) : null}
                            <p className="text-sm">
                                {data?.user?.name} -{" "}
                                {formatDate(data?.createdAt as any)}
                            </p>
                        </div>
                        <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                            4 min read • 1,570 views
                        </p>
                    </div>
                </div>
                <div className="p-2">
                    {data?.content && (
                        <Output
                            data={convertHTMLToEditorJS(data?.content)}
                            config={{
                                code: {
                                    className: "language-js py-4 text-white",
                                },
                                delimiter: {
                                    className: "border border-2 w-16 mx-auto",
                                },
                                embed: {
                                    className: "border-0",
                                },
                                header: {
                                    className:
                                        "text-2xl font-semibold  text-transparent text-white my-6",
                                },
                                image: {
                                    className:
                                        " flex flex-col h-[500px] w-full justify-center items-center   py-5 rounded-xl",
                                },
                                list: {
                                    className: "text-title-foreground",
                                },
                                paragraph: {
                                    className:
                                        "text-lg text-opacity-90 text-title para ",
                                    actionsClassNames: {
                                        alignment: "text-{alignment}",
                                    },
                                },
                                quote: {
                                    className: "py-3 px-5 italic",
                                },
                            }}
                        />
                    )}
                </div>
            </article>
            <div>
                <div className="flex flex-wrap py-6 gap-2 border-t border-dashed dark:border-gray-400">
                    {data?.tags && data?.tags?.length > 0 ? (
                        data?.tags?.map((item) => (
                            <Badge
                                key={item._id}
                                rounded="md"
                                className="flex gap-3"
                            >
                                <span>#{item.name}</span>
                            </Badge>
                        ))
                    ) : (
                        <div>Not tags now</div>
                    )}
                </div>
            </div>

            <div className="pt-8 border-t border-dashed dark:border-gray-400">
                <div className="flex flex-col space-y-4 ">
                    {isDelete ? (
                        <div className="flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : rootComment && rootComment.length > 0 ? (
                        rootComment?.map((item: any) => (
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
                                handleDeleteComment={handleDeleteComment}
                                isModal={false}
                            />
                        ))
                    ) : (
                        <Empty text="Not found comment" />
                    )}
                    <ModalCommentBox
                        idBlog={data?._id}
                        parentId={null}
                        handleCommentPost={handleCommentPost}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
