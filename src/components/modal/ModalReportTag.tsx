import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import UserServices from "@/services/user";
import { ReportType } from "@/type/report";
import { Tag } from "@/type/tag";
import { useFormik } from "formik";
import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiXBold } from "react-icons/pi";
import {
    AdvancedRadio,
    Button,
    Loader,
    RadioGroup,
    Textarea,
    Title,
} from "rizzui";

type ModalReportTagProps = {
    data: Tag;
};

const ModalReportTag: FC<ModalReportTagProps> = ({ data }) => {
    const { closeModal } = useModal();
    const [valueReport, setValueReport] = useState<ReportType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pendingReport, setPendingReport] = useState(false);
    const { axiosJWT } = useAuth();

    const fetchReport = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await UserServices.getReportType(axiosJWT);
            if (body?.success) {
                setValueReport(body?.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setValueReport]);

    const [value, setValue] = useState<string>(valueReport[0]?._id);

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    const formik = useFormik({
        initialValues: {
            tagId: "",
            message: "",
            reason: "",
        },
        // validationSchema: Yup.object().shape({
        //     email: Yup.string()
        //         .matches(RULES.email)
        //         .required("Email is required."),
        // }),

        validateOnChange: true,
        onSubmit: async (values) => {
            const report = {
                ...values,
                tagId: data._id,
                reason: value,
            };
            setPendingReport(true);
            try {
                const { body } = await UserServices.reportTags(
                    report,
                    axiosJWT
                );
                if (body?.success) {
                    toast.success(body.message);
                    setPendingReport(false);
                    closeModal();
                } else {
                    toast.error(body?.message || "Error");
                    setPendingReport(false);
                }
            } catch (error) {
                console.log(error);
                setPendingReport(false);
            }
        },
    });
    useEffect(() => {
        if (valueReport.length > 0) {
            setValue(valueReport[0]._id);
        }
    }, [valueReport]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-5 p-4 "
        >
            <div className="flex justify-between items-center">
                <Title className="text-lg">Report Tags</Title>
                <button
                    onClick={closeModal}
                    className="hover:bg-gray-200 rounded-md p-1.5"
                >
                    <PiXBold />
                </button>
            </div>
            <Title className="text-sm font-medium">Reason</Title>

            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <RadioGroup
                        value={value}
                        setValue={setValue}
                        className="flex flex-col gap-4"
                    >
                        {valueReport && valueReport.length > 0
                            ? valueReport.map((item) => (
                                  <AdvancedRadio
                                      key={item._id}
                                      name={item.value}
                                      value={item._id}
                                      alignment="left"
                                      size="sm"
                                      className="w-full"
                                  >
                                      {item.value}
                                  </AdvancedRadio>
                              ))
                            : null}
                    </RadioGroup>
                </>
            )}
            <Textarea
                name="message"
                label="Message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Write you message..."
            />
            <div className="flex justify-end gap-3">
                <Button type="button" onClick={closeModal} variant="flat">
                    Close
                </Button>

                <Button
                    isLoading={pendingReport}
                    disabled={pendingReport}
                    type="submit"
                    variant="solid"
                >
                    Submit Report
                </Button>
            </div>
        </form>
    );
};

export default ModalReportTag;
