import PostDetail from "@/components/module/post/PostDetail";
import useAuth from "@/hooks/useAuth";
import BlogServices from "@/services/blog";
import { getPostDetail } from "@/store/blogSlice";
import { RootState } from "@/store/store";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Socket } from "socket.io-client";

type PageDetailPostProps = {
    socket?: Socket | undefined;
};

const PageDetailPost: FC<PageDetailPostProps> = ({ socket }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const dataBlog = useSelector((state: RootState) => state.post.postDetail);
    const [isLoading, setIsLoading] = useState(false);
    const { axiosJWT } = useAuth();

    const fetchBlogDetail = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await BlogServices.getBlogById(
                location.state._id as string,
                axiosJWT
            );

            if (body?.success) {
                dispatch(getPostDetail(body?.result));
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [dispatch]);
    useEffect(() => {
        fetchBlogDetail();
    }, [fetchBlogDetail, location.state._id]);

    return (
        <div>
            {dataBlog && (
                <PostDetail
                    dataBlog={dataBlog}
                    socket={socket}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default PageDetailPost;
