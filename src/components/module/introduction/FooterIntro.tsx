import { PiCheck, PiArrowUpLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { cn, Button } from "rizzui";
import { useStepperOne } from "./step";
import UserServices from "@/services/user";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateLogin } from "@/store/authSlice";

interface FooterProps {
    formId?: number;
    className?: string;
    isLoading?: boolean;
}

function buttonLabel(formId?: number) {
    if (formId === 2) {
        return (
            <>
                Started Connection <PiCheck />
            </>
        );
    }

    return (
        <>
            Next <PiArrowUpLight className="rotate-90" />
        </>
    );
}

export default function Footer({ isLoading, className }: FooterProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { axiosJWT } = useAuth();
    const { step, gotoPrevStep, resetStepper } = useStepperOne();

    const handleUpdateLogin = async () => {
        const { body } = await UserServices.updateStatusLogin(axiosJWT);
        if (body?.success) {
            navigate("/");
            resetStepper();
            dispatch(updateLogin());
        } else {
            toast.error(body?.message || "Error");
        }
    };

    function buttonAttr() {
        if (step === 2) {
            return {
                onClick: () => {
                    handleUpdateLogin();
                },
            };
        }
        return { form: `rhf-${step?.toString()}` };
    }

    return (
        <footer
            className={cn(
                "fixed bottom-0 left-0 right-0 flex items-center justify-between gap-3 px-4 py-5 lg:px-8 4xl:px-10",
                className
            )}
        >
            {step > 0 && step < 2 && (
                <Button
                    rounded="pill"
                    variant="outline"
                    onClick={gotoPrevStep}
                    className="gap-1 text-black backdrop-blur-lg hover:enabled:border-white dark:border-gray-800 dark:hover:enabled:border-white"
                >
                    <PiArrowUpLight className="-rotate-90" />
                    Back
                </Button>
            )}
            <Button
                isLoading={isLoading}
                disabled={isLoading}
                rounded="pill"
                {...buttonAttr()}
                type={"submit"}
                className="ml-auto gap-1 bg-gray-900/[.35] backdrop-blur-lg dark:bg-gray-0/[.35] dark:text-white dark:active:enabled:bg-gray-0/75"
            >
                {buttonLabel(step)}
            </Button>
        </footer>
    );
}
