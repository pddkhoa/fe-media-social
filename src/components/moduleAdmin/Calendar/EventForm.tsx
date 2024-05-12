import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import AdminServices from "@/services/admin";
import { useFormik } from "formik";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { PiXBold } from "react-icons/pi";
import { Title, ActionIcon, Input, Button } from "rizzui";
import * as Yup from "yup";

type EventFormProps = {
    setAction: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventForm: FC<EventFormProps> = ({ setAction }) => {
    const { closeModal } = useModal();
    const { axiosJWT } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            value: "",
        },
        validationSchema: Yup.object().shape({
            value: Yup.string().required("Name is required."),
        }),

        validateOnChange: true,
        onSubmit: async (values) => {
            setIsLoading(true);

            const { body } = await AdminServices.addSetting(values, axiosJWT);
            try {
                if (body?.success) {
                    setIsLoading(false);
                    setAction(true);
                    toast.success(body.message);
                    closeModal();
                } else {
                    setIsLoading(false);
                    toast.error(body?.message || "Error");
                }
            } catch (error) {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="m-auto p-4">
            <div className="mb-6 flex items-center justify-between">
                <Title as="h3" className="text-lg">
                    Create a new setting
                </Title>
                <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={() => closeModal()}
                    className="p-0 text-gray-500 hover:!text-gray-900"
                >
                    <PiXBold className="h-[18px] w-[18px]" />
                </ActionIcon>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    id="value"
                    name="value"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.value}
                    label="Value Setting"
                    className="py-4"
                />
                <Button
                    disabled={formik.isSubmitting || !formik.isValid}
                    variant="solid"
                    type="submit"
                    isLoading={isLoading}
                    className="flex justify-center w-full"
                >
                    Save
                </Button>
            </form>
        </div>
    );
};

export default EventForm;
