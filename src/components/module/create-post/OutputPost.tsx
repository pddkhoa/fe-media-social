import { OutputData } from "@editorjs/editorjs";
import { FC } from "react";
import Output from "editorjs-blocks-react-renderer";

import { Badge } from "rizzui";
import { FormDataType } from "@/pages/create-post/PageCreatePost";

type OutputPostProps = {
  content: OutputData | undefined;
  formDataCreate: FormDataType | undefined;
};

const OutputPost: FC<OutputPostProps> = ({ content, formDataCreate }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <article className="space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold md:tracki md:text-4xl">
            {formDataCreate?.title ? formDataCreate.title : "This is Title"}
          </h1>
          <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center ">
            <div className="flex items-center md:space-x-2">
              <img
                src="https://source.unsplash.com/75x75/?portrait"
                alt=""
                className="w-4 h-4 border rounded-full"
              />
              <p className="text-sm">Leroy Jenkins • July 19th, 2021</p>
            </div>
            <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
              4 min read • 1,570 views
            </p>
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
                    "text-2xl font-semibold  text-transparent text-white my-6",
                },
                image: {
                  className:
                    " flex flex-col h-[700px] w-[900px] justify-center items-center  mt-10 mx-auto  py-5 rounded-xl",
                },
                list: {
                  className: "text-title-foreground",
                },
                paragraph: {
                  className: "text-lg text-opacity-90 text-title para ",
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
          <Badge rounded="md" className="flex gap-3">
            <span>#Badge</span>
          </Badge>
          <Badge rounded="md" className="flex gap-3">
            <span>#Badge</span>
          </Badge>{" "}
          <Badge rounded="md" className="flex gap-3">
            <span>#Badge</span>
          </Badge>
        </div>
      </div>
      <div className="pt-8 border-t border-dashed dark:border-gray-400">
        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <img
            src="https://source.unsplash.com/75x75/?portrait"
            alt=""
            className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
          />
          <div className="flex flex-col pt-2">
            <h4 className="text-md font-semibold">Leroy Jenkins</h4>
            <p className="dark:text-gray-600">
              Sed non nibh iaculis, posuere diam vitae, consectetur neque.
              Integer velit ligula, semper sed nisl in, cursus commodo elit.
              Pellentesque sit amet mi luctus ligula euismod lobortis ultricies
              et nibh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputPost;
