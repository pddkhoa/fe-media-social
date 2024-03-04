import AccessService from "@/services/access";
import { forgotPasswordSuccess } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { RULES } from "@/utils/rules";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button, Loader, Password } from "rizzui";
import * as Yup from "yup";

const FormResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isForgotPassword = useSelector(
    (state: RootState) => state.auth.isForgotPassword
  );
  const emailDefault = useSelector((state: RootState) => state.auth.email);
  const [showCheckPwd, setShowCheckPwd] = useState(false);

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

  useEffect(() => {
    if (!isForgotPassword) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate, isForgotPassword]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .matches(RULES.password, "Password Invalid")
        .required("Password is required."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),

    validateOnChange: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { body } = await AccessService.resetPassword({
          email: emailDefault,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        if (body?.success) {
          dispatch(forgotPasswordSuccess());
          navigate("/login");
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
      <div className="space-y-5">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          size="lg"
          placeholder="Enter your email"
          className="[&>label>span]:font-medium"
          color="info"
          value={emailDefault}
          disabled
        />
        <Password
          id="password"
          name="password"
          label="New Password"
          size="lg"
          placeholder="Enter your new password"
          className="[&>label>span]:font-medium"
          color="info"
          onChange={handlePasswordChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Password
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          size="lg"
          placeholder="Enter your confirm password"
          className="[&>label>span]:font-medium"
          color="info"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={formik.errors.confirmPassword}
        />
        {showCheckPwd ? (
          <ul className="col-span-2 space-y-2 animate-in duration-300 transition-all">
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

        {isLoading ? (
          <Button
            className="w-full flex gap-5"
            type="submit"
            size="lg"
            disabled
          >
            Reset Password <Loader />
          </Button>
        ) : (
          <Button
            disabled={formik.isSubmitting || !formik.isValid}
            className="w-full"
            type="submit"
            size="lg"
          >
            Reset Password
          </Button>
        )}
      </div>
    </form>
  );
};

export default FormResetPassword;
