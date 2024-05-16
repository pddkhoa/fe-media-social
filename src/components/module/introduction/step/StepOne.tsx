import homeFront from "/home-front.png";
import { useStepperOne } from ".";
import FormSummary from "../FormSumary";

export default function StepOne() {
    const { step, gotoNextStep } = useStepperOne();

    const handleNextStep = () => {
        gotoNextStep();
    };

    return (
        <>
            <div className="col-span-6 flex flex-col justify-center @4xl:col-span-5">
                <FormSummary
                    descriptionClassName="me-10"
                    title="Welcome to Brainiac"
                    description="A knowledge-sharing social network is a digital platform where users worldwide can exchange ideas, discuss topics, and access diverse information. It features interactive tools like forums, blogs, and webinars, catering to both experts and novices, promoting continuous and comprehensive learning."
                />
            </div>

            <form
                id={`rhf-${step.toString()}`}
                onSubmit={handleNextStep}
                className="col-span-6 grid aspect-[4/3] gap-4 grid-cols-12 "
            >
                <img
                    src={homeFront}
                    alt="home front part 1"
                    className="mt-auto rounded-lg object-cover object-left-top col-span-4 h-96"
                />
                <img
                    src={homeFront}
                    alt="home front part 2"
                    className="my-auto   rounded-lg object-cover col-span-4 block h-96 "
                />
                <img
                    src={homeFront}
                    alt="home front part 3"
                    className="mb-auto   rounded-lg object-cover object-right-bottom col-span-4 block h-96 "
                />
            </form>
        </>
    );
}
