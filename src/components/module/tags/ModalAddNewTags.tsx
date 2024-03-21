import { useModal } from "@/hooks/useModal";
import ClientServices from "@/services/client";
import { useFormik } from "formik";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { PiXBold } from "react-icons/pi";
import { Title, ActionIcon, Input, Button, Loader } from "rizzui";
import * as Yup from "yup";

type ModalAddNewTagsProps = {
    setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalAddNewTags: FC<ModalAddNewTagsProps> = ({ setIsAdd }) => {
    const { closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required."),
        }),

        validateOnChange: true,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const { body } = await ClientServices.addTags({
                    name: values.name,
                });
                if (body?.success) {
                    setIsLoading(false);
                    toast.success(body.message);
                    setIsAdd(true);
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
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
            <div className="flex items-center justify-between">
                <Title as="h4" className="font-semibold">
                    Add a new tag
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                    <PiXBold className="h-auto w-5" />
                </ActionIcon>
            </div>
            <Input
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.errors.name}
                label="Tag's Name"
                placeholder="Tag's name"
            />

            <div className="flex items-center justify-end gap-4">
                <Button
                    variant="outline"
                    onClick={closeModal}
                    className="w-full @xl:w-auto"
                >
                    Cancel
                </Button>
                {isLoading ? (
                    <Button
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                        className="w-full @xl:w-auto flex gap-3"
                    >
                        Add Tag <Loader />
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={formik.isSubmitting || !formik.isValid}
                        className="w-full @xl:w-auto"
                    >
                        Add Tag
                    </Button>
                )}
            </div>
        </form>
    );
};

export default ModalAddNewTags;
