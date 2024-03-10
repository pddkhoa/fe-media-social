import { useState } from "react";
import { Input } from "rizzui";
import EditorPost from "../editor/EditorPost";

const EditContent = () => {
  const MAXLENGTH = 100;
  const [state, setState] = useState("");
  return (
    <form className="flex flex-col gap-3">
      <Input
        size="md"
        placeholder="Title Post"
        value={state}
        maxLength={MAXLENGTH}
        onChange={(e) => setState(() => e.target.value)}
        suffix={state.length + `/${MAXLENGTH}`}
        suffixClassName="opacity-70"
      />
      <div className="border rounded-md p-4 min-h-96">
        <EditorPost />
      </div>
    </form>
  );
};

export default EditContent;
