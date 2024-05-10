import convertHTMLToEditorJS from "@/components/editor/Convert";
import AvatarCard from "@/components/ui/AvatarCard";
import { TYPE_REPORT } from "@/utils/contants";
import Output from "editorjs-blocks-react-renderer";
import "@/components/module/post/PostDetail.css";
import { Avatar, Badge, Title } from "rizzui";
import { User } from "@/type/user";
import { FC } from "react";

type ReportBodyProps = {
    data: any;
    type: string;
};

export default function ReportBody({ data, type }: ReportBodyProps) {
    return (
        <div>
            <AvatarCard
                src={data?.userReport?.avatar?.url}
                name={data?.userReport?.name}
                description={data?.userReport?.email}
                avatarProps={{
                    name: data?.userReport?.name,
                    size: "xl",
                }}
            />

            <div className=" grid gap-2 leading-relaxed pb-2">
                {type === TYPE_REPORT.BLOG && (
                    <div className="p-6">
                        <h1 className="text-2xl font-semibold md:tracki ">
                            {data?.blogIsReported?.title}
                        </h1>
                        {data?.blogIsReported?.content && (
                            <Output
                                data={convertHTMLToEditorJS(
                                    data?.blogIsReported?.content
                                )}
                                config={{
                                    code: {
                                        className: "language-js py-4",
                                    },
                                    delimiter: {
                                        className:
                                            "border border-2 w-16 mx-auto",
                                    },
                                    embed: {
                                        className: "border-0",
                                    },
                                    header: {
                                        className:
                                            "text-2xl font-semibold  my-6",
                                    },
                                    image: {
                                        className:
                                            " flex flex-col h-[500px] w-full justify-center items-center   py-5 rounded-xl",
                                    },
                                    list: {
                                        className: "",
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
                )}
                {type === TYPE_REPORT.USER && (
                    <ProfileHeader userDetail={data?.userIsReported} />
                )}
                {type === TYPE_REPORT.TAG && (
                    <ReportTagDetail data={data?.tagIsReported} />
                )}
                {type === TYPE_REPORT.COMMENT && (
                    <ReportComment data={data?.comment} />
                )}
            </div>
        </div>
    );
}

type ProfileHeaderProps = {
    userDetail: User;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({ userDetail }) => {
    return (
        <div className="relative border rounded p-6 my-2">
            <div className="h-[200px] bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF] " />

            <div className="mx-auto w-full max-w-[1294px] @container  sm:flex sm:justify-between">
                <div className="flex h-auto gap-4">
                    <div>
                        <div className="relative -top-1/3  aspect-square w-[110px] overflow-hidden rounded-full border-4 border-white bg-white ">
                            {userDetail?.avatar?.url && (
                                <Avatar
                                    name={userDetail?.name}
                                    src={userDetail?.avatar?.url || "No Name"}
                                    customSize={100}
                                    className="aspect-auto h-full w-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                    <div className="pt-2.5">
                        <Title
                            as="h1"
                            className="text-lg font-bold capitalize leading-normal text-gray-900 @3xl:!text-xl 3xl:text-2xl"
                        >
                            {userDetail?.name}
                        </Title>
                        <p className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base">
                            {userDetail?.email}
                        </p>
                        <p className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base"></p>
                        <ul className="mt-3 flex flex-wrap items-center gap-2 text-sm @3xl:mt-4 @3xl:gap-5 @3xl:text-base 3xl:text-lg">
                            <li className="flex items-center">
                                <span className="font-semibold text-gray-900">
                                    {userDetail?.totalBlog}
                                </span>
                                <span className="ms-1.5 text-sm text-gray-500">
                                    Blogs
                                </span>
                            </li>
                            <li className="flex items-center">
                                <span className="font-semibold text-gray-900">
                                    {userDetail?.totalFollower}
                                </span>
                                <span className="ms-1.5 text-sm text-gray-500">
                                    Followers
                                </span>
                            </li>
                            <li className="flex items-center">
                                <span className="font-semibold text-gray-900">
                                    {userDetail?.totalFollowing}
                                </span>
                                <span className="ms-1.5 text-sm text-gray-500">
                                    Following
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

type ReportTagProps = {
    data: any;
};

export const ReportTagDetail: FC<ReportTagProps> = ({ data }) => {
    return (
        <div className="p-6 border rounded my-2">
            <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                    Tags:
                    <Badge rounded="md" className="flex gap-3 w-fit">
                        <span>#{data?.name}</span>
                    </Badge>
                </div>
                <div className="flex gap-5">
                    Author:
                    <AvatarCard
                        src={data?.user?.avatar?.url}
                        name={data?.user?.name}
                        description={data?.user?.email}
                        avatarProps={{
                            name: data?.user?.name,
                            size: "xl",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

type ReportCommentProps = {
    data: any;
};

export const ReportComment: FC<ReportCommentProps> = ({ data }) => {
    return (
        <div className="p-6 border rounded my-2">
            <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                    Comment:
                    <Badge
                        rounded="md"
                        variant="outline"
                        className="flex gap-3 w-fit"
                    >
                        <span>{data?.content}</span>
                    </Badge>
                </div>
                <div className="flex gap-5">
                    Author:
                    <AvatarCard
                        src={data?.user?.avatar?.url}
                        name={data?.user?.name}
                        description={data?.user?.email}
                        avatarProps={{
                            name: data?.user?.name,
                            size: "xl",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
