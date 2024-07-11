import { cn } from "@/utils/class-name";
import { PiEnvelopeSimple } from "react-icons/pi";
import { Input, Select, Button, NumberInput } from "rizzui";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RULES } from "@/utils/rules";
import ClientServices from "@/services/client";
import toast from "react-hot-toast";
import { UserWall } from "@/type/wall";
import { useNavigate } from "react-router-dom";

type valueType = {
    label: string;
    value: string;
};

const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
];

type FormEditAccountProps = {
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserWall;
};

const FormEditAccount: FC<FormEditAccountProps> = ({ setIsUpdate, user }) => {
    const navigate = useNavigate();
    const getObjectGender = (item: string) => {
        return options.find((option) => option.value === item) || options[0];
    };

    const [valueGender, setValueGender] = useState<valueType>(
        getObjectGender(user?.gender || (options[0] as any))
    );

    useEffect(() => {
        formik.setFieldValue("gender", valueGender.value);
    }, [valueGender]);

    const formik = useFormik({
        initialValues: {
            name: "" || user?.name,
            second_name: "" || user?.second_name,
            email: "" || user?.email,
            phone: "" || user?.phone,
            gender: "" || user?.gender,
            username: "" || user?.username,
            Descriptions: "",
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required("Username is required."),
            name: Yup.string().required("Full name is required"),
            second_name: Yup.string().required("Second name is required"),
            phone: Yup.string().required("Phone is required"),
            email: Yup.string()
                .matches(RULES.email, "Email invalid")
                .required("Email is required."),
        }),

        validateOnChange: true,
        onSubmit: async (values) => {
            const report = {
                ...values,
                gender: valueGender?.value,
            };

            try {
                const { body } = await ClientServices.updateInfo(report as any);
                if (body?.success) {
                    toast.success(body.message);
                    setIsUpdate(true);
                } else {
                    toast.error(body?.message || "Error");
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
                <div className="col-span-4">
                    <h4 className="text-base font-medium">Personal Info</h4>
                    <p className="mt-2">
                        Update your photo and personal details here
                    </p>
                </div>
            </div>
            <div className="mx-auto mb-10 grid w-full max-w-screen-3xl gap-7 divide-y divide-dashed divide-gray-200  p-6 ">
                <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
                    <div className="col-span-4">
                        <h4 className="text-base font-medium">Name</h4>
                    </div>

                    <div className="grid grid-cols-2 col-span-8 gap-5 ">
                        <Input
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            error={formik.errors.name as any}
                            placeholder="Full Name"
                            className="flex-grow"
                        />
                        <Input
                            id="second_name"
                            name="second_name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.second_name}
                            error={formik.errors.second_name}
                            placeholder="Second Name"
                            className="flex-grow"
                        />
                    </div>
                </div>
                <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
                    <div className="col-span-4">
                        <h4 className="text-base font-medium">Username</h4>
                    </div>

                    <div className="grid grid-cols-2 col-span-8 gap-5 ">
                        <Input
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            error={formik.errors.username}
                            className="col-span-full"
                            disabled
                        />
                    </div>
                </div>
                <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
                    <div className="col-span-4">
                        <h4 className="text-base font-medium">Email Address</h4>
                    </div>

                    <div className="grid grid-cols-2 col-span-8 gap-5 ">
                        <Input
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={formik.errors.email}
                            className="col-span-full"
                            prefix={
                                <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                            }
                            type="email"
                            disabled
                            placeholder="georgia.young@example.com"
                        />
                    </div>
                </div>
                <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
                    <div className="col-span-4">
                        <h4 className="text-base font-medium">Phone Number</h4>
                    </div>

                    <div className="grid grid-cols-2 col-span-8 gap-5 ">
                        <NumberInput
                            id="phone"
                            name="phone"
                            formatType="pattern"
                            format="### ### ####"
                            mask="_"
                            customInput={Input as any}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                    </div>
                </div>

                <div className={cn("grid gap-5 grid-cols-12 pt-7 ")}>
                    <div className="col-span-4">
                        <h4 className="text-base font-medium">Gender</h4>
                    </div>

                    <div className="grid grid-cols-2 col-span-8 gap-5 ">
                        <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                            <Select
                                id="gender"
                                name="gender"
                                label="Select"
                                options={options}
                                // value={valueGender}
                                // onChange={setValueGender}
                                error={formik.errors.gender}
                                optionClassName="hover:bg-gray-300/90"
                                value={valueGender}
                                onChange={setValueGender}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={cn(
                    "sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4  md:px-5 lg:px-6 3xl:px-8 4xl:px-10"
                )}
            >
                <Button
                    onClick={() => {
                        navigate("/admin/account");
                    }}
                    variant="outline"
                    className="w-fit @xl:w-auto"
                >
                    Back
                </Button>
            </div>
        </form>
    );
};

export default FormEditAccount;
