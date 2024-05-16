import { cn } from "@/utils/class-name";
import { stepOneTotalSteps, useStepperOne } from "./step";

interface FormSummaryProps {
    title: string;
    description: string;
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}

export default function FormSummary({
    title,
    description,
    className,
    titleClassName,
    descriptionClassName,
}: FormSummaryProps) {
    const { step } = useStepperOne();
    return (
        <div className={cn("text-base text-black", className)}>
            <div className="flex">
                <span className="me-2 mt-2.5 h-0.5 w-11 bg-white/[.35]" /> Step{" "}
                {step + 1} of {stepOneTotalSteps - 1}
            </div>
            <article className=" mt-9">
                <h1 className={cn(" text-black text-2xl  ", titleClassName)}>
                    {title}
                </h1>
                <p
                    className={cn(
                        "mt-3 leading-relaxed text-base",
                        descriptionClassName
                    )}
                >
                    {description}
                </p>
            </article>
        </div>
    );
}
