import { useModal } from "@/hooks/useModal";
import { Post } from "@/type/post";
import { FC, Fragment } from "react";
import { PiXBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
    ActionIcon,
    Avatar,
    Button,
    Empty,
    SearchNotFoundIcon,
    Title,
} from "rizzui";

type ModalBlogRequestProps = {
    data: Post[];
};

const ModalBlogRequest: FC<ModalBlogRequestProps> = ({ data }) => {
    const { closeModal } = useModal();
    const navigate = useNavigate();

    return (
        <div className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900">
            <div className="flex items-center justify-between">
                <Title as="h4" className="font-semibold">
                    Blogs Request
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                    <PiXBold className="h-auto w-5" />
                </ActionIcon>
            </div>
            {data && data.length > 0 ? (
                data.map((item) => {
                    return (
                        <Fragment key={item._id}>
                            <div className="flex justify-between items-center">
                                <div className="relative my-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-200 focus:outline-none focus-visible:bg-gray-100 ">
                                    {item.avatar ? (
                                        <Avatar
                                            src={item.avatar}
                                            name={item.title}
                                            size="md"
                                            className="rounded-md"
                                        />
                                    ) : (
                                        <Avatar name="default" size="md" />
                                    )}

                                    <span className="font-medium capitalize text-gray-900 dark:text-gray-700 line-clamp-2">
                                        {item.title}
                                    </span>
                                </div>
                                <div>
                                    <Button
                                        onClick={() => {
                                            navigate(`/post/${item._id}`);
                                            closeModal();
                                        }}
                                        size="sm"
                                        variant="flat"
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                        </Fragment>
                    );
                })
            ) : (
                <Empty image={<SearchNotFoundIcon />} text="No Result Found" />
            )}
        </div>
    );
};

export default ModalBlogRequest;
