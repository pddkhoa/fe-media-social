import { OutputData } from "@editorjs/editorjs";
import { FC } from "react";
import Output from "editorjs-blocks-react-renderer";
import "./Output.css";
import { Avatar, Badge } from "rizzui";
import { FormDataType } from "@/pages/client/post/PageCreatePost";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatDate } from "@/utils/format-date";

type OutputPostProps = {
    content: OutputData | undefined;
    formDataCreate: FormDataType | undefined;
};

const OutputPost: FC<OutputPostProps> = ({ content, formDataCreate }) => {
    const auth = useSelector((state: RootState) => state.auth.userToken.user);
    const date = new Date();
    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <article className="space-y-8">
                <div className="space-y-6">
                    <h1 className="text-4xl font-semibold md:tracki md:text-4xl">
                        {formDataCreate?.title
                            ? formDataCreate.title
                            : "This is Title"}
                    </h1>
                    <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center ">
                        <div className="flex items-center md:space-x-2">
                            <Avatar src={auth?.avatar?.url} name={auth?.name} />
                            <p className="text-sm">
                                {auth?.name} - {formatDate(date)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    {content && (
                        <Output
                            data={content as any}
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
                                        "text-2xl font-semibold   text-primary my-6",
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
                    {formDataCreate?.tagIds &&
                    formDataCreate.tagIds.length > 0 ? (
                        formDataCreate.tagIds.map((item) => (
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
        </div>
    );
};

export default OutputPost;
