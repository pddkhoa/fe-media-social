import { useEffect } from "react";

interface FacebookShareButtonProps {
    url: string;
}

const FacebookShareButton: React.FC<FacebookShareButtonProps> = ({ url }) => {
    useEffect(() => {
        if ((window as any).FB) {
            (window as any).FB.XFBML.parse();
        }
    }, []);

    return (
        <div
            className="fb-share-button"
            data-href={url} // URL của bạn tùy thuộc vào cấu trúc ứng dụng
            data-layout="button_count"
        ></div>
    );
};

export default FacebookShareButton;
