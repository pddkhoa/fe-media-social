import EditContent from "@/components/create-post/EditContent";
import EditDetail from "@/components/create-post/EditDetail";
import OutputPost from "@/components/create-post/OutputPost";
import React from "react";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiClipboardTextLight,
} from "react-icons/pi";
import { Stepper, Button } from "rizzui";

const PageCreatePost = () => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const renderEdit = (step: number) => {
    switch (step) {
      case 0:
        return <EditContent />;
      case 1:
        return <EditDetail />;
      case 2:
        return <OutputPost />;

      default:
        break;
    }
  };

  return (
    <div className="relative container px-4 py-2">
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

      <div className="fixed bottom-6 left-[45%] flex space-x-4">
        <Button
          size="sm"
          className="flex gap-3"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          <PiArrowLeftBold /> Prev
        </Button>
        <Button size="sm" className="flex gap-2">
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
    </div>
  );
};

export default PageCreatePost;
