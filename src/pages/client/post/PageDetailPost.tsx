import PostDetail from "@/components/module/post/PostDetail";
import { Post } from "@/type/post";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageDetailPost = () => {
    const location = useLocation();
    const [dataBlog, setDataBlog] = useState<Post>();
    console.log(location);
    useEffect(() => {
        if (location.state) {
            setDataBlog(location.state);
        }
    }, [location.state]);

    return <div>{dataBlog && <PostDetail data={dataBlog} />}</div>;
};

export default PageDetailPost;
