import { cn } from "@/utils/class-name";
import { useAtom } from "jotai";
import { atomWithReset, atomWithStorage } from "jotai/utils";
import Footer from "../FooterIntro";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Congratulations from "./Congratulation";

type FormDataType = {
    propertyType: string;
    placeType: string;
    address: string | undefined;
    lat: number | undefined;
    lng: number | undefined;
    guests: number | undefined;
    bedrooms: number | undefined;
    beds: number | undefined;
    bedroomLock: string;
    guestType: string;
    indoorAmenities: string[] | undefined;
    outdoorAmenities: string[] | undefined;
    propertyName: string;
    propertyDescription: string | undefined;
    priceRange: number[] | undefined;
};

export const initialFormData = {
    propertyType: "",
    placeType: "",
    address: "",
    lat: undefined,
    lng: undefined,
    guests: undefined,
    bedrooms: undefined,
    beds: undefined,
    bedroomLock: "",
    guestType: "",
    indoorAmenities: [],
    outdoorAmenities: [],
    propertyName: "",
    propertyDescription: "",
    priceRange: undefined,
    photos: undefined,
};

export const formDataAtom = atomWithStorage<FormDataType>(
    "multiStepForm",
    initialFormData
);

export enum Step {
    StepOne,
    StepTwo,
    StepThree,
}

const firstStep = Step.StepOne;
export const stepperAtomOne = atomWithReset<Step>(firstStep);

export function useStepperOne() {
    const [step, setStep] = useAtom(stepperAtomOne);
    function gotoNextStep() {
        setStep(step + 1);
    }
    function gotoPrevStep() {
        setStep(step > firstStep ? step - 1 : step);
    }
    function resetStepper() {
        setStep(firstStep);
    }
    return {
        step,
        setStep,
        // gotoStep,
        resetStepper,
        gotoNextStep,
        gotoPrevStep,
    };
}

const MAP_STEP_TO_COMPONENT = {
    [Step.StepOne]: StepOne,
    [Step.StepTwo]: StepTwo,
    [Step.StepThree]: Congratulations,
};

export const stepOneTotalSteps = Object.keys(MAP_STEP_TO_COMPONENT).length;

export default function MultiStepFormOne() {
    const [step] = useAtom(stepperAtomOne);
    const Component = MAP_STEP_TO_COMPONENT[step];

    return (
        <>
            <div
                className={cn(
                    "mx-auto grid w-full max-w-screen-2xl grid-cols-12 place-content-center gap-6 px-5 py-10 min-h-[calc(100vh-10rem)] @5xl:gap-8 @6xl:gap-16 xl:px-7"
                )}
            >
                <Component />
            </div>
            <Footer />
        </>
    );
}
