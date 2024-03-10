import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import CheckList from "@editorjs/checklist";
import InlineCode from "@editorjs/inline-code";

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  paragraph: Paragraph,
  embed: Embed,
  list: List,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  inlineCode: InlineCode,
};
