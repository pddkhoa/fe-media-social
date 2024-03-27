import EditContent from "@/components/module/create-post/EditContent";
import EditDetail from "@/components/module/create-post/EditDetail";
import OutputPost from "@/components/module/create-post/OutputPost";
import { OutputData } from "@editorjs/editorjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
    PiArrowLeftBold,
    PiClipboardTextLight,
    PiArrowRightBold,
} from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Stepper, Button, Loader } from "rizzui";
import edjsHTML from "editorjs-html";
import * as Yup from "yup";
import convertHTMLToEditorJS from "@/components/editor/Convert";
import { Tag } from "@/type/tag";
import { useModal } from "@/hooks/useModal";
import ModalChangeStatus from "@/components/module/post/ModalChangeStatus";
import BlogServices from "@/services/blog";
import toast from "react-hot-toast";
import { countBlog } from "@/store/authSlice";

const PageEditPost = () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [checkContent, setCheckContent] = useState(false);
    const [statusValue, setStatusValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const edjsParser = edjsHTML();
    const { openModal, closeModal } = useModal();
    const location = useLocation();

    const [formDataCreate, setFormDataCreate] = useState<any>(() => {
        if (location?.state?.key?.category) {
            return {
                title: location?.state?.key?.title || "",
                description: location?.state?.key?.description || "",
                avatar: location?.state?.key?.avatar || "",
                categoryIds: {
                    label: location?.state?.key?.category?.name || "",
                    value: location?.state?.key?.category?._id || "",
                    tags: location?.state?.key?.category?.tags || [],
                },
                tagIds:
                    location?.state?.key?.tags?.map((item: Tag) => item) || [],
            };
        } else {
            return {
                title: location?.state?.key?.title || "",
                description: location?.state?.key?.description || "",
                avatar: location?.state?.key?.avatar || "",
                categoryIds: "",
                tagIds:
                    location?.state?.key?.tags?.map((item: Tag) => item) || [],
            };
        }
    });
    const [content, setContent] = useState<OutputData | undefined>(
        convertHTMLToEditorJS(location?.state?.key?.content)
    );

    useEffect(() => {
        if (content) setCheckContent(true);
        else setCheckContent(false);
    }, [content]);

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            description: "",
            avatar: "",
            categoryIds: "",
            tagIds: [],
            status: "",
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Title is required."),
        }),

        validateOnChange: true,
        onSubmit: async (values) => {
            const form = {
                ...values,
                status: statusValue,
                categoryIds: formDataCreate?.categoryIds?.value,
                tagIds: formDataCreate?.tagIds?.map((item: Tag) => item._id),
                content: edjsParser.parse(content as any).join(""),
                avatar: formDataCreate?.avatar,
            };

            setIsLoading(true);

            try {
                const { body } = await BlogServices.editPost(
                    form,
                    location?.state?.key?._id
                );
                if (body?.success) {
                    toast.success(body?.message);
                    setIsLoading(false);
                    closeModal();
                    if (statusValue === "Published") dispatch(countBlog());
                } else {
                    toast.error(body?.message || "Error");
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        },
    });

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

                {currentStep === 2 && (
                    <Button
                        size="sm"
                        type="button"
                        disabled={
                            formik.isSubmitting ||
                            !formik.isValid ||
                            !checkContent
                        }
                        isLoading={isLoading}
                        onClick={() => {
                            openModal({
                                view: isLoading ? (
                                    <Loader />
                                ) : (
                                    <ModalChangeStatus
                                        setStatusValue={setStatusValue}
                                        submit={formik.handleSubmit}
                                        isLoading={isLoading}
                                    />
                                ),
                            });
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

export default PageEditPost;
