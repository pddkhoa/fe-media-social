import EditContent from "@/components/create-post/EditContent";
import EditDetail from "@/components/create-post/EditDetail";
import OutputPost from "@/components/create-post/OutputPost";
import { OutputData } from "@editorjs/editorjs";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiClipboardTextLight,
} from "react-icons/pi";
import { Stepper, Button } from "rizzui";
import * as Yup from "yup";
import edjsHTML from "editorjs-html";

const PageCreatePost = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [content, setContent] = useState<OutputData>();
  const [checkContent, setCheckContent] = useState(false);
  const edjsParser = edjsHTML();

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
        content: edjsParser.parse(content as any).join(""),
      };
      console.log(form);
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
          />
        );
      case 1:
        return <EditDetail />;
      case 2:
        return <OutputPost content={content} />;

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
          description="This is a description"
        />
        <Stepper.Step
          size="sm"
          title="Step 2"
          description="This is a description"
        />
        <Stepper.Step
          size="sm"
          title="Step 3"
          description="This is a description"
        />
      </Stepper>

      <div className="my-12">{renderEdit(currentStep)}</div>

      <div className="fixed z-50 bottom-6 left-[20%] lg:left-[45%] flex space-x-4">
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
          disabled={formik.isSubmitting || !formik.isValid || !checkContent}
          className="flex gap-2"
        >
          Save Draft <PiClipboardTextLight className="w-4 h-4" />
        </Button>
        <Button size="sm" className="flex gap-2">
          Create Post <PiClipboardTextLight className="w-4 h-4" />
        </Button>
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
