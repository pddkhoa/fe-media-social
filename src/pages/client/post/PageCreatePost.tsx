import EditContent from "@/components/module/create-post/EditContent";
import EditDetail from "@/components/module/create-post/EditDetail";
import OutputPost from "@/components/module/create-post/OutputPost";
import { OutputData } from "@editorjs/editorjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
    PiArrowLeftBold,
    PiArrowRightBold,
    PiClipboardTextLight,
} from "react-icons/pi";
import { Stepper, Button } from "rizzui";
import * as Yup from "yup";
import edjsHTML from "editorjs-html";
import { Tag } from "@/type/tag";
import BlogServices from "@/services/blog";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { countBlog } from "@/store/authSlice";

export type FormDataType = {
    title: string;
    content: string;
    description: string;
    avatar: string;
    categoryIds: any;
    tagIds: Tag[];
};

const PageCreatePost = () => {
    const [formDataCreate, setFormDataCreate] = useState<FormDataType>();
    const [currentStep, setCurrentStep] = React.useState(0);
    const [content, setContent] = useState<OutputData>();
    const [checkContent, setCheckContent] = useState(false);
    const [saveDraft, setSaveDraft] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const edjsParser = edjsHTML();

    const location = useLocation();

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            description: "",
            avatar: "",
            categoryIds: "",
            tagIds: [],
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Title is required."),
        }),

        validateOnChange: true,
        onSubmit: async (values) => {
            const form = {
                ...values,
                categoryIds: formDataCreate?.categoryIds?.value,
                tagIds: formDataCreate?.tagIds?.map((item) => item._id),
                content: edjsParser.parse(content as any).join(""),
                avatar: formDataCreate?.avatar,
            };
            setSaveDraft(true);
            setIsLoading(true);

            try {
                if (saveDraft) {
                    const { body } = await BlogServices.addPostDraft(
                        form as any
                    );
                    if (body?.success) {
                        toast.success(body.message);
                        setIsLoading(false);
                    } else {
                        toast.error(body?.message || "Error");
                        setIsLoading(false);
                    }
                } else {
                    const { body } = await BlogServices.addPost(form as any);

                    if (body?.success) {
                        toast.success(body.message);
                        setIsLoading(false);
                        dispatch(countBlog());
                    } else {
                        toast.error(body?.message || "Error");
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                console.log(error);
                setSaveDraft(false);
                setIsLoading(false);
            }
        },
    });

    useEffect(() => {
        if (location.state) {
            setFormDataCreate((prevFormData: any) => ({
                ...prevFormData,
                categoryIds: {
                    label: location.state.key.name,
                    value: location.state.key._id,
                    tags: location.state.key.tags,
                },
            }));
        }
    }, [location.state]);

    const renderEdit = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <EditContent
                        setContent={setContent}
                        content={content}
                        formik={formik}
                        setCheckContent={setCheckContent}
                        checkContent={checkContent}
                        setFormDataCreate={setFormDataCreate}
                        formDataCreate={formDataCreate}
                    />
                );
            case 1:
                return (
                    <EditDetail
                        formik={formik}
                        setFormDataCreate={setFormDataCreate}
                        formDataCreate={formDataCreate}
                    />
                );
            case 2:
                return (
                    <OutputPost
                        content={content}
                        formDataCreate={formDataCreate}
                    />
                );

            default:
                break;
        }
    };

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="relative container px-4 py-2"
        >
            <Stepper currentIndex={currentStep}>
                <Stepper.Step
                    size="sm"
                    title="Step 1"
                    description="Writing Content"
                />
                <Stepper.Step size="sm" title="Step 2" description="Detail" />
                <Stepper.Step size="sm" title="Step 3" description="Summary" />
            </Stepper>

            <div className="my-12">{renderEdit(currentStep)}</div>

            <div className="fixed z-50 bottom-6 left-[20%] lg:left-[47%] flex space-x-4">
                <Button
                    size="sm"
                    className="flex gap-3"
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(currentStep - 1)}
                >
                    <PiArrowLeftBold /> Prev
                </Button>
                <Button
                    size="sm"
                    type="submit"
                    disabled={
                        formik.isSubmitting || !formik.isValid || !checkContent
                    }
                    onClick={() => {
                        setSaveDraft(true);
                        formik.handleSubmit;
                    }}
                    isLoading={isLoading}
                    className="flex gap-2"
                >
                    Save Draft <PiClipboardTextLight className="w-4 h-4" />
                </Button>
                {currentStep === 2 && (
                    <Button
                        size="sm"
                        type="submit"
                        disabled={
                            formik.isSubmitting ||
                            !formik.isValid ||
                            !checkContent
                        }
                        isLoading={isLoading}
                        onClick={() => {
                            setSaveDraft(false);
                            formik.handleSubmit;
                        }}
                        className="flex gap-2"
                    >
                        Create Post <PiClipboardTextLight className="w-4 h-4" />
                    </Button>
                )}
                <Button
                    size="sm"
                    className="flex gap-3"
                    disabled={currentStep === 2}
                    onClick={() => setCurrentStep(currentStep + 1)}
                >
                    Next <PiArrowRightBold />
                </Button>
            </div>
        </form>
    );
};

export default PageCreatePost;
