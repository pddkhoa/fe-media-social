import useAuth from "@/hooks/useAuth";
import FacebookShareButton from "@/hooks/usePluginSocial";
import UserServices from "@/services/user";
import { Post } from "@/type/post";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { PiShareFat } from "react-icons/pi";
import { Button } from "rizzui";

type DropdownSharePostProps = {
    data: Post;
};

const DropdownSharePost: FC<DropdownSharePostProps> = ({ data }) => {
    const [isShare, setIsShare] = useState(false);
    const { axiosJWT } = useAuth();

    const handleShare = async (id: string) => {
        setIsShare(true);
        const { body } = await UserServices.sharePost(id, axiosJWT);
        if (body?.success) {
            toast.success(body.message);
            setIsShare(false);
        } else {
            toast.error(body?.message || "Erro");
            setIsShare(false);
        }
    };

    return (
        <div className="text-left rtl:text-right w-56  grid  font-medium text-gray-700">
            <Button
                variant="text"
                className="flex justify-start hover:bg-gray-300"
                isLoading={isShare}
                disabled={isShare}
                onClick={() => {
                    handleShare(data._id);
                }}
            >
                Share in feed
                <PiShareFat className="ml-2 h-5 w-5" />
            </Button>
            <Button
                variant="text"
                className="flex justify-start gap-2 hover:bg-gray-300 text-gray-700"
            >
                {/* <IconShare className="w-6 h-6 mr-2" /> */}
                <span>Share with</span>
                <FacebookShareButton
                    url={`${process.env.URL_DOMAIN}/post/${data._id}`}
                />
            </Button>
        </div>
    );
};

export default DropdownSharePost;
