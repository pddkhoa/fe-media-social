import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import AdminServices from "@/services/admin";
import { ReportType } from "@/type/report";
import { useFormik } from "formik";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { PiXBold } from "react-icons/pi";
import { Button, Input } from "rizzui";
import * as Yup from "yup";

type ModalAddNewReportProps = {
    setAction: React.Dispatch<React.SetStateAction<boolean>>;
    data?: ReportType;
};

const ModalAddNewReport: FC<ModalAddNewReportProps> = ({ setAction, data }) => {
    const { closeModal } = useModal();
    const { axiosJWT } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            value: data?.value || "",
        },
        validationSchema: Yup.object().shape({
            value: Yup.string().required("Name is required."),
        }),

        validateOnChange: true,
        onSubmit: async (values) => {
            setIsLoading(true);

            const { body } = data
                ? await AdminServices.editReport(
                      { reportId: data._id, value: values.value },
                      axiosJWT
                  )
                : await AdminServices.addReport(values, axiosJWT);
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
        <form
            onSubmit={formik.handleSubmit}
            className="p-6 flex flex-col gap-5"
        >
            <div className="flex justify-end">
                <button
                    onClick={closeModal}
                    type="button"
                    className="hover:bg-gray-200 rounded-md p-1.5"
                >
                    <PiXBold />
                </button>
            </div>
            <Input
                id="value"
                name="value"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.value}
                error={formik.errors.value}
                label="Name Report"
                className={"col-span-2"}
            />
            <Button
                disabled={formik.isSubmitting || !formik.isValid}
                variant="solid"
                type="submit"
                isLoading={isLoading}
            >
                Add
            </Button>
        </form>
    );
};

export default ModalAddNewReport;
