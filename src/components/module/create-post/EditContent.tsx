import { FC, useEffect, useState } from "react";
import { Input } from "rizzui";
import EditorPost from "../../editor/EditorPost";
import { OutputData } from "@editorjs/editorjs";
import { FormDataType } from "@/pages/client/post/PageCreatePost";

type EditContentProps = {
    setContent: React.Dispatch<React.SetStateAction<OutputData | undefined>>;
    content: OutputData | undefined;
    formik: any;
    setCheckContent: React.Dispatch<React.SetStateAction<boolean>>;
    checkContent: boolean;
    setFormDataCreate: React.Dispatch<
        React.SetStateAction<FormDataType | undefined>
    >;
    formDataCreate: FormDataType | undefined;
};

const EditContent: FC<EditContentProps> = ({
    setContent,
    content,
    formik,
    setCheckContent,
    checkContent,
    setFormDataCreate,
    formDataCreate,
}) => {
    const MAXLENGTH = 150;
    const [state, setState] = useState("" || formDataCreate?.title);

    useEffect(() => {
        formik.setFieldValue("title", state);
    }, [state]);

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        formik.handleChange(e);
        setState(newValue);
        setFormDataCreate((prevFormData: any) => ({
            ...prevFormData,
            title: newValue,
        }));
    };

    return (
        <div className="flex flex-col gap-3">
            <Input
                id="title"
                name="title"
                size="lg"
                placeholder="Title Post"
                value={state}
                maxLength={MAXLENGTH}
                onChange={handleChangeTitle}
                onBlur={formik.handleBlur}
                suffix={
                    state?.length
                        ? state.length + `/${MAXLENGTH}`
                        : 0 + `/${MAXLENGTH}`
                }
                suffixClassName="opacity-70"
                error={formik.errors.title}
            />
            <div
                className={`border rounded-md p-4 min-h-96 ${
                    !checkContent ? `border-red-500 ` : ``
                }`}
            >
                <EditorPost
                    setContent={setContent}
                    content={content}
                    setCheckContent={setCheckContent}
                />
            </div>
        </div>
    );
};

export default EditContent;
