import PostDetail from "@/components/module/post/PostDetail";
import { getPostDetail } from "@/store/blogSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const PageDetailPost = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const dataBlog = useSelector((state: RootState) => state.post.postDetail);
    useEffect(() => {
        if (location.state) {
            dispatch(getPostDetail(location.state));
        }
    }, [location.state, dispatch]);

    return <div>{dataBlog && <PostDetail data={dataBlog} />}</div>;
};

export default PageDetailPost;
