import ClientServices from "@/services/client";
import { cn } from "@/utils/class-name";
import { RULES } from "@/utils/rules";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import { Password, Button, Title, Loader } from "rizzui";
import * as Yup from "yup";

const FormUpdatePassword = () => {
  const [showCheckPwd, setShowCheckPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [requirementsMet, setRequirementsMet] = useState<any>({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    space: true,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    formik.setFieldValue("password", password);

    const containsSpace = /\s/.test(password);
    const lengthCheck = password.length >= 8;
    const lowercaseCheck = /[a-z]/.test(password);
    const uppercaseCheck = /[A-Z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCharCheck = /[@#$%^_&+=]/.test(password);

    setRequirementsMet({
      length: lengthCheck,
      lowercase: lowercaseCheck,
      uppercase: uppercaseCheck,
      number: numberCheck,
      specialChar: specialCharCheck,
      space: containsSpace,
    });

    setShowCheckPwd(password.length > 0);
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required("Current password is required."),
      password: Yup.string()
        .matches(RULES.password, "Password Invalid")
        .required("New password is required."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),

    validateOnChange: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { body } = await ClientServices.resetPassword({
          oldPassword: values.oldPassword,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        if (body?.success) {
          setIsLoading(false);
          toast.success(body.message);
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
    <form onSubmit={formik.handleSubmit}>
      <div className="mx-auto w-full max-w-screen-xl">
        <HorizontalFormBlockWrapper
          title="Current Password"
          titleClassName="text-base font-medium"
        >
          <Password
            id="oldPassword"
            name="oldPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldPassword}
            placeholder="Enter your old password"
            className="w-1/2"
            error={formik.errors.oldPassword}
          />
        </HorizontalFormBlockWrapper>

        <HorizontalFormBlockWrapper
          title="New Password"
          titleClassName="text-base font-medium"
        >
          <Password
            id="password"
            name="password"
            onChange={handlePasswordChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Enter your new password"
            className="w-1/2"
            error={formik.errors.password}
          />
        </HorizontalFormBlockWrapper>

        <HorizontalFormBlockWrapper
          title="Confirm New Password"
          titleClassName="text-base font-medium"
        >
          <Password
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            placeholder="Enter your confirm new password"
            className="w-1/2"
            error={formik.errors.confirmPassword}
          />
        </HorizontalFormBlockWrapper>

        {showCheckPwd ? (
          <ul className="col-span-2 w-1/2 mt-4 space-y-2 animate-in duration-300 transition-all">
            {Object.entries({
              "At least 8 characters": requirementsMet.length,
              "At least one lowercase letter": requirementsMet.lowercase,
              "At least one uppercase letter": requirementsMet.uppercase,
              "At least one number": requirementsMet.number,
              "At least one special character": requirementsMet.specialChar,
              "Password cannot contain spaces": !requirementsMet.space,
            }).map(([label, met]) => (
              <li
                key={label}
                className={`text-base flex justify-between  w-full ${
                  met ? "text-green-500" : "text-red-500"
                }`}
              >
                <span>{label}</span>
                {met ? <PiCheckBold /> : <PiXBold />}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex w-auto items-center justify-end gap-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          {isLoading ? (
            <Button
              type="submit"
              className="flex gap-5"
              disabled
              variant="solid"
            >
              Update Password <Loader />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="solid"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Update Password
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormUpdatePassword;

export function HorizontalFormBlockWrapper({
  title,
  titleClassName,
  description,
  children,
  className,
  descriptionClassName,
  childrenWrapperClassName,
}: React.PropsWithChildren<{
  title: React.ReactNode;
  description?: React.ReactNode;
  titleClassName?: string;
  className?: string;
  descriptionClassName?: string;
  childrenWrapperClassName?: string;
}>) {
  return (
    <div
      className={cn(
        "border-b border-dashed border-gray-300 py-10 @5xl:grid @5xl:grid-cols-6",
        className
      )}
    >
      <div className="col-span-2 mb-6 @5xl:mb-0">
        <Title
          as="h5"
          className={cn("mb-2 text-[17px] font-semibold", titleClassName)}
        >
          {title}
        </Title>
        <p
          className={cn(
            "mt-1 leading-relaxed text-gray-500",
            descriptionClassName
          )}
        >
          {description}
        </p>
      </div>
      <div
        className={cn(
          "col-span-4 grid grid-cols-1 gap-4 @lg:gap-5 @3xl:grid-cols-2",
          childrenWrapperClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
