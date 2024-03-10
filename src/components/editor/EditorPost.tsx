import { useCallback, useEffect, useRef, useState } from "react";
import { EDITOR_JS_TOOLS } from "./Tool";
import "./editor.css";
import EditorJS from "@editorjs/editorjs";

const EditorPost = () => {
  const ref = useRef<EditorJS>();
  let editor: EditorJS | undefined;
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;

    if (!ref.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      editor = new EditorJS({
        holder: "editor",
        onReady: async () => {
          ref.current = editor;
          const content = JSON.parse(localStorage.getItem("editorContent")!);
          if (content.blocks.length !== 0) {
            editor?.render(content);
          }
        },
        onChange: async () => {
          const content = await editor?.saver.save();
          localStorage.setItem("editorContent", JSON.stringify(content));
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          paragraph: {
            class: EDITOR_JS_TOOLS.paragraph,
            inlineToolbar: true,
          },
          header: EDITOR_JS_TOOLS.header,
          image: {
            class: EDITOR_JS_TOOLS.image,

            // config: {
            //   uploader: {
            //     async uploadByFile(file: File) {
            //       // upload to uploadthing
            //       const { body } = await ClientServices.uploadFiles(
            //         file,
            //         accessToken,
            //         axiosJWT
            //       );

            //       return {
            //         success: 1,
            //         file: {
            //           url: body?.result,
            //         },
            //       };
            //     },
            //   },
            //   withBorder: true,
            // },
          },
          list: {
            class: EDITOR_JS_TOOLS.list,
            inlineToolbar: true,
          },
          code: EDITOR_JS_TOOLS.code,
          inlineCode: EDITOR_JS_TOOLS.inlineCode,
          embed: EDITOR_JS_TOOLS.embed,
          quote: {
            class: EDITOR_JS_TOOLS.quote,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+O",
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div id="editor" />
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">
          Use{" "}
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>{" "}
          to open the command menu.
        </p>
      </div>
    </>
  );
};

export default EditorPost;
